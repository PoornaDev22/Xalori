import { Calendar, Clock, Eye, Share2 } from 'lucide-react';
import { Article, ViewMode } from '../types/blog';

interface ArticleCardProps {
  article: Article;
  viewMode: ViewMode['mode'];
  onClick?: () => void;
}

export default function ArticleCard({ article, viewMode, onClick }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  if (viewMode === 'list') {
    return (
      <article 
        className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer"
        onClick={onClick}
      >
        <div className="md:w-1/3 flex-shrink-0">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        <div className="md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${article.category.gradient}`}
              >
                {article.category.name}
              </span>
              {article.trending && (
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                  Trending
                </span>
              )}
              {article.featured && (
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              {article.title}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {article.excerpt}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min</span>
              </div>
              {/* <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{formatViews(article.views)}</span>
              </div> */}
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${article.category.gradient}`}
          >
            {article.category.name}
          </span>
          {article.trending && (
            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
              Trending
            </span>
          )}
          {article.featured && (
            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2">
          {article.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {article.author.name}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{formatDate(article.publishedAt)}</span>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
          
          {/* <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Eye className="h-3 w-3" />
            <span>{formatViews(article.views)}</span>
          </div> */}
        </div>
      </div>
    </article>
  );
}