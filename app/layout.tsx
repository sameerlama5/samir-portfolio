import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Lama IT Club — Modern Web Development & Creative Digital Solutions",
  description:
    "Custom WordPress development, WooCommerce solutions, and modern frontend engineering crafted with performance and creativity in mind.",
  icons: {
    icon: "/vercel.jpg",
  },
   keywords: [
    "Lama IT Club",
    "WordPress Developer",
    "Elementor Developer",
    "WooCommerce Developer",
    "Tailwind CSS",
    "MERN Stack Developer",
    "Web Developer Nepal"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
