import { LoginForm } from '@/src/components/organisms/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Tarefas',
  description: 'Faça login para acessar suas tarefas',
};

export default function LoginPage() {
  return <LoginForm />;
}
