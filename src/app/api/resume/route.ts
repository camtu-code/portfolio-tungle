import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import { ResumePDF, ResumeData } from '@/lib/ResumePDF';
import React from 'react';

// ─────────────────────────────────────────────
// YOUR RESUME DATA — edit this to match your CV
// ─────────────────────────────────────────────
const RESUME_DATA: ResumeData = {
  name: 'Tung Le',
  title: 'Fullstack Developer | 3+ Years Experience',
  email: 'lethanhtung@example.com',
  phone: '+84 xxx xxx xxx',
  location: 'Ho Chi Minh City, Vietnam',
  github: 'github.com/tungdev',
  linkedin: 'linkedin.com/in/tungdev',
  about:
    'Passionate Fullstack Developer with 3+ years of experience building high-performance web applications. Specialized in React, Next.js, Node.js, and cloud infrastructure. I thrive on solving complex problems with clean, maintainable code.',
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'HTML / CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'NestJS', 'Python', 'GraphQL', 'REST APIs'],
    },
    {
      category: 'Database & Tools',
      items: ['PostgreSQL', 'MongoDB', 'Prisma', 'Docker', 'Git', 'AWS'],
    },
  ],
  experience: [
    {
      title: 'Senior Fullstack Developer',
      company: 'Tech Innovators Inc.',
      period: '2022 – Present',
      description:
        'Lead developer for multiple enterprise applications. Architected microservices with Node.js and improved frontend performance by 40% using Next.js. Mentored a team of 4 junior developers.',
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Solutions',
      period: '2020 – 2022',
      description:
        'Developed responsive web applications using React and Redux. Collaborated with UX designers to implement pixel-perfect user interfaces. Reduced bundle size by 35% through code splitting.',
    },
    {
      title: 'Web Developer Intern',
      company: 'Creative Agency',
      period: '2019 – 2020',
      description:
        'Assisted in building custom WordPress themes and basic React components. Gained hands-on experience in agile workflows and version control with Git.',
    },
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science',
      school: 'University of Technology, HCMC',
      year: '2015 – 2019',
    },
  ],
};

export async function GET() {
  try {
    const pdfDocument = React.createElement(
      ResumePDF,
      { data: RESUME_DATA }
    ) as unknown as React.ReactElement<DocumentProps>;
    const buffer = await renderToBuffer(pdfDocument);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="TungLe-Resume.pdf"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('[resume] PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
