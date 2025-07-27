export const ENV_CONFIG = {
  STRAPI_BASE_URL: import.meta.env.VITE_STRAPI_BASE_URL || 'https://effortless-connection-2f75f4ee80.strapiapp.com',
  NODE_ENV: import.meta.env.MODE,
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};

export const API_CONFIG = {
  STRAPI_BASE_URL: ENV_CONFIG.STRAPI_BASE_URL
}; 