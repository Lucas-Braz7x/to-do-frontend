import { RegisterForm } from '@/src/components/organisms/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro | Tarefas',
  description: 'Crie sua conta para começar a organizar suas tarefas',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
