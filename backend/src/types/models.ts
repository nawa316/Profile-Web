// Blog Model Interface (matching frontend BlogPost)
export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  author: string;
  category: string;
  tags: string[];
  published_at: Date;
  read_time: number;
  created_at: Date;
  updated_at: Date;
}

// Blog creation input
export interface CreateBlogInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  author?: string;
  category: string;
  tags?: string[];
  published_at?: Date;
  read_time?: number;
}

// Blog update input
export interface UpdateBlogInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
  published_at?: Date;
  read_time?: number;
}

// Portfolio Model Interface (matching frontend PortfolioItem)
export interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  category: string;
  link: string | null;
  github: string | null;
  created_at: Date;
  updated_at: Date;
}

// Portfolio creation input
export interface CreatePortfolioInput {
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  category: string;
  link?: string;
  github?: string;
}

// Portfolio update input
export interface UpdatePortfolioInput {
  title?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  category?: string;
  link?: string;
  github?: string;
}

// Experience Model Interface (matching frontend ExperienceItem)
export interface Experience {
  id: number;
  organization: string;
  role: string;
  description: string;
  image: string | null;
  start_date: Date;
  end_date: Date | null; // null means current/ongoing
  type: 'organization' | 'work' | 'volunteer';
  skills: string[];
  location: string | null;
  created_at: Date;
  updated_at: Date;
}

// Experience creation input
export interface CreateExperienceInput {
  organization: string;
  role: string;
  description: string;
  image?: string;
  start_date: Date;
  end_date?: Date | null;
  type: 'organization' | 'work' | 'volunteer';
  skills?: string[];
  location?: string;
}

// Experience update input
export interface UpdateExperienceInput {
  organization?: string;
  role?: string;
  description?: string;
  image?: string;
  start_date?: Date;
  end_date?: Date | null;
  type?: 'organization' | 'work' | 'volunteer';
  skills?: string[];
  location?: string;
}
