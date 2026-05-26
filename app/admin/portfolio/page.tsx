import CmsPage from "@/app/components/admin/CmsPage";

export default function PortfolioAdmin() {
  return (
    <CmsPage
      title="🖼️ Portfolio"
      apiBase="/api/admin/portfolio"
      primaryField="title"
      tableColumns={[
        { key: "category", label: "Category" },
        { key: "tag", label: "Tag" },
      ]}
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "tag", label: "Tag", type: "text" },
        {
          key: "category",
          label: "Category",
          type: "select",
          options: [
            "Consulting",
            "Mobile Apps",
            "Web Development",
            "Cloud & DevOps",
            "AI Solutions",
            "E-Commerce",
          ],
        },
        { key: "image", label: "Image URL", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
