import React from 'react';
import { getCategoriesFromNotion } from '@/lib/notion';
import CategoryNav from '@/components/CategoryNav';
import SiteCard from '@/components/SiteCard';

export default async function Home() {
  const categories = await getCategoriesFromNotion();
  
  return (
    <main className="container mx-auto px-4">
      <CategoryNav categories={categories} />
      
      {categories.map((category) => (
        <section key={category.title} id={category.title} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.sites.map((site) => (
              <SiteCard key={site.url} site={site} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
} 