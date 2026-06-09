import Link from "next/link";

interface SectionItem {
  name: string;
  path: string;
  icon: string;
  desc: string;
}

interface PageGroup {
  label: string;
  icon: string;
  items: SectionItem[];
}

const PAGES: PageGroup[] = [
  {
    label: "Home Page ",
    icon: "🏠",
    items: [
      { name: "Products", path: "/admin/products", icon: "📦", desc: "Manage product listings" },
      { name: "Service Slides", path: "/admin/service-slides", icon: "🎠", desc: "Manage the coverflow service slider" },
      { name: "Partners", path: "/admin/partners", icon: "🤝", desc: "Manage partner logos" },
      { name: "Technologies", path: "/admin/technologies", icon: "💻", desc: "Manage tech stack display" },
    ],
  },
  {
    label: "FAQ Page",
    icon: "❓",
    items: [
      { name: "FAQs", path: "/admin/faqs", icon: "❓", desc: "Manage frequently asked questions (shown on Home & FAQ pages)" },
    ],
  },
  {
    label: "About Page",
    icon: "ℹ️",
    items: [
      { name: "Milestones", path: "/admin/milestones", icon: "🏆", desc: "Manage About page milestone photos" },
    ],
  },
  {
    label: "Services Page",
    icon: "🛠️",
    items: [
      { name: "What We Do", path: "/admin/what-we-do", icon: "🎯", desc: "Manage service detail sections" },
    ],
  },
  {
    label: "Industries Page",
    icon: "🏭",
    items: [
      { name: "Industrie Serve", path: "/admin/industrie-serve", icon: "🛒", desc: "Manage landscape section on Industries page" },
    ],
  },
  {
    label: "Career Page",
    icon: "💼",
    items: [
      { name: "Job Openings", path: "/admin/jobs", icon: "💼", desc: "Manage career listings" },
      { name: "Growth Items", path: "/admin/growth-items", icon: "📈", desc: "Manage career growth items" },
    ],
  },
  {
    label: "Blog Page",
    icon: "📝",
    items: [
      { name: "Blog Posts", path: "/admin/blogposts", icon: "📝", desc: "Manage blog articles" },
    ],
  },
  {
    label: "Portfolio Page",
    icon: "🖼️",
    items: [
      { name: "Portfolio", path: "/admin/portfolio", icon: "🖼️", desc: "Manage portfolio works" },
    ],
  },
  {
    label: "Legal",
    icon: "📋",
    items: [
      { name: "Privacy Policy", path: "/admin/privacy-policy", icon: "🔒", desc: "Manage privacy policy sections" },
      { name: "Terms & Conditions", path: "/admin/terms", icon: "📋", desc: "Manage terms sections" },
    ],
  },
  {
    label: "Shared Sections",
    icon: "🔗",
    items: [
      { name: "Services", path: "/admin/services", icon: "⚙️", desc: "Manage services (used on Home & About)" },
      { name: "Features", path: "/admin/features", icon: "✨", desc: "Manage features (used on About, Industries & Contact)" },
      { name: "Industries", path: "/admin/industries", icon: "🏭", desc: "Manage industries (used on About & Services)" },
    ],
  },
  {
    label: "Contact Page",
    icon: "📬",
    items: [
      { name: "Submissions", path: "/admin/contacts", icon: "📬", desc: "View all contact form submissions" },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your content organized by page sections.</p>
      </div>

      <div className="space-y-8">
        {PAGES.map((page) => (
          <section key={page.label}>
            {/* Page group header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{page.icon}</span>
              <h2 className="text-lg font-semibold text-gray-800">{page.label}</h2>
              <div className="flex-1 h-px bg-gray-200 ml-3" />
            </div>

            {/* Section cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {page.items.map((s) => (
                <Link
                  key={s.name}
                  href={s.path}
                  className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
