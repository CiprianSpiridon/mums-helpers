'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguageContext } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { FormIcons } from './booking/BookingIcons';

const Header = () => {
  const { dispatch } = useLanguageContext();
  const { currentLanguage } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    dispatch({ type: 'SET_LANGUAGE', language: nextLanguage });
  };

  return (
    <header className="bg-white shadow-md py-4 px-4 sm:px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
             MumzHelpers
           </span>
        </Link>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link 
             href="/my-bookings" 
             title="My Bookings"
             className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
           >
             {FormIcons.date} 
           </Link>
           
          <button
            onClick={toggleLanguage}
            title="Switch Language" 
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors flex items-center space-x-1"
          >
            {FormIcons.globe} 
            <span className="text-xs font-semibold">
              {currentLanguage === 'en' ? 'AR' : 'EN'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 