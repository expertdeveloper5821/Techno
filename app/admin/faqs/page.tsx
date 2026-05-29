import CmsPage from "@/app/components/admin/CmsPage";

export default function FAQsAdmin() {
  return (
    <CmsPage
      title="❓ FAQs"
      apiBase="/api/admin/faqs"
      primaryField="question"
      tableColumns={[{ key: "order", label: "Order" }]}
      fields={[
        { key: "question", label: "Question", type: "text" },
        { key: "meta", label: "Meta / Category", type: "text" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "answer", label: "Answer", type: "textarea" },
      ]}
    />
  );
}
