'use client';
import React from 'react';
import { Category } from '@/types';

export default function CategoryNav({ categories }: { categories: Category[] }) {
  return (
    <nav className="sticky top-0 bg-white shadow-md py-4 mb-8">
      <ul className="flex space-x-4 overflow-x-auto">
        {categories.map((category) => (
          <li key={category.title}>
            <a
              href={`#${category.title}`}
              className="text-gray-600 hover:text-gray-900"
            >
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 