import React from 'react';
import { Article } from '../types/blog';
import Header from './Header';
import Footer from './Footer';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  if (!article) return null;

  // Convert **bold** to <strong>
  const parseBold = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
      chunk.startsWith('**') && chunk.endsWith('**')
        ? <strong key={i}>{chunk.slice(2, -2)}</strong>
        : chunk
    );
  };

  // Parse content and render it properly
  const renderContent = (content: string) => {
    const paragraphs = content.split('\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, idx) => {
      // Check if it's a heading (starts with #)
      if (paragraph.startsWith('#')) {
        const level = paragraph.match(/^#+/)?.[0].length || 1;
        const text = paragraph.replace(/^#+\s*/, '');
        const HeadingTag = `h${Math.min(level, 4)}` as keyof JSX.IntrinsicElements;
        
        return (
          <HeadingTag 
            key={idx} 
            className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
          >
            {parseBold(text)}
          </HeadingTag>
        );
      }
      
      // Check if it's a list item (starts with * or -)
      if (paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('- ')) {
        return (
          <li key={idx} className="ml-6 mb-2 text-gray-700 dark:text-gray-300">
            {parseBold(paragraph.trim().slice(2))}
          </li>
        );
      }
      
      // Regular paragraph
      return (
        <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {parseBold(paragraph)}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header 
        onSearch={(query) => {
          if (query.trim()) {
            // Navigate to home page with search query
            window.location.href = `/?search=${encodeURIComponent(query)}`;
          }
        }} 
        searchQuery="" 
      />

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </button>
        </div>
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative h-96">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Article Header */}
          <div className="p-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: article.category.color + '20',
                  color: article.category.color 
                }}
              >
                <span className="mr-2">{article.category.icon}</span>
                {article.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(article.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime} min read
              </div>
              {/* <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {article.views.toLocaleString()} views
              </div> */}
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Excerpt */}
            <div className="mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 pl-4">
                {article.excerpt}
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {renderContent(article.content)}
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {article.author.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail; 