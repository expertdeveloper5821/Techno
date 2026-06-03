import CmsPage from "@/app/components/admin/CmsPage";

export default function ServiceSlidesAdmin() {
  return (
    <CmsPage
      title="🎠 Service Slides"
      apiBase="/api/admin/service-slides"
      primaryField="title"
      tableColumns={[{ key: "order", label: "Order" }]}
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "image", label: "Image", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
