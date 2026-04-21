'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const role = formData.get('role') as string;
  const techStack = formData.get('techStack') as string;
  const demoUrl = formData.get('demoUrl') as string;
  const githubUrl = formData.get('githubUrl') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const status = formData.get('status') as string || 'PUBLISHED';

  await prisma.project.create({
    data: {
      title,
      description,
      role: role || null,
      techStack,
      demoUrl: demoUrl || null,
      githubUrl: githubUrl || null,
      imageUrl: imageUrl || null,
      status,
    },
  });

  revalidatePath('/admin/projects');
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const role = formData.get('role') as string;
  const techStack = formData.get('techStack') as string;
  const demoUrl = formData.get('demoUrl') as string;
  const githubUrl = formData.get('githubUrl') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const status = formData.get('status') as string;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      role: role || null,
      techStack,
      demoUrl: demoUrl || null,
      githubUrl: githubUrl || null,
      imageUrl: imageUrl || null,
      status,
    },
  });

  revalidatePath('/admin/projects');
  revalidatePath('/');
  redirect('/admin/projects');
}


export async function deleteProject(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath('/admin/projects');
  revalidatePath('/');
}
