import React from 'react';
import { Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { FilterState, ViewMode } from '../types/blog';
import CategoryNav from './CategoryNav';

interface FilterBarProps {
  filters: FilterState;
  viewMode: ViewMode['mode'];
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onViewModeChange: (mode: ViewMode['mode']) => void;
  onClearFilters: () => void;
  resultsCount: number;
}

export default function FilterBar({
  filters,
  viewMode,
  onFiltersChange,
  onViewModeChange,
  onClearFilters,
  resultsCount
}: FilterBarProps) {
  const hasActiveFilters = filters.categories.length > 0 || filters.searchQuery;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Category Filter */}
          <CategoryNav
            selectedCategories={filters.categories}
            onCategoryToggle={(categorySlug) => {
              const newCategories = filters.categories.includes(categorySlug)
                ? filters.categories.filter(cat => cat !== categorySlug)
                : [...filters.categories, categorySlug];
              onFiltersChange({ categories: newCategories });
            }}
          />

          {/* Sort Options */}
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Results Count */}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {resultsCount} article{resultsCount !== 1 ? 's' : ''}
          </span>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {filters.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {filters.categories.map((categorySlug) => (
            <span
              key={categorySlug}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
            >
              {categorySlug.replace('-', ' ')}
              <button
                onClick={() => {
                  const newCategories = filters.categories.filter(cat => cat !== categorySlug);
                  onFiltersChange({ categories: newCategories });
                }}
                className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}