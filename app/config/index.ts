import { Home, Camera, Settings, LucideProps } from 'lucide-react';
import React, { ReactElement } from 'react';

interface SiteConfig {
  name: string;
  path: string;
}

export const siteConfig: SiteConfig[] = [
  {
    name: 'Notes',
    path: '/notes',
  },
  {
    name: 'Memories',
    path: '/memories',
  },
  {
    name: 'Settings',
    path: '/settings',
  },
];
