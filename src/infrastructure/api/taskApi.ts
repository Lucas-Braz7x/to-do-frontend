import type { ITaskRepository } from '@/src/domain/repositories/ITaskRepository';
import type {
  Task,
  CreateTaskData,
  UpdateTaskData,
} from '@/src/domain/entities/Task';
import { httpClient } from './httpClient';

export const taskApi: ITaskRepository = {
  async getAll(): Promise<Task[]> {
    return httpClient.get<Task[]>('/tasks');
  },

  async getById(id: string): Promise<Task> {
    return httpClient.get<Task>(`/tasks/${id}`);
  },

  async create(data: CreateTaskData): Promise<Task> {
    return httpClient.post<Task>('/tasks', data);
  },

  async update(id: string, data: UpdateTaskData): Promise<Task> {
    return httpClient.patch<Task>(`/tasks/${id}`, data);
  },

  async delete(id: string): Promise<Task> {
    return httpClient.delete<Task>(`/tasks/${id}`);
  },

  async restore(id: string): Promise<Task> {
    return httpClient.patch<Task>(`/tasks/${id}/restore`);
  },
};
