export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  responsibilities: string[];
  achievements: string[];
  display_order: number;
  created_at: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  cover_image: string | null;
  tags: string[];
  read_time: number;
  published_at: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  avatar_url: string | null;
  content: string;
  rating: number;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}