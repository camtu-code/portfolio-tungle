import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import PageViewTracker from "@/components/PageViewTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tung Le | Fullstack Developer",
  description: "Portfolio of Tung Le, a Fullstack Developer building modern web applications.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <SmoothScroll>
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
