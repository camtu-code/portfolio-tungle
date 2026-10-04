import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import PageViewTracker from "@/components/PageViewTracker";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tung Le | Fullstack Developer",
  description: "Portfolio of Tung Le, a Fullstack Developer building modern web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} data-theme="dark">
      <body className="antialiased min-h-screen selection:bg-zinc-800 selection:text-zinc-100 relative">
        <div className="fixed inset-0 z-[-1] bg-grid-pattern opacity-30 dark:opacity-20 pointer-events-none" />
        <SmoothScroll>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          
          <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md">
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
              <a href="#" className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">Tung Le</a>
              <div className="flex items-center gap-6">
                <nav className="hidden sm:flex gap-6 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  <a href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Projects</a>
                  <a href="#skills" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Skills</a>
                  <a href="#philosophy" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Philosophy</a>
                  <a href="#experience" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Experience</a>
                  <a href="#contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Contact</a>
                </nav>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-24 flex flex-col gap-24 relative">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
