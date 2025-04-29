'use client';

import React from 'react';
// Remove unused Link import
// import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { getServiceTranslationKey } from '@/lib/formatters';

// Define and export the status type
export type BookingStatus = 'scheduled' | 'completed' | 'cancelled' | 'all'; // Add 'all' if used for filtering

// Define and export the structure of a booking and maid object
export interface Maid {
  name: string;
  rating: number;
  image?: string; // Optional image
}

export interface Booking {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  duration: number;
  address: string;
  status: BookingStatus;
  price: number;
  maid: Maid;
}

interface BookingCardProps {
  booking: Booking;
  getStatusBadge: (status: string) => React.ReactNode; // Pass badge renderer as prop
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, getStatusBadge }) => {
  const { t } = useTranslation();

  // Reusable date/time formatting (could also be moved to formatters.ts)
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { 
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
      if (!timeString) return 'N/A';
      const parts = timeString.split(':');
      if (parts.length !== 2) return timeString;
      const hours = parseInt(parts[0], 10);
      const minutes = parts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.padStart(2, '0')} ${ampm}`;
  };

  return (
    <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Card Header */}
      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t(getServiceTranslationKey(booking.serviceType))}</h3>
          <p className="text-sm text-gray-500">{t('myBookingsPage.bookingId')}: {booking.id}</p>
        </div>
        <div className="mt-2 sm:mt-0">
          {getStatusBadge(booking.status)}
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date & Time Info */}
          <div>
            <p className="text-sm font-medium text-gray-500">{t('myBookingsPage.dateTime')}</p>
            <p className="text-base text-gray-900">
              {formatDate(booking.date)}
              <span className="ml-2">at {formatTime(booking.time)}</span>
            </p>
            <p className="text-sm text-gray-700 mt-1">{t('myBookingsPage.duration')}: {booking.duration} {t('scheduleStep.hours')}</p>
          </div>
          
          {/* Location Info */}
          <div>
            <p className="text-sm font-medium text-gray-500">{t('myBookingsPage.location')}</p>
            <p className="text-base text-gray-900">{booking.address}</p>
          </div>
          
          {/* Maid Info */}
          <div>
            <p className="text-sm font-medium text-gray-500">{t('myBookingsPage.maid')}</p>
            <div className="flex items-center mt-1">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden mr-2">
                {booking.maid.image ? (
                    <img src={booking.maid.image} alt={booking.maid.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                )}
              </div>
              <div>
                <p className="text-base text-gray-900">{booking.maid.name}</p>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-700 ml-1">{booking.maid.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
        <div>
          <p className="text-sm font-medium text-gray-500">{t('myBookingsPage.price')}</p>
          <p className="text-xl font-bold text-gray-900">{t('aed')} {booking.price}</p>
        </div>
        
        <div className="flex space-x-2">
          {booking.status === 'scheduled' && (
            <>
              <button className="px-3 py-2 text-sm font-medium text-pink-700 hover:bg-pink-50 rounded-lg transition-colors">
                {t('myBookingsPage.reschedule')}
              </button>
              <button className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                {t('myBookingsPage.cancel')}
              </button>
            </>
          )}
          <button className="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors">
            {booking.status === 'completed' ? t('myBookingsPage.bookAgain') : t('myBookingsPage.viewDetails')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard; 