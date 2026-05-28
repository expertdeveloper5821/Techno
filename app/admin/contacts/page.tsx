"use client";
import { useState, useEffect, useCallback, useRef } from "react";

type Status = "new" | "read" | "replied" | "archived";

interface Submission {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  agreePrivacy: boolean;
  status: Status;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_LABELS: Record<Status, string> = {
  new:      "New",
  read:     "Read",
  replied:  "Replied",
  archived: "Archived",
};

const STATUS_COLORS: Record<Status, string> = {
  new:      "bg-blue-100 text-blue-700 border-blue-200",
  read:     "bg-gray-100 text-gray-600 border-gray-200",
  replied:  "bg-green-100 text-green-700 border-green-200",
  archived: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

// ── Detail Modal ──────────────────────────────────────────────────────────────

function DetailModal({
  item,
  onClose,
  onStatusChange,
  onDelete,
}: {
  item: Submission | null;
  onClose: () => void;
  onStatusChange: (id: string, status: Status) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [delConfirm, setDelConfirm] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!item) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    ref.current?.focus();
    return () => window.removeEventListener("keydown", h);
  }, [item, onClose]);

  if (!item) return null;

  const handleStatus = async (s: Status) => {
    setUpdating(true);
    await onStatusChange(item._id, s);
    setUpdating(false);
  };

  const handleDelete = async () => {
    await onDelete(item._id);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={ref}
          tabIndex={-1}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col outline-none"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">
                {item.firstName} {item.lastName}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">{item.email}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ml-4 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Meta row */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${STATUS_COLORS[item.status]}`}>
                {STATUS_LABELS[item.status]}
              </span>
              <span className="text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>
              {item.phone && <span className="text-gray-600">📞 {item.phone}</span>}
            </div>

            {/* Message */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message</p>
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{item.message}</p>
            </div>

            {/* Quick reply link */}
            <a
              href={`mailto:${item.email}?subject=Re: Your enquiry&body=Hi ${item.firstName},%0A%0A`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Reply via Email
            </a>

            {/* Status changer */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {(["new", "read", "replied", "archived"] as Status[]).map((s) => (
                  <button
                    key={s}
                    disabled={updating || item.status === s}
                    onClick={() => handleStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors disabled:opacity-50 ${
                      item.status === s
                        ? STATUS_COLORS[s] + " cursor-default"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* System info */}
            <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-100">
              <p>ID: <span className="font-mono">{item._id}</span></p>
              {item.ipAddress && <p>IP: {item.ipAddress}</p>}
              <p>Privacy agreed: {item.agreePrivacy ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex items-center justify-between">
            <div>
              {delConfirm ? (
                <span className="inline-flex items-center gap-2">
                  <span className="text-sm text-gray-600">Permanently delete?</span>
                  <button onClick={handleDelete} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 font-medium">Yes, delete</button>
                  <button onClick={() => setDelConfirm(false)} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 font-medium">Cancel</button>
                </span>
              ) : (
                <button onClick={() => setDelConfirm(true)} className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
            <button onClick={onClose} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ContactsAdmin() {
  const [items, setItems] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [viewItem, setViewItem] = useState<Submission | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const qs = filterStatus !== "all" ? `?status=${filterStatus}` : "";
      const res = await fetch(`/api/admin/contacts${qs}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(data.data ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setError("Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const handleStatusChange = async (id: string, status: Status) => {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    // Update in-place so the modal reflects the change immediately
    setItems((prev) => prev.map((i) => i._id === id ? { ...i, status } : i));
    if (viewItem?._id === id) setViewItem((v) => v ? { ...v, status } : v);
    showSuccess("Status updated!");
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
    setTotal((t) => t - 1);
    showSuccess("Deleted!");
  };

  const filtered = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      `${item.firstName} ${item.lastName}`.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q)
    );
  });

  const newCount = items.filter((i) => i.status === "new").length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📬 Contact Submissions</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total} total submission{total !== 1 ? "s" : ""}
            {newCount > 0 && (
              <span className="ml-2 inline-flex items-center bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {newCount} new
              </span>
            )}
          </p>
        </div>
        <button onClick={fetchItems} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Alerts */}
      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">⚠️ {error}</div>}
      {success && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">✅ {success}</div>}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 px-4 py-3 flex flex-wrap items-center gap-3">
        {/* Status filter tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {["all", "new", "read", "replied", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                filterStatus === s
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s === "all" ? "All" : STATUS_LABELS[s as Status]}
              {s === "new" && newCount > 0 && (
                <span className="ml-1.5 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{newCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search name, email, message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <svg className="w-8 h-8 animate-spin text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            {search ? "No results match your search." : "No submissions yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${item.status === "new" ? "bg-blue-50/20" : ""}`}
                    onClick={() => setViewItem(item)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.status === "new" && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                        )}
                        <span className="font-medium text-gray-800">
                          {item.firstName} {item.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.email}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{item.message}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${STATUS_COLORS[item.status]}`}>
                        {STATUS_LABELS[item.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-xs">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      {deleteConfirm === item._id ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-gray-500">Delete?</span>
                          <button onClick={() => handleDelete(item._id)} className="text-xs bg-red-600 text-white px-2.5 py-1 rounded-md hover:bg-red-700 font-medium">Yes</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md hover:bg-gray-200 font-medium">No</button>
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
                            onClick={() => setDeleteConfirm(item._id)}
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

      {/* Detail modal */}
      <DetailModal
        item={viewItem}
        onClose={() => setViewItem(null)}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
