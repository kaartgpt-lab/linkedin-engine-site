import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { authApi, mockData } from '@/services/api';
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
    // Check for existing session
    const checkAuth = async () => {
      try {
        const { user } = await authApi.getUser();
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        // For development, check localStorage for mock auth
        const mockAuth = localStorage.getItem('mockAuth');
        if (mockAuth) {
          setState({ user: mockData.user, isAuthenticated: true, isLoading: false });
        } else {
          setState({ user: null, isAuthenticated: false, isLoading: false });
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await authApi.login({ email, password });
      setState({ user, isAuthenticated: true, isLoading: false });
      toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
      return true;
    } catch {
      // Mock login for development
      if (email && password) {
        localStorage.setItem('mockAuth', 'true');
        setState({ user: { ...mockData.user, email }, isAuthenticated: true, isLoading: false });
        toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
        return true;
      }
      toast({ title: 'Login failed', description: 'Invalid credentials', variant: 'destructive' });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await authApi.register({ name, email, password });
      setState({ user, isAuthenticated: true, isLoading: false });
      toast({ title: 'Welcome!', description: 'Your account has been created.' });
      return true;
    } catch {
      // Mock register for development
      if (name && email && password) {
        localStorage.setItem('mockAuth', 'true');
        setState({ 
          user: { ...mockData.user, name, email }, 
          isAuthenticated: true, 
          isLoading: false 
        });
        toast({ title: 'Welcome!', description: 'Your account has been created.' });
        return true;
      }
      toast({ title: 'Registration failed', description: 'Please try again', variant: 'destructive' });
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
