"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const CMS_SECTIONS = [
  { name: "Dashboard", path: "/admin", icon: "🏠", exact: true },
  { name: "Contacts", path: "/admin/contacts", icon: "📬" },
  { name: "Products", path: "/admin/products", icon: "📦" },
  { name: "Services", path: "/admin/services", icon: "⚙️" },
  { name: "Service Slides", path: "/admin/service-slides", icon: "🎠" },
  { name: "Partners", path: "/admin/partners", icon: "🤝" },
  { name: "Technologies", path: "/admin/technologies", icon: "💻" },
  { name: "FAQs", path: "/admin/faqs", icon: "❓" },
  { name: "Blog Posts", path: "/admin/blogposts", icon: "📝" },
  { name: "Portfolio", path: "/admin/portfolio", icon: "🖼️" },
  { name: "Industries", path: "/admin/industries", icon: "🏭" },
  { name: "Job Openings", path: "/admin/jobs", icon: "💼" },
  { name: "Growth Items", path: "/admin/growth-items", icon: "📈" },
  { name: "Features", path: "/admin/features", icon: "✨" },
  { name: "What We Do", path: "/admin/what-we-do", icon: "🎯" },
  { name: "Milestones", path: "/admin/milestones", icon: "🏆" },
  { name: "Privacy Policy", path: "/admin/privacy-policy", icon: "🔒" },
  { name: "Terms & Conditions", path: "/admin/terms", icon: "📋" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't render the shell on the login page
  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (section: { path: string; exact?: boolean }) =>
    section.exact ? pathname === section.path : pathname.startsWith(section.path);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
            T
          </div>
          <span className="font-bold text-lg leading-tight">Technogetic CMS</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="space-y-0.5">
            {CMS_SECTIONS.map((section) => (
              <li key={section.name}>
                <Link
                  href={section.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive(section)
                      ? "bg-blue-600 text-white font-medium"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="text-base">{section.icon}</span>
                  {section.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-red-900/40 hover:text-red-300 transition-colors"
          >
            <span className="text-base">🚪</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shrink-0">
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
          <span className="text-sm text-gray-500">Admin Panel</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
