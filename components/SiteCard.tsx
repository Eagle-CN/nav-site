import React from 'react';
import { Site } from '@/types';
import Image from 'next/image';

export default function SiteCard({ site }: { site: Site }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer" 
      className="block p-4 rounded-lg border hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 relative">
          <Image
            src={`/icons/${site.icon}`}
            alt={site.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-medium">{site.name}</h3>
          <p className="text-sm text-gray-500">{site.description}</p>
        </div>
      </div>
    </a>
  );
} 