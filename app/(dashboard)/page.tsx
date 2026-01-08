'use client';

import { useTasks } from '@/src/application/hooks/useTasks';
import { Button } from '@/src/components/atoms/Button';
import { Alert } from '@/src/components/molecules/Alert';
import { TaskForm } from '@/src/components/organisms/TaskForm';
import { TaskList } from '@/src/components/organisms/TaskList';
import type {
  CreateTaskData,
  Task,
  TaskStatus,
} from '@/src/domain/entities/Task';
import { useCallback, useState } from 'react';

export default function DashboardPage() {
  const {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleOpenCreate = useCallback(() => {
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTask(null);
  }, []);

  const handleSubmit = useCallback(
    async (data: CreateTaskData) => {
      setActionError(null);
      try {
        if (editingTask) {
          await updateTask(editingTask.id, data);
        } else {
          await createTask(data);
        }
        handleCloseForm();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao salvar tarefa';
        setActionError(message);
      }
    },
    [editingTask, updateTask, createTask, handleCloseForm]
  );

  const handleDelete = useCallback(
    async (taskId: string) => {
      setActionError(null);

      try {
        await deleteTask(taskId);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao excluir tarefa';
        setActionError(message);
      }
    },
    [deleteTask]
  );

  const handleChangeStatus = useCallback(
    async (task: Task, status: TaskStatus) => {
      setActionError(null);
      try {
        await changeTaskStatus(task, status);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao atualizar status';
        setActionError(message);
      }
    },
    [changeTaskStatus]
  );

  const completedCount = tasks.filter((t) => t.status === 'COMPLETED').length;
  const inProgressCount = tasks.filter(
    (t) => t.status === 'IN_PROGRESS'
  ).length;
  const pendingCount = tasks.filter((t) => t.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Minhas Tarefas</h1>
          <p className="text-slate-600 mt-1">
            {pendingCount} pendente{pendingCount !== 1 ? 's' : ''} ·{' '}
            {inProgressCount} em andamento · {completedCount} concluída
            {completedCount !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={handleOpenCreate} size="lg">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nova Tarefa
        </Button>
      </div>

      {/* Action Error */}
      {actionError && (
        <Alert variant="error" onClose={() => setActionError(null)}>
          {actionError}
        </Alert>
      )}

      {/* Task List */}
      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
      />

      {/* Task Form Modal */}
      <TaskForm
        task={editingTask}
        onSubmit={handleSubmit}
        onCancel={handleCloseForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}
