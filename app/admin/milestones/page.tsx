import CmsPage from "@/app/components/admin/CmsPage";

export default function MilestonesAdmin() {
  return (
    <CmsPage
      title="🏆 Milestones"
      apiBase="/api/admin/milestones"
      primaryField="image"
      tableColumns={[{ key: "order", label: "Order" }]}
      fields={[
        { key: "image", label: "Image", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
