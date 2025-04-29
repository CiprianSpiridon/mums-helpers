'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-6 pt-8 mt-12 border-t border-gray-800">
        <p className="text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} MumzMaid. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 