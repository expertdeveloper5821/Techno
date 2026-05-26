"use client";
import { useState, useEffect, useCallback } from "react";

interface ServiceBullet { label: string }
interface ServiceColumn { items: ServiceBullet[] }
interface WhatWeDoItem {
  _id?: string;
  imageSrc: string;
  imageAlt: string;
  icon: string;
  title: string;
  description: string;
  servicesColumns: ServiceColumn[];
  buttonLabel: string;
  order: number;
}

const EMPTY: WhatWeDoItem = {
  imageSrc: "",
  imageAlt: "",
  icon: "",
  title: "",
  description: "",
  servicesColumns: [{ items: [{ label: "" }] }, { items: [{ label: "" }] }],
  buttonLabel: "Talk to us",
  order: 0,
};

export default function WhatWeDoAdmin() {
  const [items, setItems] = useState<WhatWeDoItem[]>([]);
  const [form, setForm] = useState<WhatWeDoItem>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/what-we-do");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { setError("Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/admin/what-we-do/${editingId}` : "/api/admin/what-we-do";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Save failed");
      showSuccess(editingId ? "Updated!" : "Created!");
      setForm(EMPTY);
      setEditingId(null);
      fetchItems();
    } catch (err) { setError(err instanceof Error ? err.message : "Error"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    await fetch(`/api/admin/what-we-do/${id}`, { method: "DELETE" });
    showSuccess("Deleted!");
    fetchItems();
  };

  // Column helpers
  const setColItems = (colIdx: number, raw: string) => {
    const cols = form.servicesColumns.map((c, i) =>
      i === colIdx
        ? { items: raw.split("\n").map((l) => ({ label: l.trim() })).filter((l) => l.label) }
        : c
    );
    setForm({ ...form, servicesColumns: cols });
  };

  const getColText = (colIdx: number) =>
    (form.servicesColumns[colIdx]?.items ?? []).map((i) => i.label).join("\n");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🎯 What We Do</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{items.length} records</span>
      </div>

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">⚠️ {error}</div>}
      {success && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">✅ {success}</div>}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">{editingId ? "✏️ Edit Record" : "➕ Add New Record"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
              <input type="text" value={form.buttonLabel} onChange={(e) => setForm({ ...form, buttonLabel: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input type="text" value={form.imageSrc} onChange={(e) => setForm({ ...form, imageSrc: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
              <input type="text" value={form.imageAlt} onChange={(e) => setForm({ ...form, imageAlt: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon URL</label>
              <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Services Column 1 <span className="text-gray-400 font-normal">(one item per line)</span></label>
              <textarea value={getColText(0)} onChange={(e) => setColItems(0, e.target.value)} rows={5} placeholder="Service item 1&#10;Service item 2" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Services Column 2 <span className="text-gray-400 font-normal">(one item per line)</span></label>
              <textarea value={getColText(1)} onChange={(e) => setColItems(1, e.target.value)} rows={5} placeholder="Service item 1&#10;Service item 2" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
              {saving ? "Saving…" : editingId ? "Update" : "Save"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setForm(EMPTY); setEditingId(null); }} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg transition-colors">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Records</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No records yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Button</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700 font-medium">{item.title}</td>
                    <td className="px-6 py-4 text-gray-500">{item.buttonLabel}</td>
                    <td className="px-6 py-4 text-gray-500">{item.order}</td>
                    <td className="px-6 py-4 text-right">
                      {deleteConfirm === item._id ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-gray-500">Sure?</span>
                          <button onClick={() => handleDelete(item._id!)} className="text-xs text-red-600 font-medium hover:underline">Yes, delete</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-500 hover:underline">Cancel</button>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-4">
                          <button onClick={() => { setForm({ ...item }); setEditingId(item._id!); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                          <button onClick={() => setDeleteConfirm(item._id!)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
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
