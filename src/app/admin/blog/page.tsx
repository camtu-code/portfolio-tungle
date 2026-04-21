import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '../Admin.module.css';
import { deleteBlogPost } from '@/app/actions/blog';

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Blog Posts</h1>
        <Link href="/admin/blog/new" className={styles.addButton}>
          + Write New Post
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
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    backgroundColor: post.status === 'PUBLISHED' ? '#d4edda' : '#fff3cd',
                    color: post.status === 'PUBLISHED' ? '#155724' : '#856404'
                  }}>
                    {post.status}
                  </span>
                </td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className={styles.actions}>
                  <Link href={`/admin/blog/${post.id}`} className={styles.editButton}>
                    Edit
                  </Link>
                  <form action={async () => {
                    'use server';
                    await deleteBlogPost(post.id);
                  }}>
                    <button type="submit" className={styles.deleteButton}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: '#666' }}>
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
