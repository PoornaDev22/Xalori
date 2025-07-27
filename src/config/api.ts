import { API_CONFIG } from './environment';

export const API_ENDPOINTS = {
  ARTICLES: `${API_CONFIG.STRAPI_BASE_URL}/api/articles`,
  CATEGORIES: `${API_CONFIG.STRAPI_BASE_URL}/api/categories`,
};

export const buildApiUrl = (endpoint: string, params?: Record<string, string | number | boolean>) => {
  const url = new URL(endpoint);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Don't encode the key for Strapi filters
        if (key.includes('[') && key.includes(']')) {
          // For Strapi filter parameters like filters[pubstatus][$eq]
          url.searchParams.append(key, value.toString());
        } else {
          url.searchParams.append(key, value.toString());
        }
      }
    });
  }
  
  return url.toString();
}; 