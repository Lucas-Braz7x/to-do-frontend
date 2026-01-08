'use client';

import { useLoading } from '@/src/application/contexts/LoadingContext';
import { cn } from '@/src/lib/utils';
import { useEffect, useMemo, useSyncExternalStore } from 'react';

// Factory para criar store de animação
function createAnimationStore() {
  let visible = false;
  let shouldRender = false;
  let cachedSnapshot = { visible, shouldRender };
  const listeners = new Set<() => void>();

  const notify = () => listeners.forEach((l) => l());

  const updateSnapshot = () => {
    if (
      cachedSnapshot.visible !== visible ||
      cachedSnapshot.shouldRender !== shouldRender
    ) {
      cachedSnapshot = { visible, shouldRender };
    }
  };

  return {
    subscribe: (callback: () => void) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getSnapshot: () => cachedSnapshot,
    show: () => {
      shouldRender = true;
      updateSnapshot();
      notify();
      requestAnimationFrame(() => {
        visible = true;
        updateSnapshot();
        notify();
      });
    },
    hide: () => {
      visible = false;
      updateSnapshot();
      notify();
      setTimeout(() => {
        shouldRender = false;
        updateSnapshot();
        notify();
      }, 200);
    },
  };
}

export function LoadingOverlay() {
  const { isLoading } = useLoading();

  const store = useMemo(() => createAnimationStore(), []);

  const { visible, shouldRender } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );

  useEffect(() => {
    if (isLoading) {
      store.show();
    } else {
      store.hide();
    }
  }, [isLoading, store]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center',
        'bg-slate-900/20 backdrop-blur-sm',
        'transition-opacity duration-200',
        visible ? 'opacity-100' : 'opacity-0'
      )}
      aria-live="polite"
      aria-busy={isLoading}
    >
      <div
        className={cn(
          'flex flex-col items-center gap-4 p-6 rounded-2xl',
          'bg-white shadow-2xl shadow-slate-900/20',
          'transition-transform duration-200',
          visible ? 'scale-100' : 'scale-95'
        )}
      >
        {/* Spinner animado customizado */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-slate-100" />
          <div
            className={cn(
              'absolute inset-0 w-12 h-12 rounded-full',
              'border-4 border-transparent border-t-indigo-600',
              'animate-spin'
            )}
          />
          <div
            className={cn(
              'absolute inset-1 w-10 h-10 rounded-full',
              'border-4 border-transparent border-t-indigo-400',
              'animate-spin animation-delay-150'
            )}
            style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
          />
        </div>
        <span className="text-sm font-medium text-slate-600">
          Carregando...
        </span>
      </div>
    </div>
  );
}
