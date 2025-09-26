'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, Home, Play, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  variant?: 'landing' | 'app';
}

export function Navigation({ variant = 'landing' }: NavigationProps) {
  const pathname = usePathname();

  if (variant === 'app') {
    // App navigation for builder pages
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FormBuilder</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors',
                  pathname === '/' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              
              <Link
                href="/builder"
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors',
                  pathname === '/builder' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <Settings className="w-4 h-4" />
                <span>Builder</span>
              </Link>
              
              <Link
                href="/demo"
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors',
                  pathname === '/demo' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <Play className="w-4 h-4" />
                <span>Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Landing page navigation (already included in landing page)
  return null;
}
