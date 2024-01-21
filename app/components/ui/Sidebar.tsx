'use client';

import React from 'react';
import { siteConfig } from '@/app/config';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Next.js 13 hook

export default function Sidebar() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <aside className='md:w-1/5 p-4 flex md:block'>
      <nav className='hidden md:block'>
        {siteConfig.map((site, index) => (
          <ul key={index} className='list-none p-0'>
            {/* Use Link and apply styles conditionally */}
            <Link
              href={site.path}
              key={site.path}
              className={`font-medium mt-2 cursor-pointer flex items-center gap-2 ${
                pathname === site.path
                  ? 'text-[#DADCDF]'
                  : 'text-gray-500 opacity-50' 
              }`}
            >
              {site.name}
            </Link>
          </ul>
        ))}
      </nav>
    </aside>
  );
}
