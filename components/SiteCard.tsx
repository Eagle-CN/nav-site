import React from 'react';
import { Site } from '@/types';
import Image from 'next/image';

export default function SiteCard({ site }: { site: Site }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer" 
      className="block p-4 rounded-lg border hover:shadow-lg transition-shadow bg-white"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 relative flex-shrink-0">
          <Image
            src={`/icons/${site.icon}`}
            alt={site.name}
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{site.name}</h3>
          <p className="text-sm text-gray-500 truncate">{site.description}</p>
        </div>
      </div>
    </a>
  );
} 