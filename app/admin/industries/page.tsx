import CmsPage from "@/app/components/admin/CmsPage";

export default function IndustriesAdmin() {
  return (
    <CmsPage
      title="🏭 Industries"
      apiBase="/api/admin/industries"
      primaryField="title"
      tableColumns={[{ key: "order", label: "Order" }]}
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "icon", label: "Icon URL (color)", type: "url" },
        { key: "blackIcon", label: "Icon URL (black)", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
