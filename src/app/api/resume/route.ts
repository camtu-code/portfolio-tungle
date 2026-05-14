import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import { ResumePDF, ResumeData } from '@/lib/ResumePDF';
import React from 'react';
import { promises as fs } from 'node:fs';
import path from 'node:path';

// ─────────────────────────────────────────────
// YOUR RESUME DATA — edit this to match your CV
// ─────────────────────────────────────────────
const RESUME_DATA: ResumeData = {
  name: 'Lê Thanh Tùng',
  title: 'Junior Fullstack Developer',
  email: 'lethanhtung@example.com',
  phone: '+84 xxx xxx xxx',
  birthDate: '08/06/2003',
  location: 'Hanoi, Vietnam',
  github: 'github.com/lethanhtung',
  linkedin: 'linkedin.com/in/lethanhtung',
  about:
    'Bachelor graduate with hands-on fullstack development experience. I am applying for a role above intern level, where I can own features end-to-end and deliver stable, scalable products with clear business impact.',
  mainProject: {
    name: 'edutech.AI',
    role: 'Main Product Project - Fullstack Contributor',
    description:
      'Built and improved core modules for an AI-powered education platform, including learning workflows, API integration, and responsive dashboards. Focused on clean architecture, maintainable code, and measurable user experience improvements.',
  },
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'HTML5/CSS3', 'JavaScript ES6+'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'REST APIs', 'Auth & Access Control', 'Data Validation'],
    },
    {
      category: 'Database & Tools',
      items: ['MySQL/PostgreSQL', 'Prisma ORM', 'Git/GitHub', 'Docker (Basic)'],
    },
  ],
  experience: [
    {
      title: 'Fullstack Developer Intern',
      company: 'Technology Company',
      period: '2024 – 2025',
      description:
        'Delivered frontend and backend features for internal systems, collaborated with senior engineers to resolve production bugs, and integrated APIs for business-critical workflows.',
    },
    {
      title: 'Personal and Academic Projects',
      company: 'Portfolio / Coursework',
      period: '2022 – 2024',
      description:
        'Built small to medium fullstack applications using Next.js, Node.js, and relational databases, with emphasis on code quality, maintainability, and real deployment readiness.',
    },
  ],
  education: [
    {
      degree: 'Bachelor Degree',
      school: 'University in Hanoi',
      year: 'Graduated',
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
