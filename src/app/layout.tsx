import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Image from "next/image";
import PageViewTracker from "@/components/PageViewTracker";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeToggle from "@/components/ThemeToggle";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tungledev.id.vn"),
  title: {
    default: "Lê Thanh Tùng (Tung Le) | Fullstack Software Engineer & AI Builder",
    template: "%s | Lê Thanh Tùng",
  },
  description:
    "Portfolio của Lê Thanh Tùng (TungLeDev) - Kỹ sư phần mềm Fullstack & AI tại Hà Nội. Tác giả & vận hành S2G Study (1.000+ users), Carevia AI Y tế (VinUni AI Cohort 5), CogniAssess & Prelynx.",
  keywords: [
    "Lê Thanh Tùng",
    "Le Thanh Tung",
    "Tung Le",
    "TungLeDev",
    "tungledev.id.vn",
    "Lập trình viên Fullstack",
    "Fullstack Software Engineer",
    "AI Engineer Vietnam",
    "S2G Study",
    "StudyStream",
    "s2g.io.vn",
    "Carevia",
    "VinUni AI Thực Chiến",
    "CogniAssess",
    "cna.io.vn",
    "Next.js Developer Vietnam",
    "Lập trình viên Hà Nội",
  ],
  authors: [{ name: "Lê Thanh Tùng", url: "https://tungledev.id.vn" }],
  creator: "Lê Thanh Tùng",
  publisher: "Lê Thanh Tùng",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://tungledev.id.vn",
  },
  openGraph: {
    type: "profile",
    firstName: "Tùng",
    lastName: "Lê Thanh",
    username: "tungledev",
    gender: "male",
    locale: "vi_VN",
    url: "https://tungledev.id.vn",
    title: "Lê Thanh Tùng (Tung Le) | Fullstack Software Engineer & AI Builder",
    description:
      "Khám phá portfolio và các sản phẩm công nghệ thực tế phục vụ 1.000+ người dùng của Lê Thanh Tùng: S2G StudyStream, Carevia AI VinUni, CogniAssess.",
    siteName: "TungLeDev Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1405,
        height: 378,
        alt: "Lê Thanh Tùng - Fullstack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lê Thanh Tùng (Tung Le) | Fullstack Software Engineer & AI Builder",
    description:
      "Portfolio của Lê Thanh Tùng - Kỹ sư phần mềm Fullstack & AI. Vận hành S2G Study (1.000+ users), Carevia AI VinUni.",
    images: ["/logo.png"],
    creator: "@tungledev",
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
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "HMGUbvZwqyZSQxVKguq0d8YvE32AJHIZmFAiZP1o5aU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} scroll-smooth`} data-theme="dark">
      <head>
        {/* JSON-LD Schema Structured Data for Google Knowledge Graph & Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://tungledev.id.vn/#person",
                  "name": "Lê Thanh Tùng",
                  "alternateName": ["Tung Le", "TungLeDev"],
                  "jobTitle": "Fullstack Software Engineer & AI Builder",
                  "url": "https://tungledev.id.vn",
                  "image": "https://tungledev.id.vn/logo.png",
                  "sameAs": [
                    "https://github.com/camtu-code",
                    "https://github.com/griin-03/P-033"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Hà Nội",
                    "addressCountry": "VN"
                  },
                  "alumniOf": [
                    {
                      "@type": "EducationalOrganization",
                      "name": "Đại học Giao thông Vận tải"
                    },
                    {
                      "@type": "EducationalOrganization",
                      "name": "Cao đẳng Bách khoa Việt Nam"
                    }
                  ],
                  "knowsAbout": [
                    "Fullstack Development",
                    "Next.js",
                    "React",
                    "Node.js",
                    "FastAPI",
                    "Python",
                    "LangGraph",
                    "Artificial Intelligence",
                    "Oracle Cloud VPS",
                    "MariaDB"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://tungledev.id.vn/#website",
                  "url": "https://tungledev.id.vn",
                  "name": "TungLeDev - Portfolio Lê Thanh Tùng",
                  "description": "Portfolio của Lê Thanh Tùng, lập trình viên Fullstack & AI tại Hà Nội.",
                  "publisher": { "@id": "https://tungledev.id.vn/#person" },
                  "inLanguage": "vi-VN"
                }
              ]
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-zinc-800 selection:text-zinc-100 relative">
        <div className="fixed inset-0 z-[-1] bg-grid-pattern opacity-30 dark:opacity-20 pointer-events-none" />
        <SmoothScroll>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          
          <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md">
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
              <a href="#" className="flex items-center group transition-transform hover:scale-105 active:scale-95">
                <div className="relative h-9 md:h-10 w-auto flex items-center">
                  <Image 
                    src="/logo.png" 
                    alt="Tùng Lê Logo" 
                    width={180} 
                    height={48} 
                    className="h-9 md:h-10 w-auto object-contain dark:brightness-110 drop-shadow-sm" 
                    priority
                  />
                </div>
              </a>
              <div className="flex items-center gap-6">
                <nav className="hidden sm:flex gap-6 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  <a href="#story" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Story</a>
                  <a href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Projects</a>
                  <a href="#case-studies" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Case Studies</a>
                  <a href="#skills" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Skills</a>
                  <a href="#philosophy" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Philosophy</a>
                  <a href="#experience" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Experience</a>
                  <a href="#contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Contact</a>
                </nav>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <MobileNav />
                </div>
              </div>
            </div>
          </header>

          <main className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-24 pb-24 sm:pb-24 flex flex-col gap-24 relative">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
