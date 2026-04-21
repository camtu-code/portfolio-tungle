import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '../Admin.module.css';
import { deleteProject } from '@/app/actions/project';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Projects</h1>
        <Link href="/admin/projects/new" className={styles.addButton}>
          + Add New Project
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    backgroundColor: project.status === 'PUBLISHED' ? '#d4edda' : '#fff3cd',
                    color: project.status === 'PUBLISHED' ? '#155724' : '#856404'
                  }}>
                    {project.status}
                  </span>
                </td>
                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                <td className={styles.actions}>
                  <Link href={`/admin/projects/${project.id}`} className={styles.editButton}>
                    Edit
                  </Link>
                  <form action={async () => {
                    'use server';
                    await deleteProject(project.id);
                  }}>
                    <button type="submit" className={styles.deleteButton}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: '#666' }}>
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
