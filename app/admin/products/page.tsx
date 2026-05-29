import CmsPage from "@/app/components/admin/CmsPage";

export default function ProductsAdmin() {
  return (
    <CmsPage
      title="📦 Products"
      apiBase="/api/admin/products"
      primaryField="title"
      tableColumns={[{ key: "techStack", label: "Tech Stack" }]}
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "techStack", label: "Tech Stack", type: "text" },
         { key: "image", label: "Image URL", type: "url" },
        { key: "image", label: "Product Image", type: "image" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
