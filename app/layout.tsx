import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Samir Tamang || Web Developer",
  description:
    "A cinematic sci-fi portfolio showcasing cutting-edge web development projects and skills",
  icons: {
    icon: "/vercel.jpg",
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
