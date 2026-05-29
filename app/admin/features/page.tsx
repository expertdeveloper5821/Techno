import CmsPage from "@/app/components/admin/CmsPage";

export default function FeaturesAdmin() {
  return (
    <CmsPage
      title="✨ Features"
      apiBase="/api/admin/features"
      primaryField="title"
      tableColumns={[{ key: "order", label: "Order" }]}
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "image", label: "Image URL", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
