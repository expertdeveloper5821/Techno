"use client";
import { usePathname } from "next/navigation";
import Header from "./Header/Header";
import Footer from "./Home-com/Footer/Footer";
import ContactPopupLoader from "./Home-com/Contact/ContactPopupLoader";

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // Admin pages: no header, no footer, no contact popup — just the page
    return <>{children}</>;
  }

  return (
    <>
      {/* Skip to main content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:text-lg focus:font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-[#0094DB]"
      >
        Skip to main content
      </a>
      <div className="sm:relative">
        <Header />
      </div>
      <ContactPopupLoader />
      {children}
      <Footer />
    </>
  );
}
