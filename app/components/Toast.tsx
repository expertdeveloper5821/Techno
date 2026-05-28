'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  /** Auto-dismiss after ms. Default 4000. Pass 0 to disable. */
  duration?: number;
}

// ── Single Toast item ─────────────────────────────────────────────────────────

interface ToastItemProps {
  id: number;
  message: string;
  type: ToastType;
  onDismiss: (id: number) => void;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const STYLES: Record<ToastType, string> = {
  success: 'bg-[#0f1f14] border-green-500/40 text-green-300',
  error:   'bg-[#1f0f0f] border-red-500/40   text-red-300',
  info:    'bg-[#0f1520] border-blue-500/40   text-blue-300',
};

const ICON_STYLES: Record<ToastType, string> = {
  success: 'text-green-400',
  error:   'text-red-400',
  info:    'text-blue-400',
};

function ToastItem({ id, message, type, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  // Slide in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => onDismiss(id), 300);
  }, [id, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        flex items-start gap-3 w-full max-w-sm px-4 py-3.5
        rounded-xl border shadow-2xl backdrop-blur-sm
        transform transition-all duration-300 ease-out
        ${STYLES[type]}
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}
      `}
    >
      {/* Icon */}
      <span className={`mt-0.5 ${ICON_STYLES[type]}`}>{ICONS[type]}</span>

      {/* Message */}
      <p className="flex-1 text-sm font-medium leading-snug">{message}</p>

      {/* Close */}
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="shrink-0 mt-0.5 opacity-60 hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ── Toast container (portal) ──────────────────────────────────────────────────

interface ToastEntry extends ToastOptions {
  id: number;
  type: ToastType;
  duration: number;
}

interface ToastContainerProps {
  toasts: ToastEntry[];
  onDismiss: (id: number) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      aria-label="Notifications"
      className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem
            id={t.id}
            message={t.message}
            type={t.type}
            onDismiss={onDismiss}
          />
        </div>
      ))}
    </div>,
    document.body
  );
}

// ── useToast hook ─────────────────────────────────────────────────────────────

let _nextId = 1;

export function useToast() {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) { clearTimeout(timer); timers.current.delete(id); }
  }, []);

  const show = useCallback(
    ({ message, type = 'info', duration = 4000 }: ToastOptions) => {
      const id = _nextId++;
      const entry: ToastEntry = { id, message, type, duration };
      setToasts((prev) => [...prev, entry]);

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }
    },
    [dismiss]
  );

  // Cleanup on unmount
  useEffect(() => {
    const map = timers.current;
    return () => { map.forEach(clearTimeout); map.clear(); };
  }, []);

  return { toasts, show, dismiss };
}
