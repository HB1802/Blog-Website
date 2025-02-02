import { articleApi } from './api';

export interface ArticleSubmission {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image?: File | null;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image?: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  created_at: string;
  read_time: string;
  author: {
    id: number;
    username: string;
  };
}

export const articleService = {
  getArticles: async (): Promise<Article[]> => {
    const response = await articleApi.getArticles();
    return response.data;
  },

  getArticle: async (slug: string): Promise<Article> => {
    const response = await articleApi.getArticle(slug);
    return response.data;
  },

  submitArticle: async (data: ArticleSubmission): Promise<Article> => {
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('excerpt', data.excerpt);
      formData.append('category', data.category);
      
      // Add file if it exists
      if (data.featured_image instanceof File) {
        formData.append('featured_image', data.featured_image);
      }

      const response = await articleApi.submitArticle(formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting article:', error);
      throw error;
    }
  }
};
