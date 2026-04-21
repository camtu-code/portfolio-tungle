import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminClientLayout from './AdminClientLayout';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <AdminClientLayout>{children}</AdminClientLayout>;
}
