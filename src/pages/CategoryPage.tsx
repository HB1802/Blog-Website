import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { allPosts } from '../data/posts';
import { CATEGORIES } from '../routes';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  
  const filteredPosts = allPosts.filter(
    post => post.category.toLowerCase() === category?.name.toLowerCase()
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {category?.name} Articles
      </h1>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      )}
    </main>
  );
}