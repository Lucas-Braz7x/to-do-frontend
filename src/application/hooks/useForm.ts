'use client';

import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import type { ZodError, ZodSchema } from 'zod';

interface UseFormOptions<T> {
  initialValues: T;
  schema?: ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldError: (field: keyof T, error: string) => void;
  reset: () => void;
  validate: () => boolean;
}

function parseZodErrors<T>(error: ZodError): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const issue of error.issues) {
    const path = issue.path[0] as keyof T;
    if (path && !errors[path]) {
      errors[path] = issue.message;
    }
  }

  return errors;
}

export function useForm<T extends object>({
  initialValues,
  schema,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    if (!schema) return true;

    const result = schema.safeParse(values);
    if (!result.success) {
      const newErrors = parseZodErrors<T>(result.error);
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  }, [schema, values]);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
      const newValue =
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      setValues((prev) => ({ ...prev, [name]: newValue }));

      // Limpa o erro do campo ao alterar
      setErrors((prev) => {
        if (prev[name as keyof T]) {
          const { [name as keyof T]: _removed, ...rest } = prev;
          void _removed;
          return rest as Partial<Record<keyof T, string>>;
        }
        return prev;
      });
    },
    []
  );

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (prev[field]) {
          const { [field]: _removed, ...rest } = prev;
          void _removed;
          return rest as Partial<Record<keyof T, string>>;
        }
        return prev;
      });
    },
    []
  );

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validate()) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValuesRef.current);
    setErrors({});
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
    validate,
  };
}
