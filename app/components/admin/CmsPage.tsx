"use client";
import { useState, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export type FieldDef =
  | { key: string; label: string; type: "text" | "number" | "url" }
  | { key: string; label: string; type: "textarea" }
  | { key: string; label: string; type: "select"; options: string[] }
  | { key: string; label: string; type: "tags"; placeholder?: string }; // comma-separated array

interface CmsPageProps {
  title: string;
  apiBase: string; // e.g. "/api/admin/products"
  fields: FieldDef[];
  /** Which field to show as the primary label in the table */
  primaryField: string;
  /** Optional extra columns to show in the table */
  tableColumns?: { key: string; label: string }[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function buildEmpty(fields: FieldDef[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === "number") obj[f.key] = 0;
    else if (f.type === "tags") obj[f.key] = [];
    else obj[f.key] = "";
  }
  return obj;
}

function getFieldValue(form: Record<string, unknown>, key: string): string {
  const v = form[key];
  if (Array.isArray(v)) return v.join(", ");
  return String(v ?? "");
}

function setFieldValue(
  form: Record<string, unknown>,
  field: FieldDef,
  raw: string
): Record<string, unknown> {
  if (field.type === "number") return { ...form, [field.key]: Number(raw) };
  if (field.type === "tags")
    return {
      ...form,
      [field.key]: raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
  return { ...form, [field.key]: raw };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function CmsPage({
  title,
  apiBase,
  fields,
  primaryField,
  tableColumns = [],
}: CmsPageProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>(buildEmpty(fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(apiBase);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setError("Could not load data. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `${apiBase}/${editingId}` : apiBase;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message ?? "Save failed");
      }
      showSuccess(editingId ? "Updated successfully!" : "Created successfully!");
      setForm(buildEmpty(fields));
      setEditingId(null);
      fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: Record<string, unknown>) => {
    setForm({ ...item });
    setEditingId(item._id as string);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    try {
      await fetch(`${apiBase}/${id}`, { method: "DELETE" });
      showSuccess("Deleted successfully!");
      fetchItems();
    } catch {
      setError("Delete failed");
    }
  };

  const handleCancel = () => {
    setForm(buildEmpty(fields));
    setEditingId(null);
    setError("");
  };

  const filtered = items.filter((item) => {
    if (!search) return true;
    const val = String(item[primaryField] ?? "").toLowerCase();
    return val.includes(search.toLowerCase());
  });

  const allColumns = [
    { key: primaryField, label: "Name / Title" },
    ...tableColumns,
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {items.length} record{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
          <span>✅</span> {success}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">
            {editingId ? "✏️ Edit Record" : "➕ Add New Record"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => {
              const value = getFieldValue(form, field.key);
              const onChange = (raw: string) =>
                setForm((prev) => setFieldValue(prev, field, raw));

              if (field.type === "textarea") {
                return (
                  <div key={field.key} className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <textarea
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    />
                  </div>
                );
              }

              if (field.type === "select") {
                return (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select…</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.type === "tags") {
                return (
                  <div key={field.key} className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}{" "}
                      <span className="text-gray-400 font-normal">(comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      placeholder={field.placeholder ?? "item 1, item 2, item 3"}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              }

              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type === "url" ? "text" : field.type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.type === "url" ? "/images/example.png or https://…" : ""}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 mt-5">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
            >
              {saving ? "Saving…" : editingId ? "Update" : "Save"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
          <h2 className="font-semibold text-gray-800 flex-1">Records</h2>
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          />
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            {search ? "No results match your search." : "No records yet. Add one above."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {allColumns.map((col) => (
                    <th
                      key={col.key}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item._id as string} className="hover:bg-gray-50 transition-colors">
                    {allColumns.map((col) => {
                      const val = item[col.key];
                      const display = Array.isArray(val)
                        ? val.join(", ")
                        : String(val ?? "—");
                      return (
                        <td
                          key={col.key}
                          className="px-6 py-4 text-gray-700 max-w-xs truncate"
                          title={display}
                        >
                          {display}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-right">
                      {deleteConfirm === (item._id as string) ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-gray-500">Sure?</span>
                          <button
                            onClick={() => handleDelete(item._id as string)}
                            className="text-xs text-red-600 font-medium hover:underline"
                          >
                            Yes, delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs text-gray-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item._id as string)}
                            className="text-red-500 hover:text-red-700 font-medium"
                          >
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
    </div>
  );
}
