'use client';
import React from 'react';
import { Category } from '@/types';

export default function CategoryNav({ categories }: { categories: Category[] }) {
  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm py-4 mb-8 z-10">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-6 overflow-x-auto">
          {categories.map((category) => (
            <li key={category.title}>
              <a
                href={`#${category.title}`}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap"
              >
                {category.title}
                <span className="ml-2 text-sm text-gray-400">
                  ({category.sites.length})
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
} 