import { useState, useCallback } from 'react';
import { User, AuthState } from '../types';

// In a real app, this would be handled by a backend service
const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setAuth({
        user: userWithoutPassword,
        isAuthenticated: true
      });
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name
    };

    mockUsers.push({ ...newUser, password });
    setAuth({
      user: newUser,
      isAuthenticated: true
    });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setAuth({
      user: null,
      isAuthenticated: false
    });
  }, []);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    login,
    register,
    logout
  };
}