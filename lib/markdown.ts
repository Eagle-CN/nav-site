import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Category, Site } from '@/types';

const contentDirectory = join(process.cwd(), 'content');

export async function getAllCategories(): Promise<Category[]> {
  const fileNames = readdirSync(contentDirectory);
  
  const categories = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = join(contentDirectory, fileName);
      const fileContents = readFileSync(fullPath, 'utf8');
      
      const { data, content } = matter(fileContents);
      
      // 解析markdown内容为站点数据
      const sites = content
        .split('-')
        .filter(Boolean)
        .map(site => {
          const lines = site.trim().split('\n');
          const siteData: Partial<Site> = {};
          
          lines.forEach(line => {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key && value) {
              siteData[key as keyof Site] = value;
            }
          });
          
          return siteData as Site;
        });
        
      return {
        ...data,
        sites,
      } as Category;
    })
  );
  
  return categories.sort((a, b) => a.order - b.order);
} 