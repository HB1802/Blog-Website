import React from 'react';

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Mindscape</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">
          Welcome to Mindscape, your premier destination for insightful articles on technology, 
          design, and development. Our platform brings together thought leaders and experts 
          to share their knowledge and experiences.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          We strive to provide high-quality, actionable content that helps professionals 
          stay ahead in the rapidly evolving tech landscape. Our articles are carefully 
          curated to ensure they deliver real value to our readers.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-6">
          Become part of our growing community of tech enthusiasts, developers, and designers. 
          Share your insights, engage in discussions, and connect with like-minded professionals.
        </p>
      </div>
    </main>
  );
}