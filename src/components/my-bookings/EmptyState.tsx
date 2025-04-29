'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">{t('myBookingsPage.noBookingsFound')}</h3>
      <p className="mt-1 text-gray-500">{t('myBookingsPage.noBookingsDescription')}</p>
      <div className="mt-6">
        <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700">
          {t('myBookingsPage.bookAService')}
        </Link>
      </div>
    </div>
  );
};

export default EmptyState; 