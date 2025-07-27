import { Article } from '../types/blog';
import { categories } from './categories';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI: Transforming Industries in 2025',
    slug: 'future-of-ai-transforming-industries-2025',
    excerpt: 'Exploring how artificial intelligence is revolutionizing various sectors and what to expect in the coming year.',
    content: 'Full article content here...',
    featuredImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: categories[0], // Technology
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Tech journalist and AI researcher'
    },
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: 8,
    views: 15420,
    featured: true,
    trending: true,
    tags: ['AI', 'Technology', 'Future']
  },
  {
    id: '2',
    title: 'Breaking: Major Policy Changes Announced',
    slug: 'major-policy-changes-announced',
    excerpt: 'Government unveils significant policy reforms affecting healthcare and education sectors.',
    content: 'Full article content here...',
    featuredImage: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: categories[1], // Politics
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Political correspondent'
    },
    publishedAt: '2025-01-14T15:30:00Z',
    readTime: 6,
    views: 8930,
    featured: true,
    trending: true,
    tags: ['Politics', 'Policy', 'Government']
  },
  {
    id: '3',
    title: 'Championship Finals: Record-Breaking Performance',
    slug: 'championship-finals-record-breaking-performance',
    excerpt: 'Athletes deliver stunning performances in this years championship finals, setting new records.',
    content: 'Full article content here...',
    featuredImage: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: categories[2], // Sports
    author: {
      name: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Sports journalist'
    },
    publishedAt: '2025-01-13T20:00:00Z',
    readTime: 5,
    views: 12750,
    featured: false,
    trending: true,
    tags: ['Sports', 'Championship', 'Records']
  },
  {
    id: '4',
    title: 'Minimalist Living: Transform Your Space',
    slug: 'minimalist-living-transform-your-space',
    excerpt: 'Discover how minimalist principles can create a more peaceful and organized living environment.',
    content: 'Full article content here...',
    featuredImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: categories[3], // Lifestyle
    author: {
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Lifestyle blogger'
    },
    publishedAt: '2025-01-12T12:00:00Z',
    readTime: 7,
    views: 6540,
    featured: false,
    trending: false,
    tags: ['Lifestyle', 'Minimalism', 'Home']
  },
  {
    id: '5',
    title: 'Farm-to-Table: The Future of Dining',
    slug: 'farm-to-table-future-of-dining',
    excerpt: 'Exploring the growing trend of farm-to-table restaurants and sustainable dining practices.',
    content: 'Full article content here...',
    featuredImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: categories[4], // Food & Beverages
    author: {
      name: 'Isabella Garcia',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Food critic and chef'
    },
    publishedAt: '2025-01-11T14:30:00Z',
    readTime: 9,
    views: 4320,
    featured: false,
    trending: false,
    tags: ['Food', 'Sustainability', 'Restaurants']
  },
  {
    id: '6',
    title: 'Mental Health in the Digital Age',
    slug: 'mental-health-digital-age',
    excerpt: 'Understanding the impact of technology on mental well-being and strategies for digital wellness.',
    content: 'Full article content here...',
    featuredImage: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: categories[5], // Health
    author: {
      name: 'Dr. Amanda Foster',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Clinical psychologist'
    },
    publishedAt: '2025-01-10T09:00:00Z',
    readTime: 11,
    views: 7890,
    featured: true,
    trending: false,
    tags: ['Health', 'Mental Health', 'Technology']
  }
];