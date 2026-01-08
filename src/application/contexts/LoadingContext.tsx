'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingCount, setLoadingCount] = useState(0);
  const countRef = useRef(0);

  const startLoading = useCallback(() => {
    countRef.current += 1;
    setLoadingCount(countRef.current);
  }, []);

  const stopLoading = useCallback(() => {
    countRef.current = Math.max(0, countRef.current - 1);
    setLoadingCount(countRef.current);
  }, []);

  const value: LoadingContextType = {
    isLoading: loadingCount > 0,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Singleton para acesso fora de componentes React
let loadingCallbacks: {
  start: () => void;
  stop: () => void;
} | null = null;

export function setLoadingCallbacks(callbacks: {
  start: () => void;
  stop: () => void;
}) {
  loadingCallbacks = callbacks;
}

export function getLoadingCallbacks() {
  return loadingCallbacks;
}
