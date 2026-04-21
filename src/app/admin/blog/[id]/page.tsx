import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import styles from '../../Admin.module.css';
import { updateBlogPost } from '@/app/actions/blog';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!post) {
    redirect('/admin/blog');
  }

  const updatePostWithId = updateBlogPost.bind(null, post.id);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Blog Post: {post.title}</h1>
        <Link href="/admin/blog" style={{ color: '#0066cc', textDecoration: 'none' }}>
          &larr; Back to Blog Posts
        </Link>
      </div>

      <form action={updatePostWithId} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Title *</label>
          <input type="text" id="title" name="title" defaultValue={post.title} className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="slug">Slug (URL) *</label>
          <input type="text" id="slug" name="slug" defaultValue={post.slug} className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" defaultValue={post.excerpt || ''} className={styles.input} style={{ minHeight: '80px' }}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="content">Content (Markdown supported) *</label>
          <textarea id="content" name="content" defaultValue={post.content} className={styles.textarea} style={{ minHeight: '300px' }} required></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="imageUrl">Cover Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl" defaultValue={post.imageUrl || ''} className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={post.status} className={styles.select}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Save Changes</button>
      </form>
    </div>
  );
}
