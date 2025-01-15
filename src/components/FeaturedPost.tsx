import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MessageCircle } from 'lucide-react';

export default function FeaturedPost() {
  return (
    <Link 
      to="/articles/future-web-development"
      className="block relative h-[600px] rounded-2xl overflow-hidden group"
    >
      <img
        src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt="Featured post"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="absolute bottom-0 p-8 space-y-4">
          <div className="flex space-x-2">
            <span className="px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
              Technology
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white group-hover:text-blue-100 transition-colors">
            The Future of Web Development: What's Next?
          </h2>
          <div className="flex items-center space-x-4 text-gray-200">
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center">
              <MessageCircle size={16} className="mr-2" />
              <span>12 comments</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}