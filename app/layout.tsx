import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://lamasamir.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Lama IT Club — Modern Web Development & Creative Digital Solutions",

    template: "%s | Lama IT Club",
  },

  description:
    "Custom WordPress development, WooCommerce solutions, and modern frontend engineering crafted with performance and creativity in mind.",

  keywords: [
    "Lama IT Club",
    "WordPress Developer",
    "Elementor Developer",
    "WooCommerce Developer",
    "Tailwind CSS",
    "MERN Stack Developer",
    "Web Developer Nepal",
  ],

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/vercel.jpg",
  },

  openGraph: {
    title:
      "Lama IT Club — Modern Web Development & Creative Digital Solutions",

    description:
      "Custom WordPress development, WooCommerce solutions, and modern frontend engineering crafted with performance and creativity in mind.",

    url: siteUrl,

    siteName: "Lama IT Club",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lama IT Club",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Lama IT Club — Modern Web Development & Creative Digital Solutions",

    description:
      "Custom WordPress development, WooCommerce solutions, and modern frontend engineering crafted with performance and creativity in mind.",

    images: ["/og-image.jpg"],
  },
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
