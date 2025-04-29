'use client';

import React from 'react';
import { SERVICE_LABELS, PROPERTY_LABELS } from '@/config/pricingConfig';
import { useBookingContext } from '@/context/BookingContext';

interface ConfirmationStepProps {
  onReset: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ onReset }) => {
  const { state } = useBookingContext();
  const {
    serviceType,
    propertyType,
    numRooms,
    bookingDate,
    bookingTime,
    duration,
    address,
    name,
    totalCost,
  } = state;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString('en-AE', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        });
    } catch (error) {
        console.error("Error formatting date:", dateString, error);
        return 'Invalid Date';
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'Not set';
    const parts = timeString.split(':');
    if (parts.length !== 2 || isNaN(parseInt(parts[0])) || isNaN(parseInt(parts[1]))) {
        return 'Invalid Time';
    }
    const hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="bg-green-100 p-4 rounded-full mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
        <p className="text-gray-600 mt-2">
          Thank you {name ? `, ${name}` : ''}! Your booking is confirmed.
          A confirmation has been sent to your email.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 text-left">
          Booking Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Service:</span>
            <span className="font-semibold text-right text-gray-900">
              {SERVICE_LABELS[serviceType as keyof typeof SERVICE_LABELS] || serviceType}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Property:</span>
            <span className="font-semibold text-right text-gray-900">
              {(PROPERTY_LABELS[propertyType as keyof typeof PROPERTY_LABELS] || propertyType)}
              {numRooms > 0 ? `, ${numRooms} room${numRooms !== 1 ? 's' : ''}` : ''}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Date & Time:</span>
            <span className="font-semibold text-right text-gray-900">
                 {formatDate(bookingDate)}{bookingDate && bookingTime ? ', ' : ''}{formatTime(bookingTime)}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Duration:</span>
            <span className="font-semibold text-right text-gray-900">{duration} hour{duration !== 1 ? 's' : ''}</span>
          </div>

          {address && (
             <div className="flex justify-between py-2 border-b border-gray-200">
               <span className="text-gray-700 text-left font-medium">Address:</span>
               <span className="font-semibold text-right text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap max-w-[70%]">{address}</span>
             </div>
          )}

          {name && (
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700 text-left font-medium">Name:</span>
              <span className="font-semibold text-right text-gray-900">{name}</span>
            </div>
          )}
          
          <div className="flex justify-between py-3 border-b-0 border-gray-200 bg-pink-50 px-3 rounded-lg mt-4">
            <span className="text-gray-800 font-semibold text-left">Total Cost:</span>
            <span className="font-bold text-right text-pink-600">AED {totalCost}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          Book Another Service
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep; 