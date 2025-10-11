import React from 'react';
export type Product = {
  id: string;
  name: string;
  category: 'keychains' | 'lithoframes' | 'lightboxes' | 'lamps' | 'tablelamps' | 'accessories';
  description: string;
  price: number;
  images: string[];
  isCustomizable: boolean;
  weight: number; // in grams
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
};
export const categories = [{
  id: 'keychains',
  name: 'Keychains',
  customizable: true
}, {
  id: 'lithoframes',
  name: 'Lithoframes',
  customizable: true
}, {
  id: 'lightboxes',
  name: 'Lightboxes',
  customizable: true
}, {
  id: 'lamps',
  name: 'Lamps',
  customizable: false
}, {
  id: 'tablelamps',
  name: 'Showcase Side Table Lamps',
  customizable: false
}, {
  id: 'accessories',
  name: 'Accessories',
  customizable: false
}];
export const products: Product[] = [{
  id: '1',
  name: 'Custom Name Keychain',
  category: 'keychains',
  description: 'Personalized keychain with your name or text. Perfect gift for friends and family.',
  price: 299,
  images: ['https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: true,
  weight: 15,
  dimensions: {
    width: 5,
    height: 2,
    depth: 0.5
  },
  material: 'PLA Plastic'
}, {
  id: '2',
  name: 'Geometric Shape Keychain',
  category: 'keychains',
  description: 'Modern geometric design keychain. Minimalist and stylish.',
  price: 249,
  images: ['https://images.unsplash.com/photo-1611235115922-72bd53d27990?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1611235115922-72bd53d27990?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: true,
  weight: 12,
  dimensions: {
    width: 4,
    height: 4,
    depth: 0.5
  },
  material: 'PLA Plastic'
}, {
  id: '3',
  name: 'Family Photo Lithoframe',
  category: 'lithoframes',
  description: 'Turn your favorite family photo into a beautiful 3D printed lithoframe.',
  price: 699,
  images: ['https://images.unsplash.com/photo-1616088886430-caaae4b1af9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1616088886430-caaae4b1af9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: true,
  weight: 120,
  dimensions: {
    width: 15,
    height: 10,
    depth: 0.3
  },
  material: 'White PLA'
}, {
  id: '4',
  name: 'Landscape Lithoframe',
  category: 'lithoframes',
  description: 'Beautiful landscape scene transformed into a 3D printed lithoframe.',
  price: 799,
  images: ['https://images.unsplash.com/photo-1579541591970-e5f6efa5ba87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1579541591970-e5f6efa5ba87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: true,
  weight: 150,
  dimensions: {
    width: 20,
    height: 15,
    depth: 0.3
  },
  material: 'White PLA'
}, {
  id: '5',
  name: 'Custom Photo Lightbox',
  category: 'lightboxes',
  description: 'Illuminated lightbox with your custom photo. Includes LED light strip and USB cable.',
  price: 1499,
  images: ['https://images.unsplash.com/photo-1565344462042-e3c7b9e5e23f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1565344462042-e3c7b9e5e23f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: true,
  weight: 350,
  dimensions: {
    width: 25,
    height: 20,
    depth: 5
  },
  material: 'PLA Plastic with LED'
}, {
  id: '6',
  name: 'Geometric Table Lamp',
  category: 'lamps',
  description: 'Modern geometric design table lamp. Creates beautiful light patterns.',
  price: 1999,
  images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: false,
  weight: 500,
  dimensions: {
    width: 15,
    height: 30,
    depth: 15
  },
  material: 'PLA Plastic with LED'
}, {
  id: '7',
  name: 'Voronoi Pattern Lamp',
  category: 'lamps',
  description: 'Inspired by natural patterns, this lamp creates stunning light and shadow effects.',
  price: 2499,
  images: ['https://images.unsplash.com/photo-1507919909716-c8262e491cde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1507919909716-c8262e491cde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: false,
  weight: 450,
  dimensions: {
    width: 18,
    height: 25,
    depth: 18
  },
  material: 'PLA Plastic with LED'
}, {
  id: '8',
  name: 'Showcase Side Table Lamp',
  category: 'tablelamps',
  description: 'Elegant side table lamp with showcase space for small items or plants.',
  price: 3499,
  images: ['https://images.unsplash.com/photo-1543198126-a4d0ade7cf83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1543198126-a4d0ade7cf83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: false,
  weight: 850,
  dimensions: {
    width: 30,
    height: 45,
    depth: 30
  },
  material: 'PLA Plastic with LED'
}, {
  id: '9',
  name: 'Minimalist Phone Stand',
  category: 'accessories',
  description: 'Simple and elegant phone stand for your desk or bedside table.',
  price: 399,
  images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: false,
  weight: 75,
  dimensions: {
    width: 10,
    height: 12,
    depth: 8
  },
  material: 'PLA Plastic'
}, {
  id: '10',
  name: 'Custom Text Lightbox',
  category: 'lightboxes',
  description: 'Personalized lightbox with your custom text or message. Great for gifts or home decor.',
  price: 1299,
  images: ['https://images.unsplash.com/photo-1618760439048-865c29244c3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1618760439048-865c29244c3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: true,
  weight: 300,
  dimensions: {
    width: 20,
    height: 15,
    depth: 5
  },
  material: 'PLA Plastic with LED'
}, {
  id: '11',
  name: 'Honeycomb Wall Lamp',
  category: 'lamps',
  description: 'Modular honeycomb wall lamp that can be arranged in different patterns.',
  price: 1799,
  images: ['https://images.unsplash.com/photo-1507919909716-c8262e491cde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1507919909716-c8262e491cde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: false,
  weight: 350,
  dimensions: {
    width: 25,
    height: 22,
    depth: 5
  },
  material: 'PLA Plastic with LED'
}, {
  id: '12',
  name: 'Desk Organizer',
  category: 'accessories',
  description: 'Keep your desk tidy with this stylish 3D printed organizer.',
  price: 599,
  images: ['https://images.unsplash.com/photo-1589584649628-b597067e07a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1589584649628-b597067e07a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
  isCustomizable: false,
  weight: 200,
  dimensions: {
    width: 15,
    height: 10,
    depth: 10
  },
  material: 'PLA Plastic'
}];
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return products.filter(p => p.category === product.category && p.id !== productId).slice(0, limit);
};