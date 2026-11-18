'use client';

import React, { useState } from 'react';
import { Terminal, ShieldCheck, X, Database, Server, Calendar, TrendingUp, CheckCircle2 } from 'lucide-react';
import { EVIDENCE_DATA, type ProjectEvidence } from '@/data/evidence';

interface EvidenceModalProps {
  projectId: string;
  projectName: string;
}

export default function EvidenceModal({ projectId, projectName }: EvidenceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const evidence: ProjectEvidence | undefined = EVIDENCE_DATA[projectId];

  if (!evidence) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer shadow-sm hover:shadow"
        title="View audited database metrics and SQL verification"
      >
        <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
        <span>Live DB Audit Proof</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck size={16} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">Production Database Audit & Evidence</h3>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Verified system metrics directly queried from live infrastructure for <strong>{projectName}</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Infrastructure Details */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                <Database size={16} className="text-zinc-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-zinc-500 dark:text-zinc-400">Database Engine</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">{evidence.databaseEngine}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                <Server size={16} className="text-zinc-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-zinc-500 dark:text-zinc-400">Host Environment</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">{evidence.hostType}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                <Calendar size={16} className="text-zinc-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-zinc-500 dark:text-zinc-400">Audit Timestamp</div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">{evidence.auditDate}</div>
                </div>
              </div>
            </div>

            {/* Terminal Output Snapshot */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Terminal size={14} className="text-emerald-500" />
                  Terminal Raw SQL Aggregate
                </span>
                <span className="text-[11px] text-zinc-400">Read-Only Audit Query</span>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-300 shadow-inner overflow-x-auto">
                <div className="text-emerald-400 select-all">$ {evidence.terminalCommand}</div>
                <div className="text-zinc-400 select-all whitespace-pre mt-2.5 pt-2.5 border-t border-zinc-800/80">{evidence.terminalOutput}</div>
              </div>
            </div>

            {/* Monthly Growth Breakdown (if exists) */}
            {evidence.monthlyBreakdown && evidence.monthlyBreakdown.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  <TrendingUp size={14} className="text-emerald-500" />
                  Monthly Study Session Telemetry
                </div>
                <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400">
                      <tr>
                        <th className="p-2.5 font-medium">Month</th>
                        <th className="p-2.5 font-medium">Recorded Sessions</th>
                        <th className="p-2.5 font-medium">Active Learners</th>
                        <th className="p-2.5 font-medium">Total Focus Hours</th>
                        <th className="p-2.5 font-medium">Avg Session Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
                      {evidence.monthlyBreakdown.map((row) => (
                        <tr key={row.month} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                          <td className="p-2.5 font-medium text-zinc-900 dark:text-zinc-100">{row.month}</td>
                          <td className="p-2.5 tabular-nums text-zinc-600 dark:text-zinc-400">{row.sessions.toLocaleString()}</td>
                          <td className="p-2.5 tabular-nums text-zinc-600 dark:text-zinc-400">{row.activeUsers}</td>
                          <td className="p-2.5 tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">{row.hours.toLocaleString()} hrs</td>
                          <td className="p-2.5 tabular-nums text-zinc-500 dark:text-zinc-400">{row.avgMinutes} min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Detailed Metric Cards */}
            <div className="mt-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Metric Highlights & Data Integrity
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {evidence.metricsBreakdown.map((item) => (
                  <div key={item.label} className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</div>
                    <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">{item.value}</div>
                    {item.note && <div className="text-[11px] text-zinc-400 mt-1">{item.note}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Notes */}
            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                Audit & Verification Policy
              </div>
              <ul className="list-disc pl-4 space-y-1 text-xs text-emerald-900/80 dark:text-emerald-300/80">
                {evidence.verificationNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
