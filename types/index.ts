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

export interface NotionPage {
  id: string;
  properties: {
    Name: { title: Array<{ plain_text: string }> };
    Description: { rich_text: Array<{ plain_text: string }> };
    URL: { url: string };
    Icon: { files: Array<{ file: { url: string } }> };
    Order: { number: number };
  };
} 