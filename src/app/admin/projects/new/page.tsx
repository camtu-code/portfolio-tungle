import Link from 'next/link';
import styles from '../../Admin.module.css';
import { createProject } from '@/app/actions/project';

export default function NewProjectPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New Project</h1>
        <Link href="/admin/projects" style={{ color: '#0066cc', textDecoration: 'none' }}>
          &larr; Back to Projects
        </Link>
      </div>

      <form action={createProject} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Title *</label>
          <input type="text" id="title" name="title" className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">Description *</label>
          <textarea id="description" name="description" className={styles.textarea} required></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="role">Role</label>
          <input type="text" id="role" name="role" className={styles.input} placeholder="e.g. Fullstack Developer" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="techStack">Tech Stack *</label>
          <input type="text" id="techStack" name="techStack" className={styles.input} placeholder="React, Next.js, Tailwind" required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="imageUrl">Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl" className={styles.input} placeholder="/projects/my-project.png" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="demoUrl">Demo URL</label>
          <input type="url" id="demoUrl" name="demoUrl" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="githubUrl">GitHub URL</label>
          <input type="url" id="githubUrl" name="githubUrl" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="status">Status</label>
          <select id="status" name="status" className={styles.select}>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Create Project</button>
      </form>
    </div>
  );
}
