import { useState, useMemo } from 'react';
import { Article, FilterState } from '../types/blog';

export function useFilters(articles: Article[]) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    searchQuery: '',
    sortBy: 'newest'
  });

  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(article => 
        filters.categories.includes(article.category.slug)
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return b.views - a.views;
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.views - a.views;
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      searchQuery: '',
      sortBy: 'newest'
    });
  };

  return {
    filters,
    filteredArticles,
    updateFilters,
    clearFilters
  };
}