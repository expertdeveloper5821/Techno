import CmsPage from "@/app/components/admin/CmsPage";

export default function TechnologiesAdmin() {
  return (
    <CmsPage
      title="💻 Technologies"
      apiBase="/api/admin/technologies"
      primaryField="name"
      tableColumns={[
        { key: "row", label: "Row" },
        { key: "order", label: "Order" },
      ]}
      fields={[
        { key: "name", label: "Technology Name", type: "text" },
        { key: "logo", label: "Logo URL", type: "url" },
        { key: "row", label: "Marquee Row (1 or 2)", type: "number" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
