export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  image: string;
  type: 'sale' | 'rent';
  featured: boolean;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    price: 850000,
    location: "Beverly Hills, CA",
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    description: "Stunning modern villa with panoramic city views, featuring an infinity pool, home theater, and smart home technology throughout.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    type: 'sale',
    featured: true,
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah@mayuk.com"
    }
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    price: 1200000,
    location: "Manhattan, NY",
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    description: "Luxurious penthouse in the heart of Manhattan with floor-to-ceiling windows, private terrace, and premium finishes.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    type: 'sale',
    featured: true,
    agent: {
      name: "Michael Chen",
      phone: "(555) 234-5678",
      email: "michael@mayuk.com"
    }
  },
  {
    id: 3,
    title: "Cozy Family Home",
    price: 450000,
    location: "Austin, TX",
    bedrooms: 4,
    bathrooms: 2,
    area: 2200,
    description: "Beautiful family home in a quiet neighborhood with a spacious backyard, updated kitchen, and close to top-rated schools.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    type: 'sale',
    featured: false,
    agent: {
      name: "Emily Davis",
      phone: "(555) 345-6789",
      email: "emily@mayuk.com"
    }
  },
  {
    id: 4,
    title: "Beachfront Condo",
    price: 650000,
    location: "Miami Beach, FL",
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    description: "Stunning beachfront condo with direct ocean access, modern amenities, and breathtaking sunrise views.",
    image: "https://images.unsplash.com/photo-1512915522629-88d3895d712b?w=800&h=600&fit=crop",
    type: 'sale',
    featured: true,
    agent: {
      name: "David Martinez",
      phone: "(555) 456-7890",
      email: "david@mayuk.com"
    }
  },
  {
    id: 5,
    title: "Urban Loft Apartment",
    price: 3500,
    location: "San Francisco, CA",
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    description: "Trendy loft apartment in SOMA district with exposed brick walls, high ceilings, and industrial-style finishes.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    type: 'rent',
    featured: false,
    agent: {
      name: "Lisa Wong",
      phone: "(555) 567-8901",
      email: "lisa@mayuk.com"
    }
  },
  {
    id: 6,
    title: "Mountain Retreat",
    price: 750000,
    location: "Aspen, CO",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    description: "Perfect mountain getaway with ski-in/ski-out access, stone fireplace, and stunning mountain vistas.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
    type: 'sale',
    featured: true,
    agent: {
      name: "Robert Taylor",
      phone: "(555) 678-9012",
      email: "robert@mayuk.com"
    }
  }
];
