'use client';

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
              MumzMaid
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="#services" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Services
          </Link>
          <Link href="#about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            About
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full transition-colors text-sm font-medium">
            Login / Register
          </button>
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 