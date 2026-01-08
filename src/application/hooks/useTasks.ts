'use client';

import { useState, useCallback, useEffect } from 'react';
import type {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskStatus,
} from '@/src/domain/entities/Task';
import { taskApi } from '@/src/infrastructure/api/taskApi';

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  restoreTask: (id: string) => Promise<Task>;
  changeTaskStatus: (task: Task, status: TaskStatus) => Promise<Task>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar tarefas';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(
    async (data: CreateTaskData): Promise<Task> => {
      const newTask = await taskApi.create(data);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    },
    []
  );

  const updateTask = useCallback(
    async (id: string, data: UpdateTaskData): Promise<Task> => {
      const updatedTask = await taskApi.update(id, data);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    },
    []
  );

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    await taskApi.delete(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const restoreTask = useCallback(async (id: string): Promise<Task> => {
    const restoredTask = await taskApi.restore(id);
    setTasks((prev) => [restoredTask, ...prev]);
    return restoredTask;
  }, []);

  const changeTaskStatus = useCallback(
    async (task: Task, status: TaskStatus): Promise<Task> => {
      return updateTask(task.id, { status });
    },
    [updateTask]
  );

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    restoreTask,
    changeTaskStatus,
  };
}
