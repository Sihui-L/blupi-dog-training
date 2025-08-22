export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  type: 'private' | 'group' | 'workshop';
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dogName?: string;
  dogAge?: string;
  dogBreed?: string;
  serviceId: string;
  preferredDate?: string;
  message?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  volunteerNumber?: string;
  email: string;
  phone?: string;
  dogName?: string;
  dogBreed?: string;
  healthCheck?: string;
  behaviorIssues?: string;
  developmentBehaviors?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  featuredImage?: string;
}