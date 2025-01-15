import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const articleApi = {
  getArticles: () => api.get('/articles/'),
  getArticle: (id: string) => api.get(`/articles/${id}/`),
  submitArticle: (data: FormData) => api.post('/articles/', data),
  reviewArticle: (id: string, status: 'published' | 'rejected') =>
    api.post(`/articles/${id}/review/`, { status }),
};

export default api;

