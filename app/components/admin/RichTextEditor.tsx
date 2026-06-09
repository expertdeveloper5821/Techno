"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function RichTextEditor({
  label,
  value,
  onChange,
  required,
}: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "blockquote",
    "link",
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="rich-text-editor">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Start writing..."
        />
      </div>
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 150px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          font-size: 0.875rem;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: #f9fafb;
        }
        .rich-text-editor .ql-editor {
          min-height: 150px;
        }
      `}</style>
    </div>
  );
}
