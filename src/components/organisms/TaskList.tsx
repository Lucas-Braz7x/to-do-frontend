'use client';

import { type Task, type TaskStatus } from '@/src/domain/entities/Task';
import { TaskCard } from '../molecules/TaskCard';
import { Spinner } from '../atoms/Spinner';
import { Alert } from '../molecules/Alert';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onChangeStatus: (task: Task, status: TaskStatus) => void;
}

export function TaskList({
  tasks,
  isLoading,
  error,
  onEdit,
  onDelete,
  onChangeStatus,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="error" title="Erro ao carregar tarefas">
        {error}
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">
          Nenhuma tarefa ainda
        </h3>
        <p className="text-slate-600">
          Crie sua primeira tarefa clicando no botão acima
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
}
