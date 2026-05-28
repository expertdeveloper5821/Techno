"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface PolicySection {
  _id?: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const EMPTY: PolicySection = { title: "", paragraphs: [], bullets: [], order: 0 };

interface Props {
  title: string;
  apiBase: string;
}

const toText = (arr: string[]) => arr.join("\n");
const fromText = (raw: string) => raw.split("\n").map((s) => s.trim()).filter(Boolean);

// ── View Modal ────────────────────────────────────────────────────────────────

function ViewModal({
  open,
  item,
  onClose,
  onEdit,
}: {
  open: boolean;
  item: PolicySection | null;
  onClose: () => void;
  onEdit: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => { if (open) modalRef.current?.focus(); }, [open]);

  if (!item) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div
          ref={modalRef}
          tabIndex={-1}
          className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col outline-none transform transition-all duration-200 ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Section Details</h2>
                <p className="text-xs text-gray-400">Read-only view</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Title */}
            <div className="border-b border-gray-50 pb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Section Title</p>
              <p className="text-gray-800 font-medium">{item.title || <span className="text-gray-400 italic">—</span>}</p>
            </div>

            {/* Order */}
            <div className="border-b border-gray-50 pb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Display Order</p>
              <p className="text-gray-800">{item.order}</p>
            </div>

            {/* Paragraphs */}
            <div className="border-b border-gray-50 pb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Paragraphs <span className="text-gray-300 font-normal normal-case">({item.paragraphs.length})</span>
              </p>
              {item.paragraphs.length === 0 ? (
                <span className="text-gray-400 italic text-sm">No paragraphs</span>
              ) : (
                <ol className="space-y-2">
                  {item.paragraphs.map((p, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 w-5 h-5 bg-gray-100 text-gray-500 rounded-full text-xs flex items-center justify-center font-medium mt-0.5">{i + 1}</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{p}</p>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Bullets */}
            <div className="border-b border-gray-50 pb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Bullet Points <span className="text-gray-300 font-normal normal-case">({item.bullets.length})</span>
              </p>
              {item.bullets.length === 0 ? (
                <span className="text-gray-400 italic text-sm">No bullet points</span>
              ) : (
                <ul className="space-y-1.5">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Timestamps */}
            {(item.createdAt || item.updatedAt) && (
              <div className="grid grid-cols-2 gap-4 pt-1">
                {item.createdAt && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Created</p>
                    <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                )}
                {item.updatedAt && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Last Updated</p>
                    <p className="text-sm text-gray-500">{new Date(item.updatedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex items-center justify-between">
            <span className="text-xs text-gray-400 font-mono">ID: {item._id ?? "—"}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit this section
              </button>
              <button onClick={onClose} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Policy form fields ────────────────────────────────────────────────────────

function PolicyFormFields({
  form,
  setForm,
}: {
  form: PolicySection;
  setForm: (v: PolicySection) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
        <input
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Paragraphs{" "}
          <span className="text-gray-400 font-normal">(one paragraph per line)</span>
        </label>
        <textarea
          value={toText(form.paragraphs)}
          onChange={(e) => setForm({ ...form, paragraphs: fromText(e.target.value) })}
          rows={5}
          placeholder={"First paragraph text\nSecond paragraph text"}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bullet Points{" "}
          <span className="text-gray-400 font-normal">(one bullet per line)</span>
        </label>
        <textarea
          value={toText(form.bullets)}
          onChange={(e) => setForm({ ...form, bullets: fromText(e.target.value) })}
          rows={5}
          placeholder={"Bullet point 1\nBullet point 2"}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>
    </div>
  );
}

// ── Edit Drawer ───────────────────────────────────────────────────────────────

function EditDrawer({
  open,
  form,
  setForm,
  saving,
  onSave,
  onClose,
}: {
  open: boolean;
  form: PolicySection;
  setForm: (v: PolicySection) => void;
  saving: boolean;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) drawerRef.current?.focus();
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out outline-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-base">Edit Section</h2>
              <p className="text-xs text-gray-500">Make your changes and click Update</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form id="policy-edit-form" onSubmit={onSave}>
            <PolicyFormFields form={form} setForm={setForm} />
          </form>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
          <button
            type="submit"
            form="policy-edit-form"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PolicyCmsPage({ title, apiBase }: Props) {
  const [items, setItems] = useState<PolicySection[]>([]);
  const [addForm, setAddForm] = useState<PolicySection>(EMPTY);
  const [editForm, setEditForm] = useState<PolicySection>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewItem, setViewItem] = useState<PolicySection | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiBase);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { setError("Failed to load"); }
    finally { setLoading(false); }
  }, [apiBase]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  // ── Add ────────────────────────────────────────────────────────────────────
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      if (!res.ok) throw new Error("Save failed");
      showSuccess("Created!");
      setAddForm(EMPTY);
      fetchItems();
    } catch (err) { setError(err instanceof Error ? err.message : "Error"); }
    finally { setSaving(false); }
  };

  // ── Edit ───────────────────────────────────────────────────────────────────
  const openEdit = (item: PolicySection) => {
    setEditForm({ ...item });
    setEditingId(item._id!);
    setDrawerOpen(true);
  };

  const closeDrawer = () => { setDrawerOpen(false); setEditingId(null); };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${apiBase}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Update failed");
      showSuccess("Updated!");
      closeDrawer();
      fetchItems();
    } catch (err) { setError(err instanceof Error ? err.message : "Error"); }
    finally { setSaving(false); }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    showSuccess("Deleted!");
    fetchItems();
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {items.length} section{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
          ✅ {success}
        </div>
      )}

      {/* ── Add form ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="font-semibold text-gray-800">Add New Section</h2>
        </div>
        <form onSubmit={handleAdd} className="p-6">
          <PolicyFormFields form={addForm} setForm={setAddForm} />
          <div className="mt-5">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Save Section
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Sections</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <svg className="w-8 h-8 animate-spin text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">No sections yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Paragraphs</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bullets</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 text-gray-700 font-medium max-w-xs truncate">{item.title}</td>
                    <td className="px-6 py-4 text-gray-500">{item.paragraphs.length}</td>
                    <td className="px-6 py-4 text-gray-500">{item.bullets.length}</td>
                    <td className="px-6 py-4 text-gray-500">{item.order}</td>
                    <td className="px-6 py-4 text-right">
                      {deleteConfirm === item._id ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-gray-500">Delete this?</span>
                          <button onClick={() => handleDelete(item._id!)} className="text-xs bg-red-600 text-white px-2.5 py-1 rounded-md hover:bg-red-700 font-medium">
                            Yes, delete
                          </button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md hover:bg-gray-200 font-medium">
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <button
                            onClick={() => setViewItem(item)}
                            className="inline-flex items-center gap-1.5 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-100 font-medium transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                          <button
                            onClick={() => openEdit(item)}
                            className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item._id!)}
                            className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Edit Drawer ── */}
      <EditDrawer
        open={drawerOpen}
        form={editForm}
        setForm={setEditForm}
        saving={saving}
        onSave={handleUpdate}
        onClose={closeDrawer}
      />

      {/* ── View Modal ── */}
      <ViewModal
        open={viewItem !== null}
        item={viewItem}
        onClose={() => setViewItem(null)}
        onEdit={() => {
          if (viewItem) {
            setViewItem(null);
            openEdit(viewItem);
          }
        }}
      />
    </div>
  );
}
