'use client';

import { FileText } from 'lucide-react';

export default function DownloadResumeBtn() {
  return (
    <a 
      href="/TungLe_Resume.md" 
      download
      className="inline-flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
    >
      <FileText size={16} />
      <span>Resume</span>
    </a>
  );
}
