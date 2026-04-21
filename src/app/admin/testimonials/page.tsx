import { prisma } from '@/lib/prisma';
import styles from '../Admin.module.css';
import { approveTestimonial, rejectTestimonial, deleteTestimonial } from '@/app/actions/testimonial';

const statusStyle = (status: string) => ({
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 600,
  backgroundColor:
    status === 'APPROVED' ? '#d4edda' :
    status === 'REJECTED' ? '#f8d7da' : '#fff3cd',
  color:
    status === 'APPROVED' ? '#155724' :
    status === 'REJECTED' ? '#721c24' : '#856404',
});

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default async function TestimonialsAdminPage() {
  const pending = await prisma.testimonial.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'desc' },
  });
  const others = await prisma.testimonial.findMany({
    where: { status: { not: 'PENDING' } },
    orderBy: { createdAt: 'desc' },
  });
  const all = [...pending, ...others];

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Testimonials</h1>
        <span style={{ color: '#dc3545', fontWeight: 600, fontSize: '0.9rem' }}>
          {pending.length} pending review
        </span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Author</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {all.map((t) => (
              <tr key={t.id}>
                <td>
                  <strong>{t.name}</strong>
                  {t.role && <div style={{ fontSize: '0.8rem', color: '#666' }}>{t.role}</div>}
                  {t.company && <div style={{ fontSize: '0.8rem', color: '#999' }}>{t.company}</div>}
                </td>
                <td style={{ maxWidth: '280px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#444', fontStyle: 'italic' }}>
                    &ldquo;{t.message.slice(0, 100)}{t.message.length > 100 ? '…' : ''}&rdquo;
                  </span>
                </td>
                <td style={{ color: '#C19A6B', letterSpacing: '1px' }}>{stars(t.rating)}</td>
                <td><span style={statusStyle(t.status)}>{t.status}</span></td>
                <td style={{ fontSize: '0.85rem', color: '#666' }}>
                  {new Date(t.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <div className={styles.actions}>
                    {t.status !== 'APPROVED' && (
                      <form action={async () => {
                        'use server';
                        await approveTestimonial(t.id);
                      }}>
                        <button
                          type="submit"
                          style={{ color: '#155724', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                        >
                          ✅ Approve
                        </button>
                      </form>
                    )}
                    {t.status !== 'REJECTED' && (
                      <form action={async () => {
                        'use server';
                        await rejectTestimonial(t.id);
                      }}>
                        <button
                          type="submit"
                          style={{ color: '#856404', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                        >
                          ⛔ Reject
                        </button>
                      </form>
                    )}
                    <form action={async () => {
                      'use server';
                      await deleteTestimonial(t.id);
                    }}>
                      <button type="submit" className={styles.deleteButton}>Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {all.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#999' }}>
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
