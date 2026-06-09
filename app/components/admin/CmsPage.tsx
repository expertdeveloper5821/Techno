"use client";
import { useState, useEffect, useCallback, useRef, useId } from "react";
import ImageUploadField from "./ImageUploadField";
import RichTextEditor from "./RichTextEditor";

// ── View Modal ────────────────────────────────────────────────────────────────

function ViewModal({
  open,
  item,
  fields,
  onClose,
  onEdit,
}: {
  open: boolean;
  item: Record<string, unknown> | null;
  fields: FieldDef[];
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

  const renderValue = (field: FieldDef): React.ReactNode => {
    const raw = item[field.key];
    if (raw === undefined || raw === null || raw === "") {
      return <span className="text-gray-400 italic">—</span>;
    }
    if (Array.isArray(raw)) {
      if (raw.length === 0) return <span className="text-gray-400 italic">—</span>;
      return (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {raw.map((v, i) => (
            <span key={i} className="bg-blue-50 text-blue-700 border border-blue-100 text-xs px-2 py-0.5 rounded-full">
              {String(v)}
            </span>
          ))}
        </div>
      );
    }
    if (field.type === "url") {
      const str = String(raw);
      const isImage = /\.(png|jpe?g|gif|svg|webp)(\?|$)/i.test(str);
      return (
        <div className="mt-1 space-y-2">
          {isImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={str} alt={field.label} className="h-20 w-auto rounded-lg border border-gray-200 object-contain bg-gray-50" />
          )}
          <span className="text-blue-600 text-sm break-all">{str}</span>
        </div>
      );
    }
    if (field.type === "textarea") {
      return (
        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed mt-1">
          {String(raw)}
        </p>
      );
    }
    if (field.type === "richtext") {
      return (
        <div
          className="text-gray-700 text-sm leading-relaxed mt-1 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: String(raw) }}
        />
      );
    }
    return <span className="text-gray-800 text-sm">{String(raw)}</span>;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col outline-none transform transition-all duration-200 ${
            open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Record Details</h2>
                <p className="text-xs text-gray-400">Read-only view of all fields</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal body — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {fields.map((field) => (
              <div key={field.key} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {field.label}
                </p>
                {renderValue(field)}
              </div>
            ))}

            {/* System fields */}
            {(() => {
              const createdAt = item.createdAt as string | undefined;
              const updatedAt = item.updatedAt as string | undefined;
              if (!createdAt && !updatedAt) return null;
              return (
                <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-4">
                  {createdAt && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Created</p>
                      <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
                    </div>
                  )}
                  {updatedAt && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Last Updated</p>
                      <p className="text-sm text-gray-500">{new Date(updatedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Modal footer */}
          <div className="shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex items-center justify-between">
            <span className="text-xs text-gray-400 font-mono">ID: {String(item._id ?? "—")}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit this record
              </button>
              <button
                onClick={onClose}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────

export type FieldDef =
  | { key: string; label: string; type: "text" | "number" | "url" | "date"; required?: boolean }
  | { key: string; label: string; type: "textarea"; required?: boolean }
  | { key: string; label: string; type: "richtext"; required?: boolean }
  | { key: string; label: string; type: "select"; options: string[]; required?: boolean }
  | { key: string; label: string; type: "select-creatable"; options: string[]; required?: boolean }
  | { key: string; label: string; type: "tags"; placeholder?: string; required?: boolean };

interface CmsPageProps {
  title: string;
  apiBase: string;
  fields: FieldDef[];
  primaryField: string;
  tableColumns?: { key: string; label: string }[];
  /** Dynamically override options for select-creatable fields. key = field.key */
  dynamicOptions?: Record<string, string[]>;
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
      [field.key]: raw.split(",").map((s) => s.trim()).filter(Boolean),
    };
  return { ...form, [field.key]: raw };
}

// ── Select-Creatable sub-component ───────────────────────────────────────────

function SelectCreatable({
  label,
  value,
  options,
  required,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  required?: boolean;
  onChange: (v: string) => void;
}) {
  const uid = useId();
  const [showNew, setShowNew] = useState(false);
  const [newValue, setNewValue] = useState("");

  // If the current value isn't in the options list and isn't empty, show the text input
  const isCustom = value !== "" && !options.includes(value);

  useEffect(() => {
    if (isCustom) {
      setShowNew(true);
      setNewValue(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectValue = showNew ? "__new__" : value;

  const handleSelectChange = (v: string) => {
    if (v === "__new__") {
      setShowNew(true);
      setNewValue("");
      onChange("");
    } else {
      setShowNew(false);
      setNewValue("");
      onChange(v);
    }
  };

  const handleNewInput = (v: string) => {
    setNewValue(v);
    onChange(v);
  };

  const handleCancelNew = () => {
    setShowNew(false);
    setNewValue("");
    onChange("");
  };

  return (
    <div>
      <label htmlFor={uid} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={uid}
        value={selectValue}
        onChange={(e) => handleSelectChange(e.target.value)}
        required={required && !showNew}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">— Select a category —</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
        <option value="__new__">➕ Add new category…</option>
      </select>

      {showNew && (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            value={newValue}
            onChange={(e) => handleNewInput(e.target.value)}
            placeholder="Enter new category name"
            required={required}
            autoFocus
            className="flex-1 border border-blue-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleCancelNew}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

// ── Form Fields renderer (shared between Add panel and Edit drawer) ───────────

function FormFields({
  fields,
  form,
  setForm,
}: {
  fields: FieldDef[];
  form: Record<string, unknown>;
  setForm: (v: Record<string, unknown>) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => {
        const value = getFieldValue(form, field.key);
        const onChange = (raw: string) =>
          setForm(setFieldValue(form, field, raw));
        const isRequired = "required" in field ? field.required : false;

        if (field.type === "textarea") {
          return (
            <div key={field.key} className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
              </label>
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                required={isRequired}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
          );
        }

        if (field.type === "richtext") {
          return (
            <div key={field.key} className="md:col-span-2">
              <RichTextEditor
                label={field.label}
                value={value}
                onChange={onChange}
                required={isRequired}
              />
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
              </label>
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={isRequired}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select…</option>
                {(field as { options: string[] }).options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "select-creatable") {
          return (
            <div key={field.key}>
              <SelectCreatable
                label={field.label}
                value={value}
                options={(field as { options: string[] }).options}
                required={isRequired}
                onChange={onChange}
              />
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
                placeholder={(field as { placeholder?: string }).placeholder ?? "item 1, item 2, item 3"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        }

        // URL fields → image upload picker
        if (field.type === "url") {
          return (
            <div key={field.key}>
              <ImageUploadField
                label={field.label}
                value={value}
                onChange={onChange}
              />
            </div>
          );
        }

        // Date fields → native date picker
        if (field.type === "date") {
          return (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={isRequired}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        }

        return (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required={isRequired}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      })}
    </div>
  );
}

// ── Edit Drawer ───────────────────────────────────────────────────────────────

function EditDrawer({
  open,
  fields,
  form,
  setForm,
  saving,
  onSave,
  onClose,
}: {
  open: boolean;
  fields: FieldDef[];
  form: Record<string, unknown>;
  setForm: (v: Record<string, unknown>) => void;
  saving: boolean;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Trap focus inside drawer when open
  useEffect(() => {
    if (open) drawerRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out outline-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-base">Edit Record</h2>
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

        {/* Drawer body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form id="edit-drawer-form" onSubmit={onSave}>
            <FormFields fields={fields} form={form} setForm={setForm} />
          </form>
        </div>

        {/* Drawer footer */}
        <div className="shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
          <button
            type="submit"
            form="edit-drawer-form"
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

export default function CmsPage({
  title,
  apiBase,
  fields,
  primaryField,
  tableColumns = [],
  dynamicOptions = {},
}: CmsPageProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [addForm, setAddForm] = useState<Record<string, unknown>>(buildEmpty(fields));
  const [editForm, setEditForm] = useState<Record<string, unknown>>(buildEmpty(fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewItem, setViewItem] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Merge dynamicOptions into fields (for select-creatable)
  const mergedFields: FieldDef[] = fields.map((f) => {
    if ((f.type === "select" || f.type === "select-creatable") && dynamicOptions[f.key]) {
      return { ...f, options: dynamicOptions[f.key] } as FieldDef;
    }
    return f;
  });

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

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  // ── Add (inline form) ──────────────────────────────────────────────────────
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
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message ?? "Save failed");
      }
      showSuccess("Created successfully!");
      setAddForm(buildEmpty(fields));
      fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ── Edit (drawer) ──────────────────────────────────────────────────────────
  const openEdit = (item: Record<string, unknown>) => {
    setEditForm({ ...item });
    setEditingId(item._id as string);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingId(null);
  };

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
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message ?? "Update failed");
      }
      showSuccess("Updated successfully!");
      closeDrawer();
      fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
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

  const filtered = items.filter((item) => {
    if (!search) return true;
    return String(item[primaryField] ?? "").toLowerCase().includes(search.toLowerCase());
  });

  const allColumns = [{ key: primaryField, label: "Name / Title" }, ...tableColumns];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page header */}
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

      {/* ── Add form (always visible at top) ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="font-semibold text-gray-800">Add New Record</h2>
        </div>
        <form onSubmit={handleAdd} className="p-6">
          <FormFields fields={mergedFields} form={addForm} setForm={setAddForm} />
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
                  Save Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Records table ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
          <h2 className="font-semibold text-gray-800 flex-1">
            Records
            {search && (
              <span className="ml-2 text-xs font-normal text-gray-400">
                — {filtered.length} of {items.length} shown
              </span>
            )}
          </h2>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <svg className="w-8 h-8 animate-spin text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            {search ? "No results match your search." : "No records yet. Add one above."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {allColumns.map((col) => (
                    <th key={col.key} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
                  <tr key={item._id as string} className="hover:bg-blue-50/30 transition-colors group">
                    {allColumns.map((col) => {
                      const val = item[col.key];
                      const display = Array.isArray(val) ? val.join(", ") : String(val ?? "—");
                      return (
                        <td key={col.key} className="px-6 py-4 text-gray-700 max-w-xs truncate" title={display}>
                          {display}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-right">
                      {deleteConfirm === (item._id as string) ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-gray-500">Delete this?</span>
                          <button onClick={() => handleDelete(item._id as string)} className="text-xs bg-red-600 text-white px-2.5 py-1 rounded-md hover:bg-red-700 font-medium">
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
                            onClick={() => setDeleteConfirm(item._id as string)}
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
        fields={mergedFields}
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
        fields={mergedFields}
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
