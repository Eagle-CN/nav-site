export interface Site {
  name: string;
  description: string;
  url: string;
  icon: string;
}

export interface Category {
  title: string;
  description: string;
  order: number;
  sites: Site[];
} 