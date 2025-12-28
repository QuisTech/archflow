import { useAuth } from '../contexts/auth.context';

export function useAuthGuard() {
  const { user, isLoading } = useAuth();
  
  return {
    isAuthenticated: !!user,
    isLoading,
    user
  };
}
