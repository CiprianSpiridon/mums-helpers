'use client';

import React, { useState } from 'react';
import { SERVICE_LABELS, PROPERTY_LABELS } from '../../config/pricingConfig';
import { useBookingContext } from '@/context/BookingContext';

interface FormSummaryProps {
  isCollapsible?: boolean;
}

const FormSummary: React.FC<FormSummaryProps> = ({ isCollapsible = true }) => {
  const { state } = useBookingContext();
  const {
    serviceType,
    propertyType,
    numRooms,
    bookingDate,
    bookingTime,
    duration,
    address,
    totalCost
  } = state;
  
  const [isExpanded, setIsExpanded] = useState(!isCollapsible);

  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
          return 'Invalid Date';
      }
      return date.toLocaleDateString('en-AE', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
        console.error("Error formatting date:", dateString, error);
        return 'Invalid Date';
    }
  };

  // Format the time for display
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
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden w-full sm:w-auto mb-4 sm:mb-0">
      {/* Header */}
      <div 
        className={`flex justify-between items-center p-4 ${isCollapsible ? 'cursor-pointer border-b border-gray-200' : ''}`}
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <h3 className="font-medium text-gray-900">Summary</h3>
        </div>
        
        {isCollapsible && (
          <button 
            type="button"
            className="text-gray-500 hover:text-gray-700"
            aria-expanded={isExpanded}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        )}
      </div>
      
      {/* Details */}
      {isExpanded && (
        <div className="p-4 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <div className="text-gray-500">Service</div>
              <div className="font-medium text-gray-900">
                {SERVICE_LABELS[serviceType as keyof typeof SERVICE_LABELS] || serviceType}
              </div>
            </div>
            
            <div>
              <div className="text-gray-500">Property</div>
              <div className="font-medium text-gray-900">
                {(PROPERTY_LABELS[propertyType as keyof typeof PROPERTY_LABELS] || propertyType)}
                {numRooms > 0 ? `, ${numRooms} room${numRooms !== 1 ? 's' : ''}` : ''} 
              </div>
            </div>
            
            {(bookingDate || bookingTime) && (
              <div>
                <div className="text-gray-500">Date & Time</div>
                <div className="font-medium text-gray-900">
                  {formatDate(bookingDate)}{bookingDate && bookingTime ? ', ' : ''}{formatTime(bookingTime)}
                </div>
              </div>
            )}
            
            {duration > 0 && (
              <div>
                <div className="text-gray-500">Duration</div>
                <div className="font-medium text-gray-900">{duration} hour{duration !== 1 ? 's' : ''}</div>
              </div>
            )}
          </div>
          
          {address && (
             <div className="pt-2">
               <div className="text-gray-500">Address</div>
               <div className="font-medium text-gray-900">{address}</div>
             </div>
          )}
          
          <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-center">
            <div className="text-gray-900 font-medium">Total Cost</div>
            <div className="text-lg font-bold text-pink-600">AED {totalCost}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSummary; 