export interface Site {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
  sites: Site[];
} 