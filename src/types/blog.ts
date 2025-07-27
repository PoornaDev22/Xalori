export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  gradient: string;
  icon: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: number;
  views: number;
  featured: boolean;
  trending: boolean;
  tags: string[];
}

export interface ViewMode {
  mode: 'grid' | 'list';
}

export interface FilterState {
  categories: string[];
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending';
}