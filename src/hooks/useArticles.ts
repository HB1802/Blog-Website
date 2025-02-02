import { useState } from 'react';
import { articleService, Article, ArticleSubmission } from '../services/articleService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authStorage } from '../services/auth/storage';

export function useArticles() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitArticle = async (data: ArticleSubmission) => {
    setLoading(true);
    try {
      // Check authentication first
      const token = authStorage.getToken();
      if (!token) {
        toast.error('Please login to submit an article');
        navigate('/login');
        return;
      }

      await articleService.submitArticle(data);
      toast.success('Article submitted for review');
      navigate('/articles');
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.error ||
                         error.message ||
                         'Failed to submit article';
      toast.error(errorMessage);
      console.error('Submit article error:', error);
      
      // Handle authentication errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    submitArticle,
    loading
  };
}
