'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, Terminal, ChevronRight, X, ArrowUpRight, Cpu, Layers, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '@/data/caseStudies';

export default function CaseStudiesSection() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="flex flex-col gap-8 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-xs font-medium w-fit">
            <Sparkles size={13} className="text-indigo-500" />
            <span>Engineering Insights & Case Studies</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Bài viết Kỹ thuật &amp; Kiến trúc Thực chiến
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Tổng hợp kinh nghiệm thực tế về xử lý tải cao, quản trị hạ tầng VPS và xây dựng mô hình AI an toàn được đúc kết qua quá trình phát triển sản phẩm thật.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CASE_STUDIES.map((item) => (
          <div
            key={item.slug}
            onClick={() => setSelectedCase(item)}
            className="group cursor-pointer rounded-2xl border border-zinc-200/80 bg-white/50 dark:border-zinc-800/80 dark:bg-zinc-900/30 p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:border-zinc-700 dark:hover:shadow-zinc-950/40 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-mono">{item.date}</span>
                <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium">{item.readTime}</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                {item.excerpt}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Đọc chi tiết kiến trúc</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-hidden"
          onClick={() => setSelectedCase(null)}
        >
          <div
            data-lenis-prevent="true"
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                    {selectedCase.readTime}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{selectedCase.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <div className="rounded-xl bg-zinc-50 p-4 border border-zinc-200 dark:bg-zinc-900/60 dark:border-zinc-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">Tóm tắt giải pháp</div>
                <p className="text-zinc-800 dark:text-zinc-200 font-medium">{selectedCase.summary}</p>
              </div>

              {/* Architecture 4-step breakdown: Problem -> Decision -> Trade-off -> Result */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20">
                  <div className="font-semibold text-rose-700 dark:text-rose-400 text-xs mb-1.5 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    1. Vấn đề gặp phải (Root Cause)
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedCase.architecture.problem}</p>
                </div>

                <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20">
                  <div className="font-semibold text-indigo-700 dark:text-indigo-400 text-xs mb-1.5 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                    2. Quyết định kỹ thuật (Decision)
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedCase.architecture.decision}</p>
                </div>

                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20">
                  <div className="font-semibold text-amber-700 dark:text-amber-400 text-xs mb-1.5 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    3. Đánh đổi chấp nhận (Trade-off)
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedCase.architecture.tradeOff}</p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-xs mb-1.5 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    4. Kết quả đo đạc (Measured Result)
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedCase.architecture.result}</p>
                </div>
              </div>

              {/* Key takeaways */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Kinh nghiệm &amp; Bài học rút ra
                </h4>
                <ul className="space-y-2 text-xs">
                  {selectedCase.keyTakeaways.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Search Keywords Tag Cloud */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-2 font-mono">Từ khóa tìm kiếm liên quan (SEO Queries):</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.searchKeywords.map((kw) => (
                    <span key={kw} className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
