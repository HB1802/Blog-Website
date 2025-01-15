import { useState, useEffect } from 'react';
import { authApi } from '../services/auth/api';
import { authStorage } from '../services/auth/storage';
import { LoginCredentials, RegisterData, User } from '../services/auth/types';
import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = authStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
      setUser(response.user);
      return true;
    } catch (error) {
      toast.error('Invalid username or password');
      return false;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      authStorage.setToken(response.token);
      authStorage.setUser(response.user);
      setUser(response.user);
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    authStorage.clear();
    setUser(null);
    toast.success('Logged out successfully');
  };

  return { user, loading, login, register, logout };
}