import React from 'react';
import { TrendingUp, Eye } from 'lucide-react';
import { Article } from '../types/blog';

interface TrendingSidebarProps {
  articles: Article[];
  onArticleClick?: (article: Article) => void;
}

export default function TrendingSidebar({ articles, onArticleClick }: TrendingSidebarProps) {
  const trendingArticles = articles
    .filter(article => article.trending)
    .slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* Trending Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Trending Now
          </h3>
        </div>
        
        <div className="space-y-4">
          {trendingArticles.map((article, index) => (
            <div 
              key={article.id} 
              className="flex space-x-3 group cursor-pointer"
              onClick={() => onArticleClick?.(article)}
            >
              <span className="text-2xl font-bold text-gray-300 dark:text-gray-600 w-8 flex-shrink-0">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span
                    className="px-2 py-0.5 rounded text-white text-xs"
                    style={{ backgroundColor: article.category.color }}
                  >
                    {article.category.name}
                  </span>
                  {/* <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{article.views > 1000 ? `${(article.views / 1000).toFixed(1)}k` : article.views}</span>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Stay Updated
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Get the latest news and insights delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Popular Categories
        </h3>
        <div className="space-y-2">
          {['Technology', 'Politics', 'Sports', 'Health', 'Travel'].map((category) => (
            <button
              key={category}
              className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}