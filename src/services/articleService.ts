

import api from './api';

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image: string;
  status: string;
  created_at: string;
  author: {
    username: string;
    email: string;
  };
}

export const articleService = {
  getArticles: async (): Promise<Article[]> => {
    const response = await api.get('/articles/');
    return response.data;
  },

  getArticle: async (id: number): Promise<Article> => {
    const response = await api.get(`/articles/${id}/`);
    return response.data;
  },

  submitArticle: async (formData: FormData): Promise<Article> => {
    console.log('Token stored:', authStorage.getToken());
    const response = await api.post('/articles/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${localStorage.getItem('token')}`, // Token-based auth
      },
      withCredentials: true, // Ensure cookies are sent for session auth
    });
    return response.data;
  }
};