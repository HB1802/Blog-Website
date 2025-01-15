export const ROUTES = {
  HOME: '/',
  ARTICLES: '/articles',
  CATEGORIES: '/categories',
  ABOUT: '/about',
  SUBMIT_ARTICLE: '/submit-article',
  ADMIN_DASHBOARD: '/admin/dashboard'
} as const;

export const CATEGORIES = [
  { id: 'technology', name: 'Technology' },
  { id: 'design', name: 'Design' },
  { id: 'development', name: 'Development' },
  { id: 'ai', name: 'Artificial Intelligence' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'career', name: 'Career Growth' }
] as const;