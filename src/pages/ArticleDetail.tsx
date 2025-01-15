import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Clock, User, Calendar } from 'lucide-react';
import { allPosts } from '../data/posts';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const article = allPosts.find(post => 
    post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  );

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
              <span>John Doe</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <span>March 15, 2024</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />

        <div className="prose prose-lg max-w-none">
          <p>{article.excerpt}</p>
          {/* Add more article content here */}
        </div>
      </article>
    </main>
  );
}