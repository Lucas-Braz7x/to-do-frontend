'use client';

import { cn } from '@/src/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../atoms/Button';

interface PopConfirmProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  children: React.ReactNode;
  variant?: 'danger' | 'warning' | 'default';
}

export function PopConfirm({
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  children,
  variant = 'danger',
}: PopConfirmProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const variantStyles = {
    danger: {
      icon: 'text-red-500',
      iconBg: 'bg-red-100',
      confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      icon: 'text-amber-500',
      iconBg: 'bg-amber-100',
      confirmButton: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    default: {
      icon: 'text-indigo-500',
      iconBg: 'bg-indigo-100',
      confirmButton: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>

      {isOpen && (
        <>
          {/* Backdrop para mobile */}
          <div className="fixed inset-0 z-40 sm:hidden" />

          <div
            ref={popoverRef}
            className={cn(
              'absolute z-50 right-0 top-full mt-2',
              'w-72 p-4 rounded-xl',
              'bg-white border border-slate-200',
              'shadow-lg shadow-slate-200/50',
              'animate-in fade-in-0 zoom-in-95 duration-200'
            )}
          >
            <div className="flex gap-3">
              <div
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                  styles.iconBg
                )}
              >
                <svg
                  className={cn('w-5 h-5', styles.icon)}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-900">
                  {title}
                </h4>
                {description && (
                  <p className="mt-1 text-sm text-slate-600">{description}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                {cancelText}
              </Button>
              <button
                onClick={handleConfirm}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg',
                  'transition-colors duration-200',
                  styles.confirmButton
                )}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
