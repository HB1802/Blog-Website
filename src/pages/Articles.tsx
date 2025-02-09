// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import PostCard from '../components/PostCard';
// import { allPosts } from '../data/posts';
// import { CATEGORIES } from '../routes';

// export default function Articles() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = !selectedCategory || post.category.toLowerCase() === selectedCategory.toLowerCase();
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <h1 className="text-3xl font-bold text-gray-900">All Articles</h1>
        
//         <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search articles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
//             />
//           </div>
          
//           <select
//             value={selectedCategory || ''}
//             onChange={(e) => setSelectedCategory(e.target.value || null)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">All Categories</option>
//             {CATEGORIES.map(category => (
//               <option key={category.id} value={category.name}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {filteredPosts.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-600">No articles found matching your criteria.</p>
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

// import React, { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';
// import PostCard from '../components/PostCard';
// import { CATEGORIES } from '../routes';
// import { articleService, Article } from '../services/articleService';
// import toast from 'react-hot-toast';

// export default function Articles() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     try {
//       const data = await articleService.getPublishedArticles();
//       setArticles(data);
//     } catch (error) {
//       toast.error('Failed to load articles');
//       console.error('Error fetching articles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredArticles = articles.filter(article => {
//     const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = !selectedCategory || article.category.toLowerCase() === selectedCategory.toLowerCase();
//     return matchesSearch && matchesCategory;
//   });

//   if (loading) {
//     return (
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <h1 className="text-3xl font-bold text-gray-900">All Articles</h1>
        
//         <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search articles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
//             />
//           </div>
          
//           <select
//             value={selectedCategory || ''}
//             onChange={(e) => setSelectedCategory(e.target.value || null)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">All Categories</option>
//             {CATEGORIES.map(category => (
//               <option key={category.id} value={category.name}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {filteredArticles.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-600">No articles found matching your criteria.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredArticles.map((article) => (
//             <PostCard
//               key={article.id}
//               title={article.title}
//               excerpt={article.excerpt}
//               category={article.category}
//               imageUrl={article.featured_image || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
//               readTime={article.read_time}
//             />
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import PostCard from '../components/PostCard';
import { CATEGORIES } from '../routes';
import { articleService, Article } from '../services/articleService';
import toast from 'react-hot-toast';

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await articleService.getPublishedArticles();
      setArticles(data);
    } catch (error) {
      toast.error('Failed to load articles');
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">All Articles</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
          </div>
          
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
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