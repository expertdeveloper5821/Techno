import CmsPage from "@/app/components/admin/CmsPage";

export default function BlogPostsAdmin() {
  return (
    <CmsPage
      title="📝 Blog Posts"
      apiBase="/api/admin/blog-posts"
      primaryField="title"
      tableColumns={[
        { key: "category", label: "Category" },
        { key: "author", label: "Author" },
        { key: "date", label: "Date" },
      ]}
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "author", label: "Author", type: "text" },
        { key: "date", label: "Date", type: "date" },
        {
          key: "category",
          label: "Category",
          type: "select",
          options: [
            "Technology",
            "Marketing",
            "Business",
            "Case Studies",
            "AI Solutions",
            "E-Commerce",
          ],
        },
        { key: "image", label: "Image URL", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
        { key: "excerpt", label: "Excerpt / Summary", type: "richtext" },
      ]}
    />
  );
}
