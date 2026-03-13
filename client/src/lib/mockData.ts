/**
 * Mock Property Data Service
 * Simulates a real estate API with structured property data
 * Follows the data structure defined in requirements
 */

export interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
  };
  area: number; // in sqft
  type: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land';
  bedrooms: number;
  bathrooms: number;
  floors: number;
  builtYear: number;
  facing: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';
  roadAccess: string;
  amenities: {
    parking: boolean;
    water: boolean;
    electricity: boolean;
    internet: boolean;
    garden: boolean;
    security: boolean;
    pool?: boolean;
    gym?: boolean;
    balcony?: boolean;
  };
  media: {
    images: string[];
    video?: string;
    virtualTour?: string;
  };
  analytics: {
    views: number;
    saves: number;
    popularity: number; // 0-100
  };
  verified: boolean;
  agent: {
    id: string;
    name: string;
    rating: number;
    phone: string;
    avatar: string;
    email: string;
  };
  description: string;
  priceHistory?: Array<{
    date: string;
    price: number;
  }>;
}

export interface PopularVideo {
  id: string;
  videoUrl: string;
  title: string;
  location: string;
  tags: string[];
  likes: number;
}

// Mock agents
const agents = [
  {
    id: 'agent-1',
    name: 'Sarah Mitchell',
    rating: 4.8,
    phone: '+1 (555) 123-4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    email: 'sarah@realestate.com',
  },
  {
    id: 'agent-2',
    name: 'James Chen',
    rating: 4.9,
    phone: '+1 (555) 234-5678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    email: 'james@realestate.com',
  },
  {
    id: 'agent-3',
    name: 'Emily Rodriguez',
    rating: 4.7,
    phone: '+1 (555) 345-6789',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily@realestate.com',
  },
  {
    id: 'agent-4',
    name: 'Michael Thompson',
    rating: 4.6,
    phone: '+1 (555) 456-7890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    email: 'michael@realestate.com',
  },
];

// Generate mock properties
export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Luxury Modern Estate with Pool',
    price: 2500000,
    location: {
      address: '1247 Oakmont Drive',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      lat: 34.0522,
      lng: -118.2437,
    },
    area: 8500,
    type: 'house',
    bedrooms: 5,
    bathrooms: 6,
    floors: 2,
    builtYear: 2019,
    facing: 'south',
    roadAccess: 'Private driveway with gate',
    amenities: {
      parking: true,
      water: true,
      electricity: true,
      internet: true,
      garden: true,
      security: true,
      pool: true,
      gym: true,
      balcony: true,
    },
    media: {
      images: [
        '/images/Dream house.jpg',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      ],
      video: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-house-exterior-at-night-1563-preview.mp4',
    },
    analytics: {
      views: 2847,
      saves: 156,
      popularity: 92,
    },
    verified: true,
    agent: agents[0],
    description: 'Stunning modern luxury estate in prestigious Oakmont with panoramic city views. Features state-of-the-art smart home technology, resort-style pool, and private theater room.',
    priceHistory: [
      { date: '2024-01-01', price: 2400000 },
      { date: '2024-02-01', price: 2450000 },
      { date: '2024-03-01', price: 2500000 },
    ],
  },
  {
    id: 'prop-2',
    title: 'Contemporary Downtown Penthouse',
    price: 1850000,
    location: {
      address: '555 Downtown Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      lat: 40.7128,
      lng: -74.0060,
    },
    area: 4200,
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    builtYear: 2022,
    facing: 'north',
    roadAccess: 'Direct building access',
    amenities: {
      parking: true,
      water: true,
      electricity: true,
      internet: true,
      garden: false,
      security: true,
      gym: true,
      balcony: true,
    },
    media: {
      images: [
        '/images/Tour the Most Unique Angular Mansion Ever Created! 🧩.jpg',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&h=800&fit=crop',
      ],
      video: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-view-34676-preview.mp4',
    },
    analytics: {
      views: 1923,
      saves: 124,
      popularity: 88,
    },
    verified: true,
    agent: agents[1],
    description: 'Spectacular penthouse with floor-to-ceiling windows overlooking Manhattan skyline. Premium finishes, chef\'s kitchen, and spa-like bathrooms.',
    priceHistory: [
      { date: '2024-01-01', price: 1750000 },
      { date: '2024-02-01', price: 1800000 },
      { date: '2024-03-01', price: 1850000 },
    ],
  },
  {
    id: 'prop-3',
    title: 'Suburban Family Home',
    price: 650000,
    location: {
      address: '789 Maple Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78704',
      lat: 30.2672,
      lng: -97.7431,
    },
    area: 3200,
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    builtYear: 2015,
    facing: 'east',
    roadAccess: 'Quiet residential street',
    amenities: {
      parking: true,
      water: true,
      electricity: true,
      internet: true,
      garden: true,
      security: false,
      pool: false,
      balcony: true,
    },
    media: {
      images: [
        '/images/This Multi-Level LED Mansion Is Pure Architectural Brilliance.jpg',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop',
      ],
      video: 'https://assets.mixkit.co/videos/preview/mixkit-cozy-house-in-the-suburbs-12502-preview.mp4',
    },
    analytics: {
      views: 1456,
      saves: 89,
      popularity: 75,
    },
    verified: true,
    agent: agents[2],
    description: 'Beautiful family home in established neighborhood with excellent schools. Recently updated kitchen and master suite.',
    priceHistory: [
      { date: '2024-01-01', price: 620000 },
      { date: '2024-02-01', price: 635000 },
      { date: '2024-03-01', price: 650000 },
    ],
  },
  {
    id: 'prop-4',
    title: 'The Obsidian Estate',
    price: 4500000,
    location: {
      address: '902 Bel Air Rd',
      city: 'Bel Air',
      state: 'CA',
      zipCode: '90077',
      lat: 34.0837,
      lng: -118.4468,
    },
    area: 12000,
    type: 'house',
    bedrooms: 6,
    bathrooms: 8,
    floors: 3,
    builtYear: 2023,
    facing: 'south',
    roadAccess: 'Gated private estate',
    amenities: {
      parking: true,
      water: true,
      electricity: true,
      internet: true,
      garden: true,
      security: true,
      pool: true,
      gym: true,
      balcony: true,
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop',
      ],
      video: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-villa-with-swimming-pool-and-palm-trees-1520-preview.mp4',
    },
    analytics: {
      views: 5240,
      saves: 432,
      popularity: 98,
    },
    verified: true,
    agent: agents[3],
    description: 'A cinematic masterpiece of architecture. The Obsidian Estate features dark-themed minimalist design with floor-to-ceiling glass and panoramic canyon views.',
    priceHistory: [
      { date: '2024-01-01', price: 4200000 },
      { date: '2024-02-01', price: 4350000 },
      { date: '2024-03-01', price: 4500000 },
    ],
  },
  {
    id: 'prop-5',
    title: 'The Glass Pavilion',
    price: 3250000,
    location: {
      address: '456 Innovation Way',
      city: 'Aspen',
      state: 'CO',
      zipCode: '81611',
      lat: 39.1911,
      lng: -106.8175,
    },
    area: 6500,
    type: 'house',
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    builtYear: 2024,
    facing: 'north',
    roadAccess: 'Mountain view access',
    amenities: {
      parking: true,
      water: true,
      electricity: true,
      internet: true,
      garden: true,
      security: true,
      pool: true,
      gym: true,
      balcony: true,
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1512914890251-2f96a9b09293?w=1200&h=800&fit=crop',
      ],
      video: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-with-large-windows-4433-preview.mp4',
    },
    analytics: {
      views: 2890,
      saves: 165,
      popularity: 89,
    },
    verified: true,
    agent: agents[0],
    description: 'Ultra-modern glass pavilion tucked away in the mountains. High-tech smart home features combined with raw architectural beauty.',
    priceHistory: [
      { date: '2024-01-01', price: 3000000 },
      { date: '2024-02-01', price: 3125000 },
      { date: '2024-03-01', price: 3250000 },
    ],
  },
  {
    id: 'prop-6',
    title: 'Midnight Architectural Marvel',
    price: 5950000,
    location: {
      address: '234 Azabu-juban',
      city: 'Minato City',
      state: 'Tokyo',
      zipCode: '106-0045',
      lat: 35.6548,
      lng: 139.7328,
    },
    area: 8400,
    type: 'house',
    bedrooms: 5,
    bathrooms: 6,
    floors: 4,
    builtYear: 2024,
    facing: 'south',
    roadAccess: 'High-end residential district',
    amenities: {
      parking: true,
      water: true,
      electricity: true,
      internet: true,
      garden: true,
      security: true,
      pool: true,
      gym: true,
      balcony: true,
    },
    media: {
      images: [
        '/images/Insane Modern Mansion with Nighttime Luxury Aesthetic.jpg',
        'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?w=1200&h=800&fit=crop',
      ],
      video: 'https://assets.mixkit.co/videos/preview/mixkit-night-view-of-a-modern-house-exterior-32496-preview.mp4',
    },
    analytics: {
      views: 4120,
      saves: 287,
      popularity: 94,
    },
    verified: true,
    agent: agents[2],
    description: 'A structural masterpiece featuring sharp angles and dark textures. This Tokyo estate offers unprecedented luxury and privacy in the heart of the city.',
    priceHistory: [
      { date: '2024-01-01', price: 5500000 },
      { date: '2024-02-01', price: 5750000 },
      { date: '2024-03-01', price: 5950000 },
    ],
  },
];

/**
 * Simulate API calls with realistic delays
 */
export const propertyApi = {
  async getProperties(filters?: {
    type?: string;
    priceMin?: number;
    priceMax?: number;
    bedrooms?: number;
    bathrooms?: number;
    city?: string;
    verified?: boolean;
    sortBy?: string;
  }): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let results = [...mockProperties];

    if (filters) {
      if (filters.type && filters.type !== '') {
        results = results.filter(p => p.type === filters.type);
      }
      if (filters.priceMin !== undefined) {
        results = results.filter(p => p.price >= filters.priceMin!);
      }
      if (filters.priceMax !== undefined) {
        results = results.filter(p => p.price <= filters.priceMax!);
      }
      if (filters.bedrooms) {
        results = results.filter(p => p.bedrooms >= filters.bedrooms!);
      }
      if (filters.bathrooms) {
        results = results.filter(p => p.bathrooms >= filters.bathrooms!);
      }
      if (filters.city) {
        results = results.filter(p =>
          p.location.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }
      if (filters.verified) {
        results = results.filter(p => p.verified === true);
      }

      // Sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-low':
            results = results.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            results = results.sort((a, b) => b.price - a.price);
            break;
          case 'popular':
            results = results.sort((a, b) => b.analytics.popularity - a.analytics.popularity);
            break;
          case 'newest':
          default:
            // Assuming prop-1, prop-2 etc are in order of newest
            results = results.sort((a, b) => b.id.localeCompare(a.id));
            break;
        }
      }
    }

    return results;
  },

  async getPropertyById(id: string): Promise<Property | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockProperties.find(p => p.id === id) || null;
  },

  async getSimilarProperties(propertyId: string, count: number = 3): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, 250));
    const property = mockProperties.find(p => p.id === propertyId);
    if (!property) return [];

    return mockProperties
      .filter(p => p.id !== propertyId && p.type === property.type)
      .slice(0, count);
  },

  async getFeaturedProperties(): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockProperties.slice(0, 4);
  },

  async getMarketStats() {
    await new Promise(resolve => setTimeout(resolve, 150));
    return {
      totalListings: mockProperties.length,
      avgPrice: Math.round(
        mockProperties.reduce((sum, p) => sum + p.price, 0) / mockProperties.length
      ),
      soldThisMonth: 12,
      avgDaysOnMarket: 28,
    };
  },
};

export const mockPopularVideos: PopularVideo[] = [
  {
    id: 'vid-1',
    videoUrl: '/videos/short-10.mp4',
    title: 'European Classic Estate',
    location: 'Paris, France',
    tags: ['Classic', 'Europe', 'Art'],
    likes: 2900
  },
  {
    id: 'vid-2',
    videoUrl: '/videos/short-2.mp4',
    title: 'Modern Glass House',
    location: 'Beverly Hills, CA',
    tags: ['Modern', 'Design', 'Glass'],
    likes: 2100
  },
  {
    id: 'vid-3',
    videoUrl: '/videos/short-3.mp4',
    title: 'Infinity Pool Oasis',
    location: 'Malibu, CA',
    tags: ['Pool', 'View', 'Sunset'],
    likes: 4850
  },
  {
    id: 'vid-4',
    videoUrl: '/videos/short-4.mp4',
    title: 'Minimalist Penthouse',
    location: 'Miami, FL',
    tags: ['Minimalist', 'City', 'Penthouse'],
    likes: 1560
  },
  {
    id: 'vid-5',
    videoUrl: '/videos/short-5.mp4',
    title: 'Forest Retreat',
    location: 'Portland, OR',
    tags: ['Nature', 'Wood', 'Quiet'],
    likes: 920
  },
  {
    id: 'vid-6',
    videoUrl: '/videos/short-6.mp4',
    title: 'Lakeside Mansion',
    location: 'Lake Como, Italy',
    tags: ['Lake', 'Mansion', 'Classic'],
    likes: 5600
  },
  {
    id: 'vid-7',
    videoUrl: '/videos/short-7.mp4',
    title: 'Golden Hour Estate',
    location: 'Santorini, Greece',
    tags: ['Greece', 'Sunset', 'Villa'],
    likes: 2800
  },
  {
    id: 'vid-8',
    videoUrl: '/videos/short-8.mp4',
    title: 'Ultra-Modern Smart Villa',
    location: 'Dubai, UAE',
    tags: ['Smart Home', 'Dubai', 'Futuristic'],
    likes: 4100
  },
  {
    id: 'vid-9',
    videoUrl: '/videos/short-9.mp4',
    title: 'Tropical Paradise',
    location: 'Phuket, Thailand',
    tags: ['Tropical', 'BeachFront', 'Luxury'],
    likes: 3850
  },
  {
    id: 'vid-10',
    videoUrl: '/videos/short-1.mp4',
    title: 'Roman Luxury Villa',
    location: 'Rome, Italy',
    tags: ['Luxury', 'Italy', 'Historic'],
    likes: 3420
  }
];
