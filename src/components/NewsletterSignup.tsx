import React from 'react';

export default function NewsletterSignup() {
  return (
    <section className="mt-16 bg-blue-600 rounded-2xl p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white">Stay in the loop</h2>
        <p className="mt-4 text-blue-100">
          Get the latest articles and insights delivered straight to your inbox.
        </p>
        <form className="mt-6 flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}