import CmsPage from "@/app/components/admin/CmsPage";

export default function IndustriesServeAdmin() {
  return (
    <CmsPage
      title="🛒 Industrie Serve (Landscape Section)"
      apiBase="/api/admin/industrie-serve"
      primaryField="heading"
      tableColumns={[{ key: "order", label: "Order" }]}
      fields={[
        { key: "heading", label: "Section Heading", type: "text" },
        { key: "paragraphs", label: "Paragraphs (each line = separate paragraph)", type: "textarea" },
        { key: "highlightText", label: "Highlight Text (yellow)", type: "textarea" },
        { key: "feature1", label: "Feature Bullet 1", type: "text" },
        { key: "feature2", label: "Feature Bullet 2", type: "text" },
        { key: "feature3", label: "Feature Bullet 3", type: "text" },
        { key: "image", label: "Section Image URL", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
