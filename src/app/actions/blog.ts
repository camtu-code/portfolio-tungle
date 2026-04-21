'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function createBlogPost(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const status = formData.get('status') as string || 'DRAFT';

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      imageUrl: imageUrl || null,
      status,
    },
  });

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function updateBlogPost(id: string, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const status = formData.get('status') as string;

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      imageUrl: imageUrl || null,
      status,
    },
  });

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}


export async function deleteBlogPost(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}
