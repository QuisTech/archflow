"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://archflow-api.onrender.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('archflow_token');
    const storedUser = localStorage.getItem('archflow_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      
      fetchUserData(storedToken).catch(() => {
        localStorage.removeItem('archflow_token');
        localStorage.removeItem('archflow_user');
        setToken(null);
        setUser(null);
      });
    }
    
    setIsLoading(false);
  }, []);

  const fetchUserData = async (authToken: string) => {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (!response.ok) throw new Error('Invalid token');
    
    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('archflow_user', JSON.stringify(data.user));
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();
    
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('archflow_token', data.token);
    localStorage.setItem('archflow_user', JSON.stringify(data.user));
  };

  const register = async (email: string, password: string, name?: string) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    
    if (!response.ok) throw new Error('Registration failed');
    
    const data = await response.json();
    
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('archflow_token', data.token);
    localStorage.setItem('archflow_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('archflow_token');
    localStorage.removeItem('archflow_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('archflow_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, updateUser }}>
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