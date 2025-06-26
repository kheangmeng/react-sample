export interface Login {
  email: string
  password: string
}
export interface LoginResponse {
  token: string
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  statusMessage: string | null;
}
