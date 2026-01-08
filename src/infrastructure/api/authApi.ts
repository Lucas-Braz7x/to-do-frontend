import type { IAuthRepository } from '@/src/domain/repositories/IAuthRepository';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '@/src/domain/entities/User';
import { httpClient } from './httpClient';
import { tokenStorage } from '../storage/tokenStorage';

export const authApi: IAuthRepository = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      '/auth/login',
      credentials
    );
    tokenStorage.setToken(response.accessToken);
    return response;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    tokenStorage.setToken(response.accessToken);
    return response;
  },

  async logout(): Promise<void> {
    tokenStorage.removeToken();
  },

  async getCurrentUser(): Promise<User> {
    return httpClient.get<User>('/auth/me');
  },
};
