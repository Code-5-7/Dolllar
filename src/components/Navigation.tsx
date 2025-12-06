'use client';

import React from 'react';
import Link from 'next/link';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            WriteGigs
          </Link>
          <div className="flex space-x-6">
            <Link href="/courses" className="text-gray-700 hover:text-primary">
              Courses
            </Link>
            <Link href="/gigs" className="text-gray-700 hover:text-primary">
              Gigs
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary">
              Pricing
            </Link>
            <Link href="/auth/login" className="text-gray-700 hover:text-primary">
              Login
            </Link>
            <Link href="/auth/register" className="bg-primary text-white px-4 py-2 rounded">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
