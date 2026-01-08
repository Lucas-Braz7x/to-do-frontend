'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Alert } from '../molecules/Alert';
import { useAuth } from '@/src/application/contexts/AuthContext';
import { useForm } from '@/src/application/hooks/useForm';
import { registerSchema, type RegisterFormData } from '@/src/lib/validations';

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<RegisterFormData>({
      initialValues: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      schema: registerSchema,
      onSubmit: async (formValues) => {
        setError(null);
        try {
          await register(formValues);
          router.push('/');
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Erro ao criar conta';
          setError(message);
        }
      },
    });

  return (
    <div className="w-full max-w-md animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Criar conta</h1>
        <p className="text-slate-600 mt-2">
          Preencha os dados abaixo para se cadastrar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <FormField
          label="Nome"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Seu nome"
          required
          autoComplete="name"
        />

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
          helperText="Mínimo 6 caracteres, 1 maiúscula e 1 número"
          required
          autoComplete="new-password"
        />

        <FormField
          label="Confirmar senha"
          type="password"
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          error={errors.passwordConfirmation}
          placeholder="••••••••"
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full"
          size="lg"
        >
          Criar conta
        </Button>
      </form>

      <p className="text-center text-slate-600 mt-6">
        Já tem uma conta?{' '}
        <Link
          href="/login"
          className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
