// API Helper Library for Admin Dashboard
import type { 
  Blog, 
  Portfolio, 
  Experience,
  CreateBlogInput,
  UpdateBlogInput,
  CreatePortfolioInput,
  UpdatePortfolioInput,
  CreateExperienceInput,
  UpdateExperienceInput
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || `HTTP error! status: ${response.status}`
      );
    }

    if (!data.success) {
      throw new ApiError(response.status, data.error || 'API request failed');
    }

    return data.data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error or server is down');
  }
}

// Blog API
export const blogApi = {
  getAll: () => fetcher<Blog[]>('/blogs'),
  getById: (id: number) => fetcher<Blog>(`/blogs/${id}`),
  getBySlug: (slug: string) => fetcher<Blog>(`/blogs/slug/${slug}`),
  getByCategory: (category: string) => fetcher<Blog[]>(`/blogs/category/${category}`),
  getByTag: (tag: string) => fetcher<Blog[]>(`/blogs/tag/${tag}`),
  getCategories: () => fetcher<string[]>('/blogs/categories'),
  getTags: () => fetcher<string[]>('/blogs/tags'),
  search: (query: string) => fetcher<Blog[]>(`/blogs/search?q=${encodeURIComponent(query)}`),
  create:  (data: CreateBlogInput) => fetcher<Blog>('/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: UpdateBlogInput) => fetcher<Blog>(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetcher<void>(`/blogs/${id}`, {
    method: 'DELETE',
  }),
};

// Portfolio API
export const portfolioApi = {
  getAll: () => fetcher<Portfolio[]>('/portfolios'),
  getById: (id: number) => fetcher<Portfolio>(`/portfolios/${id}`),
  getByCategory: (category: string) => fetcher<Portfolio[]>(`/portfolios/category/${category}`),
  getCategories: () => fetcher<string[]>('/portfolios/categories'),
  search: (query: string) => fetcher<Portfolio[]>(`/portfolios/search?q=${encodeURIComponent(query)}`),
  create: (data: CreatePortfolioInput) => fetcher<Portfolio>('/portfolios', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: UpdatePortfolioInput) => fetcher<Portfolio>(`/portfolios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetcher<void>(`/portfolios/${id}`, {
    method: 'DELETE',
  }),
};

// Experience API
export const experienceApi = {
  getAll: () => fetcher<Experience[]>('/experiences'),
  getById: (id: number) => fetcher<Experience>(`/experiences/${id}`),
  getByType: (type: string) => fetcher<Experience[]>(`/experiences/type/${type}`),
  getCurrent: () => fetcher<Experience[]>('/experiences/current'),
  search: (query: string) => fetcher<Experience[]>(`/experiences/search?q=${encodeURIComponent(query)}`),
  create: (data: CreateExperienceInput) => fetcher<Experience>('/experiences', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: UpdateExperienceInput) => fetcher<Experience>(`/experiences/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetcher<void>(`/experiences/${id}`, {
    method: 'DELETE',
  }),
};

export { ApiError };
export type { Blog, Portfolio, Experience };

