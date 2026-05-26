import CmsPage from "@/app/components/admin/CmsPage";

export default function PartnersAdmin() {
  return (
    <CmsPage
      title="🤝 Partners"
      apiBase="/api/admin/partners"
      primaryField="name"
      tableColumns={[{ key: "order", label: "Order" }]}
      fields={[
        { key: "name", label: "Partner Name", type: "text" },
        { key: "logoGray", label: "Gray Logo URL", type: "url" },
        { key: "logoColor", label: "Color Logo URL", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
