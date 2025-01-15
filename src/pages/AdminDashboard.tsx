import React, { useEffect, useState } from 'react';
import { articleApi } from '../services/api';
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Article {
  id: string;
  title: string;
  author: {
    username: string;
  };
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await articleApi.getArticles();
      setArticles(response.data);
    } catch (error) {
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id: string, status: 'published' | 'rejected') => {
    try {
      await articleApi.reviewArticle(id, status);
      toast.success(`Article ${status}`);
      loadArticles();
    } catch (error) {
      toast.error('Failed to review article');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {articles.map((article) => (
            <li key={article.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      By {article.author.username} • {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {article.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReview(article.id, 'published')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <Check size={16} className="mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReview(article.id, 'rejected')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        <X size={16} className="mr-1" />
                        Reject
                      </button>
                    </div>
                  )}
                  {article.status !== 'pending' && (
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {article.status}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}