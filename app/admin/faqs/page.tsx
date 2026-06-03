"use client";

import { useEffect, useState } from "react";
import CmsPage from "@/app/components/admin/CmsPage";

export default function FAQsAdmin() {
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch existing FAQs and extract unique categories from the meta field
  useEffect(() => {
    fetch("/api/admin/faqs")
      .then((r) => r.json())
      .then((data: { meta?: string }[]) => {
        if (!Array.isArray(data)) return;
        const unique = Array.from(
          new Set(
            data
              .map((item) => item.meta?.trim())
              .filter((v): v is string => !!v)
          )
        ).sort();
        setCategories(unique);
      })
      .catch(() => {});
  }, []);

  return (
    <CmsPage
      title="❓ FAQs"
      apiBase="/api/admin/faqs"
      primaryField="question"
      tableColumns={[
        { key: "meta", label: "Category" },
        { key: "order", label: "Order" },
      ]}
      dynamicOptions={{ meta: categories }}
      fields={[
        { key: "question", label: "Question", type: "text", required: true },
        {
          key: "meta",
          label: "Category",
          type: "select-creatable",
          options: categories,
          required: true,
        },
        { key: "order", label: "Display Order", type: "number" },
        { key: "answer", label: "Answer", type: "textarea", required: true },
      ]}
    />
  );
}
