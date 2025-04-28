'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
              MumzHelpers
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            Book Now
          </Link>
          <Link href="/my-bookings" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
            My Bookings
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full transition-colors text-sm font-medium">
            Login / Register
          </button>
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              // X icon for close
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon for open
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - outside the flex container for proper full-width display */}
      <div 
        className={`fixed left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ top: '72px' }}
      >
        <nav className="px-6 py-3">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium block py-2 px-4 hover:bg-pink-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/" 
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium block py-2 px-4 hover:bg-pink-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
            <Link 
              href="/my-bookings" 
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium block py-2 px-4 hover:bg-pink-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Bookings
            </Link>
            <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition-colors text-sm font-medium mx-4 my-2">
              Login / Register
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 