import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '../types/blog';
import ArticleCard from './ArticleCard';

interface FeaturedArticlesProps {
  articles: Article[];
  onArticleClick?: (article: Article) => void;
}

export default function FeaturedArticles({ articles, onArticleClick }: FeaturedArticlesProps) {
  let featuredArticles = articles.filter(article => article.featured).slice(0, 3);

  // If no featured articles, show the first 3 articles as featured
  if (featuredArticles.length === 0 && articles.length > 0) {
    featuredArticles = articles.slice(0, 3);
  }

  if (featuredArticles.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Featured Articles
        </h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            viewMode="grid"
            onClick={() => onArticleClick?.(article)}
          />
        ))}
      </div>
    </section>
  );
}