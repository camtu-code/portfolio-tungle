'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styles from './Admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>Admin CMS</div>
        <nav className={styles.nav}>
          <Link 
            href="/admin" 
            className={`${styles.navItem} ${pathname === '/admin' ? styles.navItemActive : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/projects" 
            className={`${styles.navItem} ${pathname.includes('/admin/projects') ? styles.navItemActive : ''}`}
          >
            Projects
          </Link>
          <Link 
            href="/admin/blog" 
            className={`${styles.navItem} ${pathname.includes('/admin/blog') ? styles.navItemActive : ''}`}
          >
            Blog Posts
          </Link>
          <Link 
            href="/admin/avatar" 
            className={`${styles.navItem} ${pathname.includes('/admin/avatar') ? styles.navItemActive : ''}`}
          >
            🖼️ Hero Avatar
          </Link>
          <Link 
            href="/admin/analytics" 
            className={`${styles.navItem} ${pathname.includes('/admin/analytics') ? styles.navItemActive : ''}`}
          >
            📊 Analytics
          </Link>
          <Link 
            href="/admin/messages" 
            className={`${styles.navItem} ${pathname.includes('/admin/messages') ? styles.navItemActive : ''}`}
          >
            ✉️ Messages
          </Link>
          <Link 
            href="/admin/testimonials" 
            className={`${styles.navItem} ${pathname.includes('/admin/testimonials') ? styles.navItemActive : ''}`}
          >
            💬 Testimonials
          </Link>
        </nav>
        <button 
          className={styles.logoutButton}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Logout
        </button>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
