// import React from 'react';
// import FeaturedPost from '../components/FeaturedPost';
// import PostCard from '../components/PostCard';
// import { recentPosts } from '../data/posts';
// import NewsletterSignup from '../components/NewsletterSignup';

// export default function Home() {
//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//       <FeaturedPost />
      
//       <section className="mt-16">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
//           <a href="/articles" className="text-blue-600 hover:text-blue-700">
//             View all
//           </a>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {recentPosts.map((post, index) => (
//             <PostCard key={index} {...post} />
//           ))}
//         </div>
//       </section>
      
//       <NewsletterSignup />
//     </main>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import FeaturedPost from '../components/FeaturedPost';
// import PostCard from '../components/PostCard';
// import NewsletterSignup from '../components/NewsletterSignup';
// import { articleService, Article } from '../services/articleService';
// import toast from 'react-hot-toast';

// export default function Home() {
//   const [recentArticles, setRecentArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchRecentArticles();
//   }, []);

//   const fetchRecentArticles = async () => {
//     try {
//       const articles = await articleService.getPublishedArticles();
//       // Get the 3 most recent articles
//       setRecentArticles(articles.slice(0, 3));
//     } catch (error) {
//       toast.error('Failed to load recent articles');
//       console.error('Error fetching recent articles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//       <FeaturedPost />
      
//       <section className="mt-16">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
//           <a href="/articles" className="text-blue-600 hover:text-blue-700">
//             View all
//           </a>
//         </div>
        
//         {loading ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {recentArticles.map((article) => (
//               <PostCard
//                 key={article.id}
//                 title={article.title}
//                 excerpt={article.excerpt}
//                 category={article.category}
//                 imageUrl={article.featured_image || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
//                 readTime={article.read_time}
//               />
//             ))}
//           </div>
//         )}
//       </section>
      
//       <NewsletterSignup />
//     </main>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedPost from '../components/FeaturedPost';
import PostCard from '../components/PostCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { articleService, Article } from '../services/articleService';
import toast from 'react-hot-toast';

export default function Home() {
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  const fetchRecentArticles = async () => {
    try {
      const articles = await articleService.getPublishedArticles();
      // Get the 3 most recent articles
      setRecentArticles(articles.slice(0, 3));
    } catch (error) {
      toast.error('Failed to load recent articles');
      console.error('Error fetching recent articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <FeaturedPost />
      
      <section className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
          <Link to="/articles" className="text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
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
      </section>
      
      <NewsletterSignup />
    </main>
  );
}