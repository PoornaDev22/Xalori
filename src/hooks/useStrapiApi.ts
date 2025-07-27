import { useState, useEffect, useCallback, useMemo } from 'react';
import { API_ENDPOINTS, buildApiUrl } from '../config/api';
import { Article, Category } from '../types/blog';

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  content: Array<{
    type: string;
    level?: number;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  imageUrl: string;
  keyword: string;
  pubstatus: string;
  pubat: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: string;
  image: string | null;
}



// Helper functions for category styling
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Technology': '#3B82F6',
    'Politics': '#EF4444',
    'Sports': '#10B981',
    'Lifestyle': '#F59E0B',
    'Food & Beverages': '#8B5CF6',
    'Health': '#EC4899',
    'Entertainment': '#06B6D4',
    'default': '#6B7280'
  };
  return colors[category] || colors.default;
};

const getCategoryGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    'Technology': 'from-blue-500 to-blue-600',
    'Politics': 'from-red-500 to-red-600',
    'Sports': 'from-green-500 to-green-600',
    'Lifestyle': 'from-yellow-500 to-yellow-600',
    'Food & Beverages': 'from-purple-500 to-purple-600',
    'Health': 'from-pink-500 to-pink-600',
    'Entertainment': 'from-cyan-500 to-cyan-600',
    'default': 'from-gray-500 to-gray-600'
  };
  return gradients[category] || gradients.default;
};

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Technology': '💻',
    'Politics': '🏛️',
    'Sports': '⚽',
    'Lifestyle': '🌟',
    'Food & Beverages': '🍽️',
    'Health': '🏥',
    'Entertainment': '🎬',
    'default': '📰'
  };
  return icons[category] || icons.default;
};

const useApiWithCache = () => {
  const cache = useMemo(() => new Map(), []);
  
  const cachedFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    const cacheKey = `${url}${JSON.stringify(options)}`;

    console.log(`[API] Making request to: ${url}`);
    console.log(`[API] Request options:`, options);
    
    if (cache.has(cacheKey)) {
      console.log(`[API] Returning cached response for: ${url}`);
      return cache.get(cacheKey);
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        }
      });

      console.log(`[API] Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`[API] Response data:`, data);

      cache.set(cacheKey, data);
      // Cache for 5 minutes
      setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }, [cache]);
  
  return cachedFetch;
};

const transformStrapiArticle = (strapiArticle: StrapiArticle): Article => {
  const { id, title, content, imageUrl, slug, publishedAt, category, keyword } = strapiArticle;
  
  // Extract excerpt from content (first paragraph)
  const excerpt = content.find(item => item.type === 'paragraph')?.children?.[0]?.text || 
                 'No excerpt available';
  
  // Convert content to string for display
  const contentText = content.map(item => 
    item.children?.map(child => child.text).join('') || ''
  ).join('\n');
  
  // Create category object from string
  const categoryObj = {
    id: category.toLowerCase(),
    name: category,
    slug: category.toLowerCase(),
    color: getCategoryColor(category),
    gradient: getCategoryGradient(category),
    icon: getCategoryIcon(category),
    description: `${category} articles`
  };
  
  return {
    id: id.toString(),
    title,
    slug,
    excerpt,
    content: contentText,
    featuredImage: imageUrl,
    category: categoryObj,
    author: {
      name: 'Anonymous',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Contributing writer'
    },
    publishedAt,
    readTime: Math.ceil(contentText.split(' ').length / 200), // Estimate read time
    views: Math.floor(Math.random() * 10000) + 1000, // Random views for demo
    featured: Math.random() > 0.7, // 30% chance of being featured
    trending: Math.random() > 0.8, // 20% chance of being trending
    tags: keyword ? [keyword] : []
  };
};



export const useStrapiApi = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const cachedFetch = useApiWithCache();

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = buildApiUrl(API_ENDPOINTS.ARTICLES, {
        populate: '*',
        'filters[pubstatus][$eq]': 'published',
        sort: 'publishedAt:desc'
      });
      
      const response: StrapiResponse<StrapiArticle> = await cachedFetch(url);
      let transformedArticles = response.data.map(transformStrapiArticle);
      
      // Ensure we have some featured articles (at least the first 2)
      if (transformedArticles.length > 0) {
        transformedArticles = transformedArticles.map((article, index) => ({
          ...article,
          featured: index < 2 ? true : article.featured, // First 2 articles are always featured
          trending: index < 1 ? true : article.trending // First article is always trending
        }));
      }
      
      setArticles(transformedArticles);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  }, [cachedFetch]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const refetch = useCallback(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    categories: [], // Categories are derived from articles
    loading,
    error,
    refetch
  };
}; 