import { tokenStorage } from '../storage/tokenStorage';
import { getLoadingCallbacks } from '@/src/application/contexts/LoadingContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  /** Se true, não mostra o loading global */
  silent?: boolean;
}

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = tokenStorage.getToken();
  const loadingCallbacks = getLoadingCallbacks();
  const showLoading = !options.silent && loadingCallbacks;

  if (showLoading) {
    loadingCallbacks.start();
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || `HTTP Error: ${response.status}`;

      if (response.status === 401) {
        tokenStorage.removeToken();
        // Não redireciona se já estiver em páginas de autenticação
        // para permitir que o erro de credenciais inválidas seja exibido
        if (typeof window !== 'undefined') {
          const isAuthPage = window.location.pathname === '/login' || 
                             window.location.pathname === '/register';
          if (!isAuthPage) {
          window.location.href = '/login';
          }
        }
      }

      throw new HttpError(response.status, message);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  } finally {
    if (showLoading) {
      loadingCallbacks.stop();
    }
  }
}

export const httpClient = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>('GET', endpoint, options);
  },

  post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>('POST', endpoint, { ...options, body });
  },

  put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>('PUT', endpoint, { ...options, body });
  },

  patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>('PATCH', endpoint, { ...options, body });
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>('DELETE', endpoint, options);
  },
};
