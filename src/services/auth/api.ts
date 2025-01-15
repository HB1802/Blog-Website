import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login/`, credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/register/`, data);
    return response.data;
  }
};