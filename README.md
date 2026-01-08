# Desafio Frontend - Aplicação de Gerenciamento de Tarefas

Aplicação web para gerenciamento de tarefas com autenticação JWT, construída com Next.js 16, React 19 e Tailwind CSS.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Arquitetura](#arquitetura)
- [Componentes](#componentes)
- [Hooks e Contextos](#hooks-e-contextos)
- [Validações](#validações)
- [Testes](#testes)
- [Deploy](#deploy)

---

## Visão Geral

Esta aplicação permite que usuários:

- Se registrem e autentiquem usando email e senha
- Gerenciem suas tarefas pessoais (criar, listar, editar, deletar)
- Alterem o status das tarefas (Pendente, Em Andamento, Concluída)
- Visualizem apenas suas próprias tarefas (isolamento por usuário)

Principais características:

- ✅ Autenticação JWT com persistência em localStorage
- ✅ Arquitetura limpa (Clean Architecture) com separação de camadas
- ✅ Componentes organizados com Atomic Design (Atoms, Molecules, Organisms, Templates)
- ✅ Validação de formulários com Zod
- ✅ UI moderna e responsiva com Tailwind CSS
- ✅ Loading global integrado com requisições HTTP
- ✅ Testes unitários com Jest e React Testing Library
- ✅ Pronto para deploy no Render

---

## Tecnologias

| Tecnologia                | Versão  | Descrição                                    |
| ------------------------- | ------- | -------------------------------------------- |
| **Next.js**               | ^16.1.1 | Framework React para aplicações web          |
| **React**                 | ^19.2.3 | Biblioteca para interfaces de usuário        |
| **TypeScript**            | ^5      | Superset tipado de JavaScript                |
| **Tailwind CSS**          | ^4      | Framework CSS utility-first                  |
| **Zod**                   | ^4.3.5  | Validação de schemas TypeScript-first        |
| **Jest**                  | ^30.2.0 | Framework de testes                          |
| **React Testing Library** | ^16.3.1 | Utilitários para testes de componentes React |
| **clsx / tailwind-merge** | -       | Utilitários para classes CSS condicionais    |

---

## Estrutura do Projeto

```
├── app/                           # App Router do Next.js
│   ├── (auth)/                    # Grupo de rotas de autenticação
│   │   ├── layout.tsx             # Layout das páginas de auth
│   │   ├── login/page.tsx         # Página de login
│   │   └── register/page.tsx      # Página de registro
│   ├── (dashboard)/               # Grupo de rotas do dashboard
│   │   ├── layout.tsx             # Layout do dashboard
│   │   └── page.tsx               # Página principal (lista de tarefas)
│   ├── layout.tsx                 # Layout raiz
│   └── globals.css                # Estilos globais
├── src/
│   ├── application/               # Camada de aplicação
│   │   ├── contexts/              # Contextos React
│   │   │   ├── AuthContext.tsx    # Contexto de autenticação
│   │   │   └── LoadingContext.tsx # Contexto de loading global
│   │   ├── hooks/                 # Hooks customizados
│   │   │   ├── useForm.ts         # Hook para gerenciamento de formulários
│   │   │   └── useTasks.ts        # Hook para gerenciamento de tarefas
│   │   └── providers/             # Providers da aplicação
│   │       └── Providers.tsx      # Composição de providers
│   ├── components/                # Componentes UI (Atomic Design)
│   │   ├── atoms/                 # Componentes básicos
│   │   │   ├── Button.tsx         # Botão com variantes
│   │   │   ├── Input.tsx          # Campo de entrada
│   │   │   ├── Label.tsx          # Rótulo de campo
│   │   │   └── Spinner.tsx        # Indicador de loading
│   │   ├── molecules/             # Composições de atoms
│   │   │   ├── Alert.tsx          # Componente de alerta
│   │   │   ├── FormField.tsx      # Campo de formulário completo
│   │   │   ├── PopConfirm.tsx     # Diálogo de confirmação
│   │   │   └── TaskCard.tsx       # Card de tarefa
│   │   ├── organisms/             # Componentes complexos
│   │   │   ├── ErrorBoundary.tsx  # Boundary para erros
│   │   │   ├── LoadingOverlay.tsx # Overlay de loading global
│   │   │   ├── LoginForm.tsx      # Formulário de login
│   │   │   ├── RegisterForm.tsx   # Formulário de registro
│   │   │   ├── TaskForm.tsx       # Formulário de tarefa (modal)
│   │   │   └── TaskList.tsx       # Lista de tarefas
│   │   └── templates/             # Layouts de página
│   │       ├── AuthLayout.tsx     # Layout para páginas de auth
│   │       └── DashboardLayout.tsx # Layout para dashboard
│   ├── domain/                    # Camada de domínio
│   │   ├── entities/              # Entidades do domínio
│   │   │   ├── Task.ts            # Entidade Tarefa
│   │   │   └── User.ts            # Entidade Usuário
│   │   └── repositories/          # Interfaces de repositórios
│   │       ├── IAuthRepository.ts # Interface de autenticação
│   │       └── ITaskRepository.ts # Interface de tarefas
│   ├── infrastructure/            # Camada de infraestrutura
│   │   ├── api/                   # Clientes de API
│   │   │   ├── authApi.ts         # API de autenticação
│   │   │   ├── httpClient.ts      # Cliente HTTP genérico
│   │   │   └── taskApi.ts         # API de tarefas
│   │   └── storage/               # Armazenamento local
│   │       └── tokenStorage.ts    # Gerenciamento de token JWT
│   └── lib/                       # Utilitários
│       ├── utils.ts               # Funções utilitárias (cn)
│       └── validations.ts         # Schemas de validação Zod
├── __tests__/                     # Testes unitários
│   └── components/atoms/          # Testes dos atoms
├── middleware.ts                  # Middleware do Next.js
├── docker-compose.yml             # Configuração Docker
├── Dockerfile                     # Dockerfile para produção
└── Dockerfile.dev                 # Dockerfile para desenvolvimento
```

---

## Instalação

### Pré-requisitos

- Node.js (v20+)
- Yarn ou npm
- Backend da API rodando (padrão: http://localhost:3001)

### Passo a passo

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd frontend
```

2. **Instale as dependências**

```bash
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
# Crie o arquivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

4. **Inicie a aplicação**

```bash
# Desenvolvimento
yarn dev

# Produção
yarn build
yarn start
```

A aplicação estará disponível em `http://localhost:3000`

---

## Variáveis de Ambiente

| Variável              | Descrição               | Exemplo                       |
| --------------------- | ----------------------- | ----------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API Backend | `http://localhost:3001`       |
| `NODE_ENV`            | Ambiente de execução    | `development` \| `production` |

---

## Arquitetura

O projeto segue os princípios de **Clean Architecture**, separando responsabilidades em camadas distintas:

### Camada de Domínio (`src/domain/`)

Contém as entidades e interfaces que definem o núcleo do negócio:

#### Entidade `Task`

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
}
```

#### Entidade `User`

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### Camada de Infraestrutura (`src/infrastructure/`)

Implementações concretas para comunicação externa:

#### HTTP Client

Cliente HTTP genérico com:

- Injeção automática de token JWT
- Tratamento de erros HTTP
- Integração com loading global
- Redirecionamento para login em caso de 401

#### Token Storage

Gerenciamento do token JWT no localStorage:

- `getToken()` - Obtém o token
- `setToken(token)` - Salva o token
- `removeToken()` - Remove o token
- `hasToken()` - Verifica se existe token

### Camada de Aplicação (`src/application/`)

Orquestra a lógica de aplicação:

#### AuthContext

Gerencia o estado de autenticação:

- `user` - Usuário autenticado
- `isLoading` - Estado de carregamento
- `isAuthenticated` - Se está autenticado
- `login(credentials)` - Realiza login
- `register(data)` - Realiza registro
- `logout()` - Realiza logout

#### LoadingContext

Gerencia o loading global da aplicação:

- `isLoading` - Se está carregando
- `startLoading()` - Inicia loading
- `stopLoading()` - Para loading

---

## Componentes

O projeto utiliza **Atomic Design** para organização de componentes:

### Atoms (Componentes Básicos)

| Componente | Descrição                     | Props Principais               |
| ---------- | ----------------------------- | ------------------------------ |
| `Button`   | Botão com variantes e loading | `variant`, `size`, `isLoading` |
| `Input`    | Campo de entrada estilizado   | `type`, `error`, `placeholder` |
| `Label`    | Rótulo para campos            | `htmlFor`, `required`          |
| `Spinner`  | Indicador de carregamento     | `size`                         |

#### Variantes do Button

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
```

### Molecules (Composições)

| Componente   | Descrição                | Props Principais                |
| ------------ | ------------------------ | ------------------------------- |
| `Alert`      | Mensagem de alerta/erro  | `variant`, `title`, `onClose`   |
| `FormField`  | Label + Input + Erro     | `label`, `error`, `required`    |
| `PopConfirm` | Diálogo de confirmação   | `title`, `onConfirm`, `variant` |
| `TaskCard`   | Card de tarefa com ações | `task`, `onEdit`, `onDelete`    |

### Organisms (Componentes Complexos)

| Componente       | Descrição                    | Props Principais              |
| ---------------- | ---------------------------- | ----------------------------- |
| `LoginForm`      | Formulário completo de login | -                             |
| `RegisterForm`   | Formulário de registro       | -                             |
| `TaskForm`       | Modal de criar/editar tarefa | `task`, `onSubmit`, `isOpen`  |
| `TaskList`       | Lista de tarefas             | `tasks`, `isLoading`, `error` |
| `LoadingOverlay` | Overlay de loading global    | -                             |
| `ErrorBoundary`  | Captura erros React          | `children`                    |

### Templates (Layouts)

| Componente        | Descrição                   |
| ----------------- | --------------------------- |
| `AuthLayout`      | Layout para páginas de auth |
| `DashboardLayout` | Layout para o dashboard     |

---

## Hooks e Contextos

### useForm

Hook genérico para gerenciamento de formulários com validação Zod:

```typescript
const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  schema: loginSchema,
  onSubmit: async (values) => {
    /* ... */
  },
});
```

**Retorno:**

- `values` - Valores atuais do formulário
- `errors` - Erros de validação por campo
- `isSubmitting` - Se está submetendo
- `handleChange` - Handler para onChange dos inputs
- `handleSubmit` - Handler para onSubmit do form
- `setFieldValue(field, value)` - Define valor de um campo
- `setFieldError(field, error)` - Define erro de um campo
- `reset()` - Reseta o formulário
- `validate()` - Valida manualmente

### useTasks

Hook para gerenciamento de tarefas:

```typescript
const { tasks, isLoading, error, createTask, updateTask, deleteTask } =
  useTasks();
```

**Retorno:**

- `tasks` - Lista de tarefas
- `isLoading` - Se está carregando
- `error` - Mensagem de erro
- `fetchTasks()` - Recarrega tarefas
- `createTask(data)` - Cria tarefa
- `updateTask(id, data)` - Atualiza tarefa
- `deleteTask(id)` - Deleta tarefa
- `restoreTask(id)` - Restaura tarefa
- `changeTaskStatus(task, status)` - Altera status

### useAuth

Hook para autenticação (via AuthContext):

```typescript
const { user, isAuthenticated, login, register, logout } = useAuth();
```

---

## Validações

O projeto utiliza **Zod** para validação de formulários:

### Schema de Login

```typescript
const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
```

### Schema de Registro

```typescript
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
    passwordConfirmation: z
      .string()
      .min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });
```

### Schema de Tarefa

```typescript
const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
});
```

---

## Testes

O projeto inclui testes unitários com Jest e React Testing Library.

### Executar testes

```bash
yarn test
```

### Executar testes com watch

```bash
yarn test:watch
```

### Executar testes com cobertura

```bash
yarn test:coverage
```

### Estrutura de Testes

```
__tests__/
├── components/
│   └── atoms/
│       ├── Button.test.tsx
│       ├── Input.test.tsx
│       ├── Label.test.tsx
│       └── Spinner.test.tsx
└── example.test.ts
```

### Configuração

O Jest está configurado para:

- Ambiente `jsdom` para simular o DOM
- Path alias `@/*` mapeado para a raiz
- Setup com `@testing-library/jest-dom`

---

## Deploy

### Docker

O projeto inclui configuração Docker para desenvolvimento e produção:

**Desenvolvimento:**

```bash
docker-compose --profile dev up frontend-dev
```

**Produção:**

```bash
docker-compose up frontend
```

### Render

O projeto está configurado para deploy no Render via CI/CD:

1. Push para a branch `main` dispara o pipeline
2. O GitHub Actions executa:
   - Instalação de dependências
   - Lint
   - Build
   - Testes
3. Se tudo passar, dispara deploy no Render

**Variáveis de ambiente necessárias no Render:**

- `NEXT_PUBLIC_API_URL` - URL da API Backend

### Build Multi-stage

O Dockerfile utiliza multi-stage build para otimização:

1. **Stage deps** - Instalação de dependências
2. **Stage builder** - Build da aplicação
3. **Stage runner** - Imagem final otimizada (~100MB)

---

## Scripts Disponíveis

| Script               | Descrição                                   |
| -------------------- | ------------------------------------------- |
| `yarn dev`           | Inicia em modo desenvolvimento (hot-reload) |
| `yarn build`         | Compila o projeto para produção             |
| `yarn start`         | Inicia em modo produção                     |
| `yarn lint`          | Verifica linting com ESLint                 |
| `yarn format`        | Formata o código com Prettier               |
| `yarn test`          | Executa testes unitários                    |
| `yarn test:watch`    | Executa testes em modo watch                |
| `yarn test:coverage` | Executa testes com relatório de cobertura   |

---

## Rotas da Aplicação

| Rota        | Autenticação | Descrição                      |
| ----------- | ------------ | ------------------------------ |
| `/login`    | ❌ Pública   | Página de login                |
| `/register` | ❌ Pública   | Página de registro             |
| `/`         | ✅ Protegida | Dashboard com lista de tarefas |

---

## Fluxo de Autenticação

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Login/    │────>│  authApi    │────>│   Backend   │
│  Register   │     │  .login()   │     │  /auth/*    │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ tokenStorage│
                    │ .setToken() │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ AuthContext │
                    │ setUser()   │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Dashboard  │
                    │   (rota /)  │
                    └─────────────┘
```

---

## Status de Tarefas

| Status        | Cor     | Descrição    |
| ------------- | ------- | ------------ |
| `PENDING`     | Amarelo | Pendente     |
| `IN_PROGRESS` | Azul    | Em andamento |
| `COMPLETED`   | Verde   | Concluída    |

O usuário pode alternar entre os status clicando no ícone circular à esquerda do card da tarefa. O ciclo é: Pendente → Em Andamento → Concluída → Pendente.

---

## Licença

Este projeto não possui licença pública (UNLICENSED).
