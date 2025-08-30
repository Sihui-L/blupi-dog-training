export interface ContactFormData {
  firstName: string;
  lastName: string;
  clientNumber: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  healthCheck: string;
  behaviorIssues: string;
  developmentBehaviors: string;
}

export interface ClassOption {
  id: string;
  title: string;
  price: string;
  description: string;
  duration: string;
  schedule: string[];
  maxParticipants: number;
}
