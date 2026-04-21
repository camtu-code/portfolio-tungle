import { prisma } from '@/lib/prisma';
import styles from '../Admin.module.css';
import { deleteContactMessage } from '@/app/actions';

export default async function MessagesAdminPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Messages</h1>
        <span style={{ color: '#0066cc', fontWeight: 600, fontSize: '0.9rem' }}>
          {messages.length} messages
        </span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td>
                  <strong>{m.name}</strong>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    <a href={`mailto:${m.email}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
                      {m.email}
                    </a>
                  </div>
                </td>
                <td style={{ maxWidth: '400px' }}>
                  <p style={{ fontSize: '0.9rem', color: '#444', margin: 0, whiteSpace: 'pre-wrap' }}>
                    {m.message}
                  </p>
                </td>
                <td style={{ fontSize: '0.85rem', color: '#666' }}>
                  {new Date(m.createdAt).toLocaleString()}
                </td>
                <td>
                  <form action={async () => {
                    'use server';
                    await deleteContactMessage(m.id);
                  }}>
                    <button type="submit" className={styles.deleteButton}>Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: '#999' }}>
                  No messages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
