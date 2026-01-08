'use client';

import { type Task, type TaskStatus } from '@/src/domain/entities/Task';
import { cn } from '@/src/lib/utils';
import { Button } from '../atoms/Button';
import { PopConfirm } from './PopConfirm';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onChangeStatus: (task: Task, status: TaskStatus) => void;
}

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  PENDING: {
    label: 'Pendente',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-800',
  },
  IN_PROGRESS: {
    label: 'Em andamento',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
  },
  COMPLETED: {
    label: 'Concluída',
    bgClass: 'bg-green-100',
    textClass: 'text-green-800',
  },
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onChangeStatus,
}: TaskCardProps) {
  const isCompleted = task.status === 'COMPLETED';
  const statusConfig = STATUS_CONFIG[task.status];

  const handleCycleStatus = () => {
    const statusOrder: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onChangeStatus(task, statusOrder[nextIndex]);
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200 p-5 shadow-sm',
        'transition-all duration-200 hover:shadow-md',
        'animate-fade-in'
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={handleCycleStatus}
          className={cn(
            'mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0',
            'transition-colors duration-200',
            task.status === 'COMPLETED' && 'bg-green-500 border-green-500',
            task.status === 'IN_PROGRESS' && 'bg-blue-500 border-blue-500',
            task.status === 'PENDING' &&
              'border-slate-300 hover:border-indigo-500'
          )}
          aria-label="Alterar status da tarefa"
        >
          {task.status === 'COMPLETED' && (
            <svg
              className="w-full h-full text-white p-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {task.status === 'IN_PROGRESS' && (
            <svg
              className="w-full h-full text-white p-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 8v4l2 2"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'text-lg font-semibold text-slate-900 truncate',
              isCompleted && 'line-through text-slate-400'
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={cn(
                'mt-1 text-sm text-slate-600 line-clamp-2',
                isCompleted && 'text-slate-400'
              )}
            >
              {task.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                statusConfig.bgClass,
                statusConfig.textClass
              )}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            aria-label="Editar tarefa"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <PopConfirm
            title="Excluir tarefa?"
            description="Esta ação não pode ser desfeita."
            confirmText="Excluir"
            cancelText="Cancelar"
            variant="danger"
            onConfirm={() => onDelete(task.id)}
          >
            <Button
              variant="ghost"
              size="sm"
              aria-label="Excluir tarefa"
              className="text-red-600 hover:bg-red-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
          </PopConfirm>
        </div>
      </div>
    </div>
  );
}
