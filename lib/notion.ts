import { Category, Site } from '@/types';
import { cache } from 'react';

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export const getNavigationData = cache(async () => {
  try {
    // 使用splitbee的公共API
    const response = await fetch(
      `https://notion-api.splitbee.io/v1/table/${NOTION_DATABASE_ID}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Notion');
    }

    const data = await response.json();
    
    // 按分类分组
    const groupedData = data.reduce((acc: { [key: string]: any[] }, item: any) => {
      const category = item.Category || '未分类';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    // 转换为分类数组
    const categories: Category[] = Object.entries(groupedData).map(([title, items], index) => {
      const sites: Site[] = items.map((item: any) => ({
        id: item.id || String(Math.random()),
        name: item.Name || '',
        description: item.Description || '',
        url: item.URL || '',
        icon: item.Icon || '/icons/default.svg',
        order: item.Order || 0,
      }));

      return {
        id: `category-${index}`,
        name: title,
        description: items[0]?.CategoryDescription || '',
        order: items[0]?.CategoryOrder || index,
        sites: sites.sort((a, b) => a.order - b.order),
      };
    });

    return categories.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    return [];
  }
}); 