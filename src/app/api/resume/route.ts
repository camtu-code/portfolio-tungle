import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import { ResumePDF, type ResumeData } from '@/lib/ResumePDF';
import { COGNIASSESS, S2G, PROJECT_SNAPSHOT } from '@/data/featuredProjects';
import React from 'react';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const RESUME_DATA: ResumeData = {
  name: 'Tung Le',
  title: 'Full-Stack Software Engineer',
  email: 'lethanhtung6803@gmail.com',
  phone: '+84 848 290 617',
  location: 'Hanoi, Vietnam',
  about:
    `Full-stack developer building education products with a background in pedagogy. I own frontend, backend and production operations. Project metrics as of ${PROJECT_SNAPSHOT.label}.`,
  mainProject: {
    name: COGNIASSESS.name,
    role: COGNIASSESS.role,
    description: COGNIASSESS.resumeDescription,
  },
  skills: [
    {
      category: 'Frontend',
      items: ['Next.js / React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    },
    {
      category: 'Backend & AI',
      items: ['Node.js / Express', 'Socket.IO / WebRTC', 'Python / OpenCV', 'Gemini / Cohere APIs'],
    },
    {
      category: 'Database & Operations',
      items: ['Prisma / Drizzle ORM', 'TiDB / MySQL', 'VPS / Nginx / PM2', 'Git / GitHub Actions'],
    },
  ],
  experience: [
    {
      title: S2G.role,
      company: S2G.name,
      period: 'Ongoing',
      description: S2G.resumeDescription,
    },
    {
      title: 'Lead Fullstack Developer',
      company: 'Prelynx (SunStudy Prep)',
      period: 'Ongoing',
      description:
        'Built an IELTS and Digital SAT preparation platform with diagnostic entry tests, practice roadmaps and learning analytics.',
    },
    {
      title: 'Fullstack Developer / Founder',
      company: 'OnlyGift.online',
      period: 'Ongoing',
      description:
        'Built a platform for personalized web interfaces with VietQR payments and webhook-based order reconciliation.',
    },
  ],
  education: [
    {
      degree: 'Applied AI Training Program (3 Months)',
      school: 'VinUni & Vingroup (Cohort 5)',
      year: '11/2026 – 01/2027',
    },
    {
      degree: 'Information Technology',
      school: 'University of Transport and Communications (UTC)',
      year: '2024 – 2026 (Expected)',
    },
    {
      degree: 'Pedagogical Certificate',
      school: 'Vocational Teaching Qualification',
      year: '2024 – 2025',
    },
    {
      degree: 'Information Technology (Graduated with Distinction)',
      school: 'Vietnam Polytechnic College',
      year: '2021 – 2024',
    },
  ],
};

export async function GET() {
  try {
    const profileImagePath = path.join(process.cwd(), 'public', 'anh1.jpg');
    const profileImageBuffer = await fs.readFile(profileImagePath);
    const profileImageDataUrl = `data:image/jpeg;base64,${profileImageBuffer.toString('base64')}`;

    const resumeDataWithPhoto: ResumeData = {
      ...RESUME_DATA,
      profileImage: profileImageDataUrl,
    };

    const pdfDocument = React.createElement(
      ResumePDF,
      { data: resumeDataWithPhoto }
    ) as unknown as React.ReactElement<DocumentProps>;
    const buffer = await renderToBuffer(pdfDocument);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="LeThanhTung-CV.pdf"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('[resume] PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
