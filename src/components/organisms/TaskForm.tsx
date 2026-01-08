'use client';

import { useEffect } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { useForm } from '@/src/application/hooks/useForm';
import type { Task, CreateTaskData } from '@/src/domain/entities/Task';
import { taskSchema, type TaskFormData } from '@/src/lib/validations';
import { cn } from '@/src/lib/utils';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: CreateTaskData) => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, isOpen }: TaskFormProps) {
  const isEditing = !!task;

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
    reset,
  } = useForm<TaskFormData>({
    initialValues: {
      title: '',
      description: '',
    },
    schema: taskSchema,
    onSubmit: async (formValues) => {
      await onSubmit({
        title: formValues.title,
        description: formValues.description || undefined,
      });
      reset();
    },
  });

  useEffect(() => {
    if (task) {
      setFieldValue('title', task.title);
      setFieldValue('description', task.description || '');
    } else {
      reset();
    }
  }, [task, setFieldValue, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6',
          'animate-slide-up'
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {isEditing ? 'Editar tarefa' : 'Nova tarefa'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Fechar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label="Título"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="O que precisa ser feito?"
            required
          />

          <div className="space-y-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Adicione mais detalhes (opcional)"
              rows={4}
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border border-slate-300',
                'bg-white text-slate-900 placeholder:text-slate-400',
                'transition-colors duration-200 resize-none',
                'focus:outline-none focus:ring-2 focus:ring-offset-0',
                'focus:border-indigo-500 focus:ring-indigo-500/20'
              )}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={isSubmitting} className="flex-1">
              {isEditing ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
