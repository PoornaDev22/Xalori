import React from 'react';
import { Article, ViewMode } from '../types/blog';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  viewMode: ViewMode['mode'];
  onArticleClick?: (article: Article) => void;
}

export default function ArticleGrid({ articles, viewMode, onArticleClick }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-content-center">
            <span className="text-4xl">📰</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search terms to find more content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${
      viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-6'
    }`}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          viewMode={viewMode}
          onClick={() => onArticleClick?.(article)}
        />
      ))}
    </div>
  );
}