import { Category, Site } from '@/types';
import { cache } from 'react';

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export const revalidate = 3600; // 缓存1小时

export const getCategoriesFromNotion = cache(async (): Promise<Category[]> => {
  try {
    // 获取数据库内容
    const response = await fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_DATABASE_ID}`);
    const data = await response.json();
    
    // 将数据按category分组
    const groupedData = data.reduce((acc: { [key: string]: any[] }, item: any) => {
      const category = item.Category || '未分类';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    // 转换为我们需要的格式
    const categories = Object.entries(groupedData).map(([title, items], index) => {
      const sites: Site[] = items.map((item: any) => ({
        name: item.Name || '',
        description: item.Description || '',
        url: item.URL || '',
        icon: item.Icon || '/icons/default.svg',
      }));

      return {
        title,
        description: items[0]?.CategoryDescription || '',
        order: items[0]?.CategoryOrder || index,
        sites,
      };
    });

    return categories.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    return [];
  }
}); 