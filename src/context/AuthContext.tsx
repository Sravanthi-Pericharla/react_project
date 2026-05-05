import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'allocator@traineepro.com': {
    password: 'alloc123',
    user: { id: '1', name: 'Allocator-1', email: 'allocator@traineepro.com', phone: '+91 9876543210', role: 'allocator', department: 'Training Operations', status: 'active' }
  },
  'educator@traineepro.com': {
    password: 'edu123',
    user: { id: '2', name: 'Srinivasan R.', email: 'educator@traineepro.com', phone: '+91 9876543210', role: 'educator', department: 'Software Engineering', status: 'active' }
  },
  'admin@traineepro.com': {
    password: 'admin123',
    user: { id: '3', name: 'Admin', email: 'admin@traineepro.com', phone: '+91 9876543210', role: 'admin', department: 'Administration', status: 'active' }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const entry = MOCK_USERS[email.toLowerCase()];
    if (!entry || entry.password !== password) {
      throw new Error('Invalid email or password');
    }
    const mockToken = `jwt-token-${Date.now()}`;
    setUser(entry.user);
    setToken(mockToken);
    localStorage.setItem('user', JSON.stringify(entry.user));
    localStorage.setItem('token', mockToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
