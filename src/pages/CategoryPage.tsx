// import React from 'react';
// import { useParams } from 'react-router-dom';
// import PostCard from '../components/PostCard';
// import { allPosts } from '../data/posts';
// import { CATEGORIES } from '../routes';

// export default function CategoryPage() {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const category = CATEGORIES.find(cat => cat.id === categoryId);
  
//   const filteredPosts = allPosts.filter(
//     post => post.category.toLowerCase() === category?.name.toLowerCase()
//   );

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">
//         {category?.name} Articles
//       </h1>

//       {filteredPosts.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-600">No articles found in this category.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPosts.map((post, index) => (
//             <PostCard key={index} {...post} />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { articleService, Article } from '../services/articleService';
import { CATEGORIES } from '../routes';
import toast from 'react-hot-toast';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = CATEGORIES.find(cat => cat.id === categoryId);

  useEffect(() => {
    fetchArticles();
  }, [categoryId]);

  const fetchArticles = async () => {
    try {
      const allArticles = await articleService.getPublishedArticles();
      const filteredArticles = allArticles.filter(
        article => article.category.toLowerCase() === category?.name.toLowerCase()
      );
      setArticles(filteredArticles);
    } catch (error) {
      toast.error('Failed to load articles');
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {category?.name} Articles
      </h1>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <PostCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              imageUrl={article.featured_image || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
              readTime={article.read_time}
              slug={article.slug}
            />
          ))}
        </div>
      )}
    </main>
  );
}