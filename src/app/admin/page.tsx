import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import styles from './Admin.module.css';

export default async function AdminDashboard() {
  const projectCount = await prisma.project.count();
  const blogCount = await prisma.blogPost.count();
  const totalViews = await prisma.pageView.count();
  const uniqueIPs = await prisma.pageView.groupBy({ by: ['ip'] });
  
  const messageCount = await prisma.contactMessage.count();
  const pendingTestimonialsCount = await prisma.testimonial.count({
    where: { status: 'PENDING' }
  });

  const cardStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    flex: 1,
    minWidth: '200px',
  };

  return (
    <div>
      <h1 className={styles.title} style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Total Projects</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0066cc' }}>{projectCount}</p>
          <Link href="/admin/projects" style={{ fontSize: '0.85rem', color: '#0066cc', textDecoration: 'none' }}>Manage →</Link>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Total Blog Posts</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#7c3aed' }}>{blogCount}</p>
          <Link href="/admin/blog" style={{ fontSize: '0.85rem', color: '#7c3aed', textDecoration: 'none' }}>Manage →</Link>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Total Page Views</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#059669' }}>{totalViews.toLocaleString()}</p>
          <Link href="/admin/analytics" style={{ fontSize: '0.85rem', color: '#059669', textDecoration: 'none' }}>View Analytics →</Link>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Unique Visitors</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#d97706' }}>{uniqueIPs.length.toLocaleString()}</p>
          <Link href="/admin/analytics" style={{ fontSize: '0.85rem', color: '#d97706', textDecoration: 'none' }}>View Analytics →</Link>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Contact Messages</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#e11d48' }}>{messageCount}</p>
          <Link href="/admin/messages" style={{ fontSize: '0.85rem', color: '#e11d48', textDecoration: 'none' }}>View Messages →</Link>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Pending Testimonials</h2>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#d97706' }}>{pendingTestimonialsCount}</p>
          <Link href="/admin/testimonials" style={{ fontSize: '0.85rem', color: '#d97706', textDecoration: 'none' }}>Review →</Link>
        </div>
      </div>
    </div>
  );
}
