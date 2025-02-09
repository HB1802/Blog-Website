// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Clock } from 'lucide-react';

// interface PostCardProps {
//   title: string;
//   excerpt: string;
//   category: string;
//   imageUrl: string;
//   readTime: string;
// }

// export default function PostCard({ title, excerpt, category, imageUrl, readTime }: PostCardProps) {
//   const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
//   return (
//     <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
//       <Link to={`/articles/${slug}`}>
//         <div className="relative h-48 overflow-hidden">
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//           />
//         </div>
//         <div className="p-6">
//           <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
//             {category}
//           </span>
//           <h3 className="mt-4 text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
//             {title}
//           </h3>
//           <p className="mt-2 text-gray-600 line-clamp-2">
//             {excerpt}
//           </p>
//           <div className="mt-4 flex items-center text-gray-500 text-sm">
//             <Clock size={16} className="mr-2" />
//             <span>{readTime}</span>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Clock } from 'lucide-react';

// interface PostCardProps {
//   title: string;
//   excerpt: string;
//   category: string;
//   imageUrl: string;
//   readTime: string;
//   slug?: string;
// }

// export default function PostCard({ title, excerpt, category, imageUrl, readTime, slug }: PostCardProps) {
//   // If no slug is provided, generate one from the title
//   const articleSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
//   return (
//     <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
//       <Link to={`/articles/${articleSlug}`}>
//         <div className="relative h-48 overflow-hidden">
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//           />
//         </div>
//         <div className="p-6">
//           <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
//             {category}
//           </span>
//           <h3 className="mt-4 text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
//             {title}
//           </h3>
//           <p className="mt-2 text-gray-600 line-clamp-2">
//             {excerpt}
//           </p>
//           <div className="mt-4 flex items-center text-gray-500 text-sm">
//             <Clock size={16} className="mr-2" />
//             <span>{readTime}</span>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface PostCardProps {
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  readTime: string;
  slug?: string;
}

export default function PostCard({ title, excerpt, category, imageUrl, readTime, slug }: PostCardProps) {
  // If no slug is provided, generate one from the title
  const articleSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/articles/${articleSlug}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-6">
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
            {category}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-2">
            {excerpt}
          </p>
          <div className="mt-4 flex items-center text-gray-500 text-sm">
            <Clock size={16} className="mr-2" />
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}