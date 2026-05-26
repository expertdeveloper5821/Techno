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
      <div className="sm:relative">
        <Header />
      </div>
      <ContactPopupLoader />
      {children}
      <Footer />
    </>
  );
}
