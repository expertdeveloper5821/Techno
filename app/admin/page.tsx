import Link from "next/link";

const SECTIONS = [
  { name: "Contacts", path: "/admin/contacts", icon: "📬", desc: "View & manage contact form submissions" },
  { name: "Products", path: "/admin/products", icon: "📦", desc: "Manage product listings" },
  { name: "Services", path: "/admin/services", icon: "⚙️", desc: "Manage service offerings" },
  { name: "Partners", path: "/admin/partners", icon: "🤝", desc: "Manage partner logos" },
  { name: "Technologies", path: "/admin/technologies", icon: "💻", desc: "Manage tech stack display" },
  { name: "FAQs", path: "/admin/faqs", icon: "❓", desc: "Manage frequently asked questions" },
  { name: "Blog Posts", path: "/admin/blogposts", icon: "📝", desc: "Manage blog articles" },
  { name: "Portfolio", path: "/admin/portfolio", icon: "🖼️", desc: "Manage portfolio works" },
  { name: "Industries", path: "/admin/industries", icon: "🏭", desc: "Manage industry sections" },
  { name: "Job Openings", path: "/admin/jobs", icon: "💼", desc: "Manage career listings" },
  { name: "Growth Items", path: "/admin/growth-items", icon: "📈", desc: "Manage career growth items" },
  { name: "Features", path: "/admin/features", icon: "✨", desc: "Manage feature highlights" },
  { name: "What We Do", path: "/admin/what-we-do", icon: "🎯", desc: "Manage service detail sections" },
  { name: "Privacy Policy", path: "/admin/privacy-policy", icon: "🔒", desc: "Manage privacy policy sections" },
  { name: "Terms & Conditions", path: "/admin/terms", icon: "📋", desc: "Manage terms sections" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Select a section to manage your content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.name}
            href={s.path}
            className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <h2 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {s.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
