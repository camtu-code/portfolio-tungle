import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import styles from '../../Admin.module.css';
import { updateProject } from '@/app/actions/project';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!project) {
    redirect('/admin/projects');
  }

  // Pre-bind the ID to the server action
  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Project: {project.title}</h1>
        <Link href="/admin/projects" style={{ color: '#0066cc', textDecoration: 'none' }}>
          &larr; Back to Projects
        </Link>
      </div>

      <form action={updateProjectWithId} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Title *</label>
          <input type="text" id="title" name="title" defaultValue={project.title} className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">Description *</label>
          <textarea id="description" name="description" defaultValue={project.description} className={styles.textarea} required></textarea>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="role">Role</label>
          <input type="text" id="role" name="role" defaultValue={project.role || ''} className={styles.input} placeholder="e.g. Fullstack Developer" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="techStack">Tech Stack *</label>
          <input type="text" id="techStack" name="techStack" defaultValue={project.techStack} className={styles.input} placeholder="React, Next.js, Tailwind" required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="imageUrl">Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl" defaultValue={project.imageUrl || ''} className={styles.input} placeholder="/projects/my-project.png" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="demoUrl">Demo URL</label>
          <input type="url" id="demoUrl" name="demoUrl" defaultValue={project.demoUrl || ''} className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="githubUrl">GitHub URL</label>
          <input type="url" id="githubUrl" name="githubUrl" defaultValue={project.githubUrl || ''} className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={project.status} className={styles.select}>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Save Changes</button>
      </form>
    </div>
  );
}
