// import React from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import { Clock, User, Calendar } from 'lucide-react';
// import { allPosts } from '../data/posts';

// export default function ArticleDetail() {
//   const { slug } = useParams<{ slug: string }>();
  
//   const article = allPosts.find(post => 
//     post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
//   );

//   if (!article) {
//     return <Navigate to="/articles" replace />;
//   }

//   return (
//     <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//       <article>
//         <header className="mb-8">
//           <div className="mb-6">
//             <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-600 rounded-full">
//               {article.category}
//             </span>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
//           <div className="flex items-center gap-6 text-gray-600">
//             <div className="flex items-center">
//               <User size={18} className="mr-2" />
//               <span>John Doe</span>
//             </div>
//             <div className="flex items-center">
//               <Calendar size={18} className="mr-2" />
//               <span>March 15, 2024</span>
//             </div>
//             <div className="flex items-center">
//               <Clock size={18} className="mr-2" />
//               <span>{article.readTime}</span>
//             </div>
//           </div>
//         </header>

//         <img
//           src={article.imageUrl}
//           alt={article.title}
//           className="w-full h-[400px] object-cover rounded-xl mb-8"
//         />

//         <div className="prose prose-lg max-w-none">
//           <p>{article.excerpt}</p>
//           {/* Add more article content here */}
//         </div>
//       </article>
//     </main>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import { Clock, User, Calendar } from 'lucide-react';
// import { articleService, Article } from '../services/articleService';
// import toast from 'react-hot-toast';

// export default function ArticleDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const [article, setArticle] = useState<Article | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (slug) {
//       fetchArticle();
//     }
//   }, [slug]);

//   const fetchArticle = async () => {
//     try {
//       const data = await articleService.getArticle(slug);
//       if (data.status !== 'published') {
//         throw new Error('Article not found');
//       }
//       setArticle(data);
//     } catch (error) {
//       toast.error('Article not found');
//       console.error('Error fetching article:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </main>
//     );
//   }

//   if (!article) {
//     return <Navigate to="/articles" replace />;
//   }

//   return (
//     <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//       <article>
//         <header className="mb-8">
//           <div className="mb-6">
//             <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-600 rounded-full">
//               {article.category}
//             </span>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
//           <div className="flex items-center gap-6 text-gray-600">
//             <div className="flex items-center">
//               <User size={18} className="mr-2" />
//               <span>{article.author.username}</span>
//             </div>
//             <div className="flex items-center">
//               <Calendar size={18} className="mr-2" />
//               <span>{new Date(article.created_at).toLocaleDateString()}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock size={18} className="mr-2" />
//               <span>{article.read_time}</span>
//             </div>
//           </div>
//         </header>

//         <img
//           src={article.featured_image || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
//           alt={article.title}
//           className="w-full h-[400px] object-cover rounded-xl mb-8"
//         />

//         <div className="prose prose-lg max-w-none">
//           <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>
//           <div className="text-gray-800 whitespace-pre-wrap">{article.content}</div>
//         </div>
//       </article>
//     </main>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import { Clock, User, Calendar } from 'lucide-react';
// import { articleService, Article } from '../services/articleService';
// import CommentSection from '../components/CommentSection';
// import toast from 'react-hot-toast';

// interface Comment {
//   id: number;
//   user: {
//     username: string;
//   };
//   content: string;
//   rating: number;
//   created_at: string;
// }

// export default function ArticleDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const [article, setArticle] = useState<Article | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (slug) {
//       fetchArticle();
//       fetchComments();
//     }
//   }, [slug]);

//   const fetchArticle = async () => {
//     try {
//       if (!slug) return;
//       const data = await articleService.getArticle(slug);
//       if (data.status !== 'published') {
//         throw new Error('Article not found');
//       }
//       setArticle(data);
//     } catch (error) {
//       toast.error('Article not found');
//       console.error('Error fetching article:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       if (!slug) return;
//       const data = await articleService.getArticleComments(slug);
//       setComments(data);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     }
//   };

//   const handleCommentSubmit = async (content: string, rating: number) => {
//     try {
//       if (!article) return;
//       await articleService.submitComment(article.id, { content, rating });
//       await fetchComments(); // Refresh comments after submission
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//       throw error;
//     }
//   };

//   if (loading) {
//     return (
//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </main>
//     );
//   }

//   if (!article) {
//     return <Navigate to="/articles" replace />;
//   }

//   return (
//     <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//       <article>
//         <header className="mb-8">
//           <div className="mb-6">
//             <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-600 rounded-full">
//               {article.category}
//             </span>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
//           <div className="flex items-center gap-6 text-gray-600">
//             <div className="flex items-center">
//               <User size={18} className="mr-2" />
//               <span>{article.author.username}</span>
//             </div>
//             <div className="flex items-center">
//               <Calendar size={18} className="mr-2" />
//               <span>{new Date(article.created_at).toLocaleDateString()}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock size={18} className="mr-2" />
//               <span>{article.read_time}</span>
//             </div>
//           </div>
//         </header>

//         <img
//           src={article.featured_image || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
//           alt={article.title}
//           className="w-full h-[400px] object-cover rounded-xl mb-8"
//         />

//         <div className="prose prose-lg max-w-none">
//           <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>
//           <div className="text-gray-800 whitespace-pre-wrap">{article.content}</div>
//         </div>

//         <CommentSection
//           articleId={article.id}
//           comments={comments}
//           onCommentSubmit={handleCommentSubmit}
//         />
//       </article>
//     </main>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Clock, User, Calendar } from 'lucide-react';
import { articleService, Article } from '../services/articleService';
import CommentSection from '../components/CommentSection';
import toast from 'react-hot-toast';

interface Comment {
  id: number;
  user: {
    username: string;
  };
  content: string;
  rating: number;
  created_at: string;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  useEffect(() => {
    if (article?.id) {
      fetchComments();
    }
  }, [article?.id]);

  const fetchArticle = async () => {
    try {
      if (!slug) return;
      const data = await articleService.getArticle(slug);
      if (data.status !== 'published') {
        throw new Error('Article not found');
      }
      setArticle(data);
    } catch (error) {
      toast.error('Article not found');
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      if (!article?.id) return;
      const data = await articleService.getArticleComments(article.id);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    }
  };

  const handleCommentSubmit = async (content: string, rating: number) => {
    try {
      if (!article?.id) return;
      
      await articleService.submitComment(article.id, { content, rating });
      console.log(article?.id);
      await fetchComments(); // Refresh comments after submission
      toast.success('Comment posted successfully');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to post comment');
      throw error;
    }
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <article>
        <header className="mb-8">
          <div className="mb-6">
            <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-600 rounded-full">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>{article.author.username}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{article.read_time}</span>
            </div>
          </div>
        </header>

        <img
          src={article.featured_image || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>
          <div className="text-gray-800 whitespace-pre-wrap">{article.content}</div>
        </div>

        <CommentSection
          articleId={article.id}
          comments={comments}
          onCommentSubmit={handleCommentSubmit}
        />
      </article>
    </main>
  );
}