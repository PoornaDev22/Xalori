import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { categories } from '../data/categories';

interface CategoryNavProps {
  mobile?: boolean;
  selectedCategories?: string[];
  onCategoryToggle?: (categorySlug: string) => void;
}

export default function CategoryNav({ mobile, selectedCategories = [], onCategoryToggle }: CategoryNavProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryClick = (categorySlug: string) => {
    if (onCategoryToggle) {
      onCategoryToggle(categorySlug);
    }
    if (mobile) {
      setIsDropdownOpen(false);
    }
  };

  if (mobile) {
    return (
      <div className="space-y-2">
        {categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
          const isSelected = selectedCategories.includes(category.slug);
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition-colors ${
                isSelected
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <IconComponent className="h-4 w-4" style={{ color: category.color }} />
              <span className="font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <span>Categories</span>
        <Icons.ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Browse Categories
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                  const isSelected = selectedCategories.includes(category.slug);
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.slug)}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" style={{ color: category.color }} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}