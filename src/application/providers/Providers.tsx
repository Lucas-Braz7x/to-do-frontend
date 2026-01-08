'use client';

import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import {
  LoadingProvider,
  useLoading,
  setLoadingCallbacks,
} from '../contexts/LoadingContext';
import { ErrorBoundary, LoadingOverlay } from '@/src/components/organisms';

interface ProvidersProps {
  children: React.ReactNode;
}

function LoadingInitializer({ children }: { children: React.ReactNode }) {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    setLoadingCallbacks({
      start: startLoading,
      stop: stopLoading,
    });
  }, [startLoading, stopLoading]);

  return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <LoadingInitializer>
          <AuthProvider>{children}</AuthProvider>
          <LoadingOverlay />
        </LoadingInitializer>
      </LoadingProvider>
    </ErrorBoundary>
  );
}
