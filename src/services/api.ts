
// import axios from 'axios';
// import { authStorage } from './auth/storage';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests if available
// api.interceptors.request.use((config) => {
//   const token = authStorage.getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add error interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       // Clear invalid token
//       authStorage.clear();
//       // Redirect to login
//       window.location.href = '/login';
//       return Promise.reject(new Error('Please login to continue'));
//     }
    
//     console.error('API Error:', {
//       url: error.config?.url,
//       method: error.config?.method,
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.config?.headers
//     });
//     return Promise.reject(error);
//   }
// );

// export const articleApi = {
//   getArticles: () => api.get('/articles/'),
//   getArticle: (id: string) => api.get(`/articles/${id}/`),
//   submitArticle: (data: FormData) => {
//     // Ensure we have the latest token
//     const token = authStorage.getToken();
//     if (!token) {
//       return Promise.reject(new Error('Authentication required'));
//     }
    
//     return api.post('/articles/', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`
//       },
//     });
//   },
//   reviewArticle: (id: string, status: 'published' | 'rejected') =>
//     api.post(`/articles/${id}/review/`, { status }),
// };

// export default api;


// import axios from 'axios';
// import { authStorage } from './auth/storage';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests if available
// api.interceptors.request.use((config) => {
//   const token = authStorage.getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add error interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       // Clear invalid token
//       authStorage.clear();
//       // Redirect to login
//       window.location.href = '/login';
//       return Promise.reject(new Error('Please login to continue'));
//     }
    
//     console.error('API Error:', {
//       url: error.config?.url,
//       method: error.config?.method,
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.config?.headers
//     });
//     return Promise.reject(error);
//   }
// );

// export const articleApi = {
//   getArticles: () => api.get('/articles/'),
//   getArticleBySlug: (slug: string) => api.get(`/articles/?slug=${slug}`),
//   submitArticle: (data: FormData) => {
//     // Ensure we have the latest token
//     const token = authStorage.getToken();
//     if (!token) {
//       return Promise.reject(new Error('Authentication required'));
//     }
    
//     return api.post('/articles/', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`
//       },
//     });
//   },
//   reviewArticle: (id: string, status: 'published' | 'rejected') =>
//     api.post(`/articles/${id}/review/`, { status }),
// };

// export default api;


// import axios from 'axios';
// import { authStorage } from './auth/storage';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests if available
// api.interceptors.request.use((config) => {
//   const token = authStorage.getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add error interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       // Clear invalid token
//       authStorage.clear();
//       // Redirect to login
//       window.location.href = '/login';
//       return Promise.reject(new Error('Please login to continue'));
//     }
    
//     console.error('API Error:', {
//       url: error.config?.url,
//       method: error.config?.method,
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.config?.headers
//     });
//     return Promise.reject(error);
//   }
// );

// export const articleApi = {
//   getArticles: () => api.get('/articles/'),
//   getArticleBySlug: (slug: string) => api.get(`/articles/?slug=${slug}`),
//   getArticleComments: (slug: string) => api.get(`/articles/${slug}/comments/`),
//   submitComment: (articleId: number, data: { content: string; rating: number }) =>
//     api.post(`/articles/${articleId}/comments/`, data),
//   submitArticle: (data: FormData) => {
//     // Ensure we have the latest token
//     const token = authStorage.getToken();
//     if (!token) {
//       return Promise.reject(new Error('Authentication required'));
//     }
    
//     return api.post('/articles/', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`
//       },
//     });
//   },
//   reviewArticle: (id: string, status: 'published' | 'rejected') =>
//     api.post(`/articles/${id}/review/`, { status }),
// };

// export default api;

// import axios from 'axios';
// import { authStorage } from './auth/storage';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests if available
// api.interceptors.request.use((config) => {
//   const token = authStorage.getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add error interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       // Clear invalid token
//       authStorage.clear();
//       // Redirect to login
//       window.location.href = '/login';
//       return Promise.reject(new Error('Please login to continue'));
//     }
    
//     console.error('API Error:', {
//       url: error.config?.url,
//       method: error.config?.method,
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.config?.headers
//     });
//     return Promise.reject(error);
//   }
// );

// export const articleApi = {
//   getArticles: () => api.get('/articles/'),
//   getArticleBySlug: (slug: string) => api.get(`/articles/?slug=${slug}`),
//   getArticleComments: (articleId: string | number) => 
//     api.get(`/articles/${articleId}/comments/`),
//   submitComment: (articleId: string | number, data: { content: string; rating: number }) =>
//     api.post(`/articles/${articleId}/add_comment/`, data),
//   submitArticle: (data: FormData) => {
//     // Ensure we have the latest token
//     const token = authStorage.getToken();
//     if (!token) {
//       return Promise.reject(new Error('Authentication required'));
//     }
    
//     return api.post('/articles/', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`
//       },
//     });
//   },
//   reviewArticle: (id: string, status: 'published' | 'rejected') =>
//     api.post(`/articles/${id}/review/`, { status }),
// };

// export default api;

import axios from 'axios';
import { authStorage } from './auth/storage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear invalid token
      authStorage.clear();
      // Redirect to login
      window.location.href = '/login';
      return Promise.reject(new Error('Please login to continue'));
    }
    
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers
    });
    return Promise.reject(error);
  }
);

export const articleApi = {
  getArticles: () => api.get('/articles/'),
  getArticleBySlug: (slug: string) => api.get(`/articles/?slug=${slug}`),
  getArticleComments: (articleId: string | number) => 
    api.get(`/articles/${articleId}/comments/`),
  submitComment: (articleId: string | number, data: { content: string; rating: number }) =>
    api.post(`/articles/${articleId}/comments/`, data),
  submitArticle: (data: FormData) => {
    // Ensure we have the latest token
    const token = authStorage.getToken();
    if (!token) {
      return Promise.reject(new Error('Authentication required'));
    }
    
    return api.post('/articles/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
  },
  reviewArticle: (id: string, status: 'published' | 'rejected') =>
    api.post(`/articles/${id}/review/`, { status }),
};

export default api;