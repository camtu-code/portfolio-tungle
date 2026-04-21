import Link from 'next/link';
import styles from '../../Admin.module.css';
import { createBlogPost } from '@/app/actions/blog';

export default function NewBlogPostPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Write New Blog Post</h1>
        <Link href="/admin/blog" style={{ color: '#0066cc', textDecoration: 'none' }}>
          &larr; Back to Blog Posts
        </Link>
      </div>

      <form action={createBlogPost} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Title *</label>
          <input type="text" id="title" name="title" className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="slug">Slug (URL) *</label>
          <input type="text" id="slug" name="slug" className={styles.input} placeholder="my-first-post" required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" className={styles.input} style={{ minHeight: '80px' }}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="content">Content (Markdown supported) *</label>
          <textarea id="content" name="content" className={styles.textarea} style={{ minHeight: '300px' }} required></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="imageUrl">Cover Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="status">Status</label>
          <select id="status" name="status" className={styles.select}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Publish Post</button>
      </form>
    </div>
  );
}
