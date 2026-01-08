import type { Task, CreateTaskData, UpdateTaskData } from '../entities/Task';

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task>;
  create(data: CreateTaskData): Promise<Task>;
  update(id: string, data: UpdateTaskData): Promise<Task>;
  delete(id: string): Promise<Task>;
  restore(id: string): Promise<Task>;
}
