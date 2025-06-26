import type { LoginResponse, AuthUser } from '../types'

const MOCK_USER_RTK: AuthUser = { id: 'userRTK123', email: 'test-rtk@example.com', name: 'Test User RTK' };
const MOCK_TOKEN_RTK = 'mock-jwt-token-rtk-67890';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const handleLogin = async (credentials: { email: string; password: string }): Promise<{ user: AuthUser; token: string }> => {
  await delay(1000);
  if (credentials.email === 'react.sample@gmail.com' && credentials.password === 'secret') {
    localStorage.setItem('authTokenRTK', MOCK_TOKEN_RTK);
    return { user: MOCK_USER_RTK, token: MOCK_TOKEN_RTK };
  }
  throw new Error('Invalid credentials. Try again.');
};

export function mapResponse(data: unknown): LoginResponse {
  return {
    token: data?.token,
  }
}
