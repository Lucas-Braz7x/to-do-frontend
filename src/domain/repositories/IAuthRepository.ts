import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '../entities/User';

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterData): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
}
