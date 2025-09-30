import { useState } from 'react';
import { authService } from '../services/authService';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type AuthError = {
    message: string;
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.login(email, password);
      setUser(user);
    } catch (err: unknown) {
      const error = err as AuthError;
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
