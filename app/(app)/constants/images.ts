// Template images for the website - using local images
export const TEMPLATE_IMAGES = {
  // Hero/Landing images
  hero: '/images/hero/dog-training-hero.jpeg',
  
  // About page images
  about: {
    trainer: '/images/about/trainer-with-dog.jpeg',
    horse: '/images/about/horse-training.jpeg',
  },
  
  // Service images
  privateSession: '/images/services/private-session.jpeg',
  groupClass: '/images/services/group-class.jpeg',
  workshop: '/images/services/workshop.jpeg',
  
  // Testimonial client photos
  testimonials: [
    '/images/testimonials/client-1.jpg',
    '/images/testimonials/client-2.jpg', 
    '/images/testimonials/client-3.jpg',
    '/images/testimonials/client-4.jpg',
  ],

  // Certification logos
  certifications: {
    abtc: '/images/certifications/abtc-logo.png',
    ccpdt: '/images/certifications/ccpdt-logo.png',
  },
  
  // Default fallbacks
  fallback: '/images/fallbacks/image-placeholder.jpeg',
  avatar: '/images/fallbacks/image-placeholder.jpeg',
} as const;