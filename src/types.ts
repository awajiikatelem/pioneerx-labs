export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & ML' | 'SaaS & Web' | 'Mobile Apps' | 'Enterprise Cloud' | 'Open Source';
  client: string;
  description: string;
  fullDetails: string;
  impactMetrics: { label: string; value: string }[];
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  technologies: string[];
  estimatedDays: string;
  startingPrice?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  badge: string;
  metrics: { label: string; value: string }[];
  features: string[];
  status: 'Live GA' | 'Beta' | 'Early Access';
  demoUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  image: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  quote?: string;
}


export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: 'AI & Engineering' | 'Design Systems' | 'Culture & Vision' | 'Case Study';
  date: string;
  readTime: string;
  image: string;
  url: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'Hackathon' | 'Tech Webinar' | 'Youth Workshop' | 'Product Launch';
  date: string;
  time: string;
  location: string;
  speakerOrHost: string;
  description: string;
  status: 'Upcoming' | 'Past';
  registrationOpen: boolean;
}

export interface CareerRole {
  id: string;
  title: string;
  department: 'Engineering' | 'AI / Data' | 'Product & Design' | 'Operations';
  location: 'Remote (Global)' | 'Hybrid / Onsite';
  type: 'Full-time' | 'Fellowship / Internship' | 'Part-Time';
  description: string;
  requirements: string[];
  responsibilities: string[];
  perks: string[];
}

export type TestimonialStatus = 'pending' | 'approved' | 'rejected';

export interface Testimonial {
  id: string;
  full_name: string;
  name?: string; // helper alias
  email?: string;
  role?: string;
  company?: string;
  review: string;
  quote?: string; // helper alias
  rating: number;
  photo_url?: string | null;
  image?: string; // helper alias
  avatar?: string; // helper alias
  status?: TestimonialStatus;
  permission_granted?: boolean;
  created_at?: string;
  updated_at?: string;
  date?: string;
  highlight?: string;
}


