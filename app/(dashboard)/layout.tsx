'use client';

import { useAuth } from '@/src/application/contexts/AuthContext';
import { Spinner } from '@/src/components/atoms/Spinner';
import { DashboardLayout } from '@/src/components/templates/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
