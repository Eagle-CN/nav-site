import { readFileSync } from 'fs';
import { join } from 'path';
import { Category } from '@/types';

const dataFile = join(process.cwd(), 'data', 'categories.json');

export async function getAllCategories(): Promise<Category[]> {
  const fileContents = readFileSync(dataFile, 'utf8');
  const data = JSON.parse(fileContents);
  
  return data.categories.sort((a: Category, b: Category) => a.order - b.order);
} 