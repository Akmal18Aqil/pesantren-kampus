import "@/styles/globals.css";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};
export const metadata: Metadata = {
  title: {
    default: "SIAKAD Pesantren",
    template: "%s | SIAKAD Pesantren"
  },
  description: "Sistem Informasi Akademik untuk kampus di lingkungan pesantren",
  applicationName: "SIAKAD Pesantren",
  keywords: ["siakad", "akademik", "pesantren", "kampus", "pendidikan islam"],
  authors: [{
    name: "Admin Pesantren"
  }],
  creator: "Tim Pengembang SIAKAD",
  publisher: "Pesantren Modern",
  icons: {
    icon: [{
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png"
    }, {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    }, {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon"
    }],
    apple: [{
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png"
    }]
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SIAKAD Pesantren"
  },
  formatDetection: {
    telephone: false
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="id" className={`${GeistSans.variable}`} data-unique-id="606f6e9f-e933-4722-b03d-3a0a53603524" data-loc="58:9-58:61" data-file-name="app/layout.tsx">
      <body className="bg-[#f8f9fa]" data-unique-id="52ae40a7-e8ca-4a18-a75e-27855bbb3b95" data-loc="59:6-59:37" data-file-name="app/layout.tsx">{children}</body>
    </html>;
}