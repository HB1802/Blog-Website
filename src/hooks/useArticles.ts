
import { useState } from 'react';
import { articleService } from '../services/articleService'; // Corrected import
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useArticles() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitArticle = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      await articleService.submitArticle(formData); // Proper function call
      toast.success('Article submitted for review');
      navigate('/articles');
    } catch (error) {
      toast.error('Failed to submit article');
      console.error('Submit article error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    submitArticle,
    loading,
  };
}