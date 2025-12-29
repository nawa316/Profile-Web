// Type definitions for API responses

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  published_at: string;
  read_time: number;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
  github: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  organization: string;
  role: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string | null;
  type: 'organization' | 'work' | 'volunteer';
  skills: string[];
  location: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  author: string;
  category: string;
  tags?: string[];
  published_at: string;
  read_time: number;
}

export interface UpdateBlogInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
  published_at?: string;
  read_time?: number;
}

export interface CreatePortfolioInput {
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  category: string;
  link?: string;
  github?: string;
}

export interface UpdatePortfolioInput {
  title?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  category?: string;
  link?: string;
  github?: string;
}

export interface CreateExperienceInput {
  organization: string;
  role: string;
  description: string;
  image?: string;
  start_date: string;
  end_date?: string | null;
  type: 'organization' | 'work' | 'volunteer';
  skills?: string[];
  location?: string;
}

export interface UpdateExperienceInput {
  organization?: string;
  role?: string;
  description?: string;
  image?: string;
  start_date?: string;
  end_date?: string | null;
  type?: 'organization' | 'work' | 'volunteer';
  skills?: string[];
  location?: string;
}
