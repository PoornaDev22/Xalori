import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useFilters } from './hooks/useFilters';
import { useStrapiApi } from './hooks/useStrapiApi';
import { ViewMode, Article } from './types/blog';

import Header from './components/Header';
import FeaturedArticles from './components/FeaturedArticles';
import FilterBar from './components/FilterBar';
import ArticleGrid from './components/ArticleGrid';
import TrendingSidebar from './components/TrendingSidebar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import ArticleDetail from './components/ArticleDetail';

function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode['mode']>('grid');
  const { articles, categories, loading, error, refetch } = useStrapiApi();
  const { filters, filteredArticles, updateFilters, clearFilters } = useFilters(articles);
  const navigate = useNavigate();

  // Handle search query from URL parameters
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
      updateFilters({ searchQuery });
    }
  }, [updateFilters]);

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header onSearch={() => {}} searchQuery="" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="lg" message="Loading articles..." />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header onSearch={() => {}} searchQuery="" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={error} onRetry={refetch} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        onSearch={(query) => updateFilters({ searchQuery: query })}
        searchQuery={filters.searchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Featured Articles Section */}
            <FeaturedArticles articles={articles} onArticleClick={handleArticleClick} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <FilterBar
                  filters={filters}
                  viewMode={viewMode}
                  onFiltersChange={updateFilters}
                  onViewModeChange={setViewMode}
                  onClearFilters={clearFilters}
                  resultsCount={filteredArticles.length}
                />

                <ArticleGrid
                  articles={filteredArticles}
                  viewMode={viewMode}
                  onArticleClick={handleArticleClick}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <TrendingSidebar articles={articles} onArticleClick={handleArticleClick} />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { articles, loading, error } = useStrapiApi();

  const article = articles.find(a => a.slug === slug);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header onSearch={() => {}} searchQuery="" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="lg" message="Loading article..." />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header onSearch={() => {}} searchQuery="" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage 
            message={error || "Article not found"} 
            onRetry={handleBack} 
          />
        </main>
        <Footer />
      </div>
    );
  }

  return <ArticleDetail article={article} onBack={handleBack} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;