'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Alert } from '../molecules/Alert';
import { useAuth } from '@/src/application/contexts/AuthContext';
import { useForm } from '@/src/application/hooks/useForm';
import { loginSchema, type LoginFormData } from '@/src/lib/validations';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<LoginFormData>({
      initialValues: {
        email: '',
        password: '',
      },
      schema: loginSchema,
      onSubmit: async (formValues) => {
        setError(null);
        try {
          await login(formValues);
          router.push('/');
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Erro ao fazer login';
          setError(message);
        }
      },
    });

  return (
    <div className="w-full max-w-md animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Bem-vindo de volta
        </h1>
        <p className="text-slate-600 mt-2">
          Entre com suas credenciais para acessar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <FormField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="seu@email.com"
          required
          autoComplete="email"
        />

        <FormField
          label="Senha"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full"
          size="lg"
        >
          Entrar
        </Button>
      </form>

      <p className="text-center text-slate-600 mt-6">
        Não tem uma conta?{' '}
        <Link
          href="/register"
          className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
