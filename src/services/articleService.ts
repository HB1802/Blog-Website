// import { articleApi } from './api';

// export interface ArticleSubmission {
//   title: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: File | null;
// }

// export interface Article {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: string;
//   status: 'draft' | 'pending' | 'published' | 'rejected';
//   created_at: string;
//   read_time: string;
//   author: {
//     id: number;
//     username: string;
//   };
// }

// export const articleService = {
//   getArticles: async (): Promise<Article[]> => {
//     const response = await articleApi.getArticles();
//     return response.data;
//   },

//   getArticle: async (slug: string): Promise<Article> => {
//     const response = await articleApi.getArticle(slug);
//     return response.data;
//   },

//   submitArticle: async (data: ArticleSubmission): Promise<Article> => {
//     try {
//       const formData = new FormData();
      
//       // Add text fields
//       formData.append('title', data.title);
//       formData.append('content', data.content);
//       formData.append('excerpt', data.excerpt);
//       formData.append('category', data.category);
      
//       // Add file if it exists
//       if (data.featured_image instanceof File) {
//         formData.append('featured_image', data.featured_image);
//       }

//       const response = await articleApi.submitArticle(formData);
//       return response.data;
//     } catch (error) {
//       console.error('Error submitting article:', error);
//       throw error;
//     }
//   }
// };


// import { articleApi } from './api';

// export interface ArticleSubmission {
//   title: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: File | null;
// }

// export interface Article {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: string;
//   status: 'draft' | 'pending' | 'published' | 'rejected';
//   created_at: string;
//   read_time: string;
//   author: {
//     id: number;
//     username: string;
//   };
// }

// export const articleService = {
//   getPublishedArticles: async (): Promise<Article[]> => {
//     const response = await articleApi.getArticles();
//     return response.data.filter((article: Article) => article.status === 'published');
//   },

//   getArticle: async (slug: string): Promise<Article> => {
//     const response = await articleApi.getArticle(slug);
//     return response.data;
//   },

//   submitArticle: async (data: ArticleSubmission): Promise<Article> => {
//     try {
//       const formData = new FormData();
      
//       formData.append('title', data.title);
//       formData.append('content', data.content);
//       formData.append('excerpt', data.excerpt);
//       formData.append('category', data.category);
      
//       if (data.featured_image instanceof File) {
//         formData.append('featured_image', data.featured_image);
//       }

//       const response = await articleApi.submitArticle(formData);
//       return response.data;
//     } catch (error) {
//       console.error('Error submitting article:', error);
//       throw error;
//     }
//   }
// };


// import { articleApi } from './api';

// export interface ArticleSubmission {
//   title: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: File | null;
// }

// export interface Article {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: string;
//   status: 'draft' | 'pending' | 'published' | 'rejected';
//   created_at: string;
//   read_time: string;
//   author: {
//     id: number;
//     username: string;
//   };
// }

// export const articleService = {
//   getPublishedArticles: async (): Promise<Article[]> => {
//     const response = await articleApi.getArticles();
//     return response.data.filter((article: Article) => article.status === 'published');
//   },

//   getArticle: async (slug: string): Promise<Article> => {
//     try {
//       const response = await articleApi.getArticleBySlug(slug);
//       const articles = response.data.filter((article: Article) => 
//         article.slug === slug && article.status === 'published'
//       );
      
//       if (!articles || articles.length === 0) {
//         throw new Error('Article not found');
//       }
      
//       return articles[0];
//     } catch (error) {
//       console.error('Error fetching article:', error);
//       throw error;
//     }
//   },

//   submitArticle: async (data: ArticleSubmission): Promise<Article> => {
//     try {
//       const formData = new FormData();
      
//       formData.append('title', data.title);
//       formData.append('content', data.content);
//       formData.append('excerpt', data.excerpt);
//       formData.append('category', data.category);
      
//       if (data.featured_image instanceof File) {
//         formData.append('featured_image', data.featured_image);
//       }

//       const response = await articleApi.submitArticle(formData);
//       return response.data;
//     } catch (error) {
//       console.error('Error submitting article:', error);
//       throw error;
//     }
//   }
// };

// import { articleApi } from './api';

// export interface ArticleSubmission {
//   title: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: File | null;
// }

// export interface Article {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: string;
//   status: 'draft' | 'pending' | 'published' | 'rejected';
//   created_at: string;
//   read_time: string;
//   author: {
//     id: number;
//     username: string;
//   };
// }

// interface CommentSubmission {
//   content: string;
//   rating: number;
// }

// export const articleService = {
//   getPublishedArticles: async (): Promise<Article[]> => {
//     const response = await articleApi.getArticles();
//     return response.data.filter((article: Article) => article.status === 'published');
//   },

//   getArticle: async (slug: string): Promise<Article> => {
//     try {
//       const response = await articleApi.getArticleBySlug(slug);
//       const articles = response.data.filter((article: Article) => 
//         article.slug === slug && article.status === 'published'
//       );
      
