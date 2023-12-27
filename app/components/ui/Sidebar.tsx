import React from 'react';
import { siteConfig } from '@/app/config';
import { ChevronLeft, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className='md:w-1/5 p-4 flex md:block'>
      <div className='text-white md:hidden'>
        <ChevronLeft className='w-6 h-6' />
      </div>

      <nav className='hidden md:block'>
        {siteConfig.map((site, index) => (
          <ul key={index}>
            <Link
              href={site.path}
              className='text-gray-500 font-medium dark:text-slate-400 dark:hover:text-white hover:text-black mt-2 cursor-pointer flex items-center gap-2'
            >
              {site.name}
            </Link>
          </ul>
        ))}
      </nav>
    </aside>
  );
}
