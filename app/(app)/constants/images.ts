// Template images for the website
export const TEMPLATE_IMAGES = {
  // Hero/Landing images
  hero: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80', // Dog training hero
  
  // About page images
  about: {
    trainer: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80', // Person with dog
    horse: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80', // Horse training
  },
  
  // Service images
  privateSession: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80',
  groupClass: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80',
  workshop: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&q=80',
  
  // Blog images
  blog: {
    puppyTraining: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    dogBehavior: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
    positiveTraining: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80',
  },
  
  // Testimonial placeholders
  testimonials: [
    'https://images.unsplash.com/photo-1494790108755-2616c6e2e6c3?w=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  ],
  
  // Certification logos
  certifications: {
    abtc: 'https://via.placeholder.com/100x100/dc2626/ffffff?text=ABTC',
    aggressive: 'https://via.placeholder.com/100x100/33a8a7/ffffff?text=AD',
  },
  
  // Default fallbacks
  fallback: 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Coming+Soon',
  avatar: 'https://via.placeholder.com/100x100/f3f4f6/9ca3af?text=Photo',
} as const;