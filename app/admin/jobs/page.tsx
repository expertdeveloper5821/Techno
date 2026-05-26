import CmsPage from "@/app/components/admin/CmsPage";

export default function JobsAdmin() {
  return (
    <CmsPage
      title="💼 Job Openings"
      apiBase="/api/admin/jobs"
      primaryField="title"
      tableColumns={[
        { key: "type", label: "Type" },
        { key: "location", label: "Location" },
        { key: "experience", label: "Experience" },
      ]}
      fields={[
        { key: "title", label: "Job Title", type: "text" },
        { key: "experience", label: "Experience Required", type: "text" },
        { key: "type", label: "Job Type (e.g. Full-time)", type: "text" },
        { key: "location", label: "Location", type: "text" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "description", label: "Job Description", type: "textarea" },
      ]}
    />
  );
}
