import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Technogetic - Digital Solutions & IT Services",
  description: "Technogetic simplifies technology, transforming complexity into seamless solutions to drive innovation, efficiency, and digital success.",
  keywords: [
    "web development",
    "mobile app development",
    "UI/UX design",
    "digital marketing",
    "cloud computing",
    "IT solutions",
    "software development",
    "technogetic",
  ],
  authors: [{ name: "Technogetic" }],
  creator: "Technogetic",
  publisher: "Technogetic",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://technogetic.com",
    title: "Technogetic - Digital Solutions & IT Services",
    description: "Technogetic simplifies technology, transforming complexity into seamless solutions to drive innovation, efficiency, and digital success.",
    siteName: "Technogetic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technogetic - Digital Solutions & IT Services",
    description: "Technogetic simplifies technology, transforming complexity into seamless solutions to drive innovation, efficiency, and digital success.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
