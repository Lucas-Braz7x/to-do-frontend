'use client';

import { Component, type ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log do erro para serviços de monitoramento (Sentry, etc.)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center',
        'bg-gradient-to-br from-slate-50 to-slate-100'
      )}
    >
      <div
        className={cn(
          'max-w-md w-full mx-4 p-8 rounded-2xl',
          'bg-white shadow-xl shadow-slate-200/50',
          'text-center'
        )}
      >
        {/* Ícone de erro */}
        <div
          className={cn(
            'w-16 h-16 mx-auto mb-6 rounded-full',
            'bg-red-100 flex items-center justify-center'
          )}
        >
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          Algo deu errado
        </h1>

        <p className="text-slate-600 mb-6">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>

        {/* Detalhes do erro (apenas em desenvolvimento) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div
            className={cn(
              'mb-6 p-4 rounded-lg text-left',
              'bg-slate-50 border border-slate-200',
              'overflow-auto max-h-32'
            )}
          >
            <p className="text-xs font-mono text-red-600 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={onReset}
            className={cn(
              'px-5 py-2.5 rounded-lg font-medium',
              'bg-indigo-600 text-white',
              'hover:bg-indigo-700 active:bg-indigo-800',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            )}
          >
            Tentar novamente
          </button>

          <button
            onClick={() => window.location.reload()}
            className={cn(
              'px-5 py-2.5 rounded-lg font-medium',
              'bg-slate-100 text-slate-700',
              'hover:bg-slate-200 active:bg-slate-300',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
            )}
          >
            Recarregar página
          </button>
        </div>
      </div>
    </div>
  );
}
