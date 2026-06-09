"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavItem {
  name: string;
  path: string;
  icon: string;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  icon: string;
  items: NavItem[];
}

const CMS_TREE: NavGroup[] = [
  {
    label: "Home Page",
    icon: "🏠",
    items: [
      { name: "Products", path: "/admin/products", icon: "📦" },
      { name: "Service Slides", path: "/admin/service-slides", icon: "🎠" },
      { name: "Partners", path: "/admin/partners", icon: "🤝" },
      { name: "Technologies", path: "/admin/technologies", icon: "💻" },
    ],
  },
  {
    label: "FAQ Page",
    icon: "❓",
    items: [
      { name: "FAQs", path: "/admin/faqs", icon: "❓" },
    ],
  },
  {
    label: "About Page",
    icon: "ℹ️",
    items: [
      { name: "Milestones", path: "/admin/milestones", icon: "🏆" },
    ],
  },
  {
    label: "Services Page",
    icon: "🛠️",
    items: [
      { name: "Our services", path: "/admin/what-we-do", icon: "🎯" },
    ],
  },
  {
    label: "Industries Page",
    icon: "🏭",
    items: [
      { name: "Industrie Serve", path: "/admin/industrie-serve", icon: "🛒" },
    ],
  },
  {
    label: "Career Page",
    icon: "💼",
    items: [
      { name: "Job Openings", path: "/admin/jobs", icon: "💼" },
      { name: "Growth Items", path: "/admin/growth-items", icon: "📈" },
    ],
  },
  {
    label: "Blog Page",
    icon: "📝",
    items: [
      { name: "Blog Posts", path: "/admin/blogposts", icon: "📝" },
    ],
  },
  {
    label: "Portfolio Page",
    icon: "🖼️",
    items: [
      { name: "Portfolio", path: "/admin/portfolio", icon: "🖼️" },
    ],
  },
  {
    label: "Legal",
    icon: "📋",
    items: [
      { name: "Privacy Policy", path: "/admin/privacy-policy", icon: "🔒" },
      { name: "Terms & Conditions", path: "/admin/terms", icon: "📋" },
    ],
  },
  {
    label: "Shared Sections",
    icon: "🔗",
    items: [
      { name: "Services", path: "/admin/services", icon: "⚙️" },
      { name: "Features", path: "/admin/features", icon: "✨" },
      { name: "Industries", path: "/admin/industries", icon: "🏭" },
    ],
  },
  {
    label: "Contact Page",
    icon: "📬",
    items: [
      { name: "Submissions", path: "/admin/contacts", icon: "📬" },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    // Auto-expand the group that contains the current path
    CMS_TREE.filter((g) => g.items.some((item) => pathname.startsWith(item.path))).map((g) => g.label)
  );

  // Don't render the shell on the login page
  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.path : pathname.startsWith(item.path);

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
          {/* Dashboard link */}
          <Link
            href="/admin"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-2 ${
              pathname === "/admin"
                ? "bg-blue-600 text-white font-medium"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-base">📊</span>
            Dashboard
          </Link>

          {/* Tree groups */}
          <div className="space-y-1">
            {CMS_TREE.map((group) => {
              const isExpanded = expandedGroups.includes(group.label);
              const hasActiveChild = group.items.some((item) => isActive(item));

              return (
                <div key={group.label}>
                  {/* Group header */}
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      hasActiveChild
                        ? "text-blue-300 bg-gray-800/50"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{group.icon}</span>
                    <span className="flex-1 text-left font-medium">{group.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Group items */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="ml-4 border-l border-gray-700 pl-2 mt-1 space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive(item)
                                ? "bg-blue-600 text-white font-medium"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            <span className="text-sm">{item.icon}</span>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
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
