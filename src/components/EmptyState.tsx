import React from 'react';

interface EmptyStateProps {
  message?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No articles found',
  description = 'There are no published articles available at the moment. Check back later for new content.'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 mb-6 text-gray-400">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {message}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        {description}
      </p>
    </div>
  );
};

export default EmptyState; 