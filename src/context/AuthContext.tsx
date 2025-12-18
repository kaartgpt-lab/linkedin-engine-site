import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState } from '@/types';
import { authApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const { user } = await authApi.getUser();
        setState({ user, isAuthenticated: true, isLoading: false });
        console.log('✅ Authenticated with backend:', user.email);
      } catch (error) {
        console.log('❌ Not authenticated or backend unavailable');
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await authApi.login({ email, password });
      setState({ user, isAuthenticated: true, isLoading: false });
      localStorage.removeItem('mockAuth'); // Clear mock auth if using real backend
      toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({ 
        title: 'Login failed', 
        description: error instanceof Error ? error.message : 'Invalid credentials', 
        variant: 'destructive' 
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await authApi.register({ name, email, password });
      setState({ user, isAuthenticated: true, isLoading: false });
      localStorage.removeItem('mockAuth'); // Clear mock auth if using real backend
      toast({ title: 'Welcome!', description: 'Your account has been created.' });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({ 
        title: 'Registration failed', 
        description: error instanceof Error ? error.message : 'Please try again', 
        variant: 'destructive' 
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Continue with logout even if API fails
    }
    localStorage.removeItem('mockAuth');
    setState({ user: null, isAuthenticated: false, isLoading: false });
    toast({ title: 'Logged out', description: 'See you next time!' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
