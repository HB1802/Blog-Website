import React from 'react';
import FeaturedPost from '../components/FeaturedPost';
import PostCard from '../components/PostCard';
import { recentPosts } from '../data/posts';
import NewsletterSignup from '../components/NewsletterSignup';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <FeaturedPost />
      
      <section className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
          <a href="/articles" className="text-blue-600 hover:text-blue-700">
            View all
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </section>
      
      <NewsletterSignup />
    </main>
  );
}