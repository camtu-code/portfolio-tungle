'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  Menu,
  X,
  Home,
  TrendingUp,
  Layers,
  BookOpen,
  Code2,
  Compass,
  Briefcase,
  Mail,
  FileDown,
} from 'lucide-react';

const DRAWER_GROUPS = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Home', href: '#', icon: Home },
      { label: 'About & Growth Story', href: '#story', icon: TrendingUp },
    ],
  },
  {
    title: 'ENGINEERING',
    items: [
      { label: 'Live Projects', href: '#projects', icon: Layers, badge: '6' },
      { label: 'Case Studies', href: '#case-studies', icon: BookOpen },
      { label: 'Technical Skills', href: '#skills', icon: Code2 },
    ],
  },
  {
    title: 'BACKGROUND',
    items: [
      { label: 'Philosophy', href: '#philosophy', icon: Compass },
      { label: 'Experience & Education', href: '#experience', icon: Briefcase },
      { label: 'Get In Touch', href: '#contact', icon: Mail },
    ],
  },
];

const BOTTOM_TABS = [
  { label: 'Story', href: '#story', icon: TrendingUp },
  { label: 'Projects', href: '#projects', icon: Layers },
  { label: 'Cases', href: '#case-studies', icon: BookOpen },
  { label: 'Exp', href: '#experience', icon: Briefcase },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    setMounted(true);
    setActiveHash(window.location.hash || '');
    const onHashChange = () => setActiveHash(window.location.hash || '');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = prev;
        document.documentElement.classList.remove('lenis-stopped');
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [open]);

  return (
    <>
      {/* Hamburger trigger in Header (mobile only) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="sm:hidden p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
        aria-label="Open navigation menu"
      >
        <Menu size={18} />
      </button>

      {/* Portalled Elements: Drawer + Fixed Bottom Nav (rendered directly into body to avoid any header containing block) */}
      {mounted &&
        createPortal(
          <>
            {/* Slide-out Drawer */}
            {open && (
              <div
                className="fixed inset-0 z-[100] sm:hidden flex"
                data-lenis-prevent="true"
                role="dialog"
                aria-modal="true"
              >
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
                  onClick={() => setOpen(false)}
                />

                {/* Drawer panel */}
                <aside
                  className="relative z-10 w-72 max-w-[82vw] h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain animate-in slide-in-from-left duration-250"
                  onWheel={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between px-4 h-16 border-b border-zinc-200/80 dark:border-zinc-800/80 shrink-0">
                      <a href="#" onClick={() => setOpen(false)} className="flex items-center">
                        <Image
                          src="/logo.png"
                          alt="TungLeDev Logo"
                          width={140}
                          height={38}
                          className="h-8 w-auto object-contain dark:brightness-110"
                        />
                      </a>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors"
                        aria-label="Close navigation menu"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Grouped Navigation Links */}
                    <div className="flex flex-col gap-5 px-3 py-5">
                      {DRAWER_GROUPS.map((group) => (
                        <div key={group.title} className="flex flex-col gap-1">
                          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                            {group.title}
                          </span>
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeHash === item.href;
                            return (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={() => {
                                  setActiveHash(item.href);
                                  setOpen(false);
                                }}
                                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                  isActive
                                    ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900'
                                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-50'
                                }`}
                              >
                                <span className="flex items-center gap-3">
                                  <Icon
                                    size={16}
                                    className={
                                      isActive
                                        ? 'text-inherit'
                                        : 'text-zinc-500 dark:text-zinc-400'
                                    }
                                  />
                                  <span>{item.label}</span>
                                </span>
                                {item.badge && (
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                      isActive
                                        ? 'bg-emerald-400/25 text-emerald-200'
                                        : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </a>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Profile / Quick Stats Card (inspired by S2G drawer footer) */}
                  <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col gap-2.5 bg-zinc-50/80 dark:bg-zinc-900/50">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">1,073+ Users</span>
                      <span className="text-zinc-300 dark:text-zinc-700">|</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">6 Live Apps</span>
                    </div>

                    <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Le Thanh Tung</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                          OPEN TO WORK
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Fullstack &amp; Applied AI Engineer · Hanoi
                      </p>
                      <a
                        href="/api/resume"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="mt-1 inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                      >
                        <FileDown size={14} />
                        <span>Download Resume (PDF)</span>
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            )}

            {/* Fixed Bottom Navigation Bar (S2G-style mobile quick bar, strictly pinned to viewport bottom) */}
            <nav
              aria-label="Mobile quick navigation"
              className="sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.35)]"
            >
              <div className="grid grid-cols-5 h-14">
                {BOTTOM_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeHash === tab.href;
                  return (
                    <a
                      key={tab.label}
                      href={tab.href}
                      onClick={() => setActiveHash(tab.href)}
                      className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors active:scale-95 ${
                        isActive
                          ? 'text-zinc-950 dark:text-zinc-100 font-semibold'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      <div className={`p-1 rounded-lg ${isActive ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}>
                        <Icon size={18} className={isActive ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-500 dark:text-zinc-400'} />
                      </div>
                      <span>{tab.label}</span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </>,
          document.body
        )}
    </>
  );
}