//       if (!articles || articles.length === 0) {
//         throw new Error('Article not found');
//       }
      
//       return articles[0];
//     } catch (error) {
//       console.error('Error fetching article:', error);
//       throw error;
//     }
//   },

//   getArticleComments: async (slug: string) => {
//     const response = await articleApi.getArticleComments(slug);
//     return response.data;
//   },

//   submitComment: async (articleId: number, data: CommentSubmission) => {
//     const response = await articleApi.submitComment(articleId, data);
//     return response.data;
//   },

//   submitArticle: async (data: ArticleSubmission): Promise<Article> => {
//     try {
//       const formData = new FormData();
      
//       formData.append('title', data.title);
//       formData.append('content', data.content);
//       formData.append('excerpt', data.excerpt);
//       formData.append('category', data.category);
      
//       if (data.featured_image instanceof File) {
//         formData.append('featured_image', data.featured_image);
//       }

//       const response = await articleApi.submitArticle(formData);
//       return response.data;
//     } catch (error) {
//       console.error('Error submitting article:', error);
//       throw error;
//     }
//   }
// };

// import { articleApi } from './api';

// export interface ArticleSubmission {
//   title: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: File | null;
// }

// export interface Article {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   featured_image?: string;
//   status: 'draft' | 'pending' | 'published' | 'rejected';
//   created_at: string;
//   read_time: string;
//   author: {
//     id: number;
//     username: string;
//   };
//   comments: Array<{
//     id: number;
//     content: string;
//     rating: number;
//     created_at: string;
//     user: {
//       id: number;
//       username: string;
//     };
//   }>;
// }

// interface CommentSubmission {
//   content: string;
//   rating: number;
// }

// export const articleService = {
//   getPublishedArticles: async (): Promise<Article[]> => {
//     const response = await articleApi.getArticles();
//     return response.data.filter((article: Article) => article.status === 'published');
//   },

//   getArticle: async (slug: string): Promise<Article> => {
//     try {
//       const response = await articleApi.getArticleBySlug(slug);
//       const articles = response.data.filter((article: Article) => 
//         article.slug === slug && article.status === 'published'
//       );
      
//       if (!articles || articles.length === 0) {
//         throw new Error('Article not found');
//       }
      
//       return articles[0];
//     } catch (error) {
//       console.error('Error fetching article:', error);
//       throw error;
//     }
//   },

//   getArticleComments: async (articleId: number | string) => {
//     const response = await articleApi.getArticleComments(articleId);
//     return response.data;
//   },

//   submitComment: async (articleId: number | string, data: CommentSubmission) => {
//     const response = await articleApi.submitComment(articleId, data);
//     return response.data;
//   },

//   submitArticle: async (data: ArticleSubmission): Promise<Article> => {
//     try {
//       const formData = new FormData();
      
//       formData.append('title', data.title);
//       formData.append('content', data.content);
//       formData.append('excerpt', data.excerpt);
//       formData.append('category', data.category);
      
//       if (data.featured_image instanceof File) {
//         formData.append('featured_image', data.featured_image);
//       }

//       const response = await articleApi.submitArticle(formData);
//       return response.data;
//     } catch (error) {
//       console.error('Error submitting article:', error);
//       throw error;
//     }
//   }
// };

import { articleApi } from './api';

export interface ArticleSubmission {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image?: File | null;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image?: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  created_at: string;
  read_time: string;
  author: {
    id: number;
    username: string;
  };
  comments: Array<{
    id: number;
    content: string;
    rating: number;
    created_at: string;
    user: {
      id: number;
      username: string;
    };
  }>;
}

interface CommentSubmission {
  content: string;
  rating: number;
}

export const articleService = {
  getPublishedArticles: async (): Promise<Article[]> => {
    const response = await articleApi.getArticles();
    return response.data.filter((article: Article) => article.status === 'published');
  },

  getArticle: async (slug: string): Promise<Article> => {
    try {
      const response = await articleApi.getArticleBySlug(slug);
      const articles = response.data.filter((article: Article) => 
        article.slug === slug && article.status === 'published'
      );
      
      if (!articles || articles.length === 0) {
        throw new Error('Article not found');
      }
      
      return articles[0];
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },

  getArticleComments: async (articleId: number | string) => {
    const response = await articleApi.getArticleComments(articleId);
    return response.data;
  },

  submitComment: async (articleId: number | string, data: CommentSubmission) => {
    if (!data.content.trim()) {
      throw new Error('Comment content is required');
    }
    if (data.rating < 1 || data.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    const response = await articleApi.submitComment(articleId, data);
    return response.data;
  },

  submitArticle: async (data: ArticleSubmission): Promise<Article> => {
    try {
      const formData = new FormData();
      
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('excerpt', data.excerpt);
      formData.append('category', data.category);
      
      if (data.featured_image instanceof File) {
        formData.append('featured_image', data.featured_image);
      }

      const response = await articleApi.submitArticle(formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting article:', error);
      throw error;
    }
  }
};