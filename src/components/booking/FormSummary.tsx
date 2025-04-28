import React, { useState } from 'react';
import { SERVICE_LABELS, PROPERTY_LABELS } from '../../config/pricingConfig';

interface FormSummaryProps {
  serviceType: string;
  propertyType: string;
  numRooms: number;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  address: string;
  totalCost: number;
  isCollapsible?: boolean;
}

const FormSummary: React.FC<FormSummaryProps> = ({
  serviceType,
  propertyType,
  numRooms,
  bookingDate,
  bookingTime,
  duration,
  address,
  totalCost,
  isCollapsible = true
}) => {
  const [isExpanded, setIsExpanded] = useState(!isCollapsible);

  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format the time for display
  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div 
        className={`flex justify-between items-center p-4 border-b border-gray-200 ${isCollapsible ? 'cursor-pointer' : ''}`}
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <h3 className="font-medium text-gray-900">Booking Summary</h3>
          <span className="ml-2 text-sm text-gray-600">
            {SERVICE_LABELS[serviceType as keyof typeof SERVICE_LABELS] || serviceType}
          </span>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500">Service</div>
              <div className="font-medium text-gray-900">
                {SERVICE_LABELS[serviceType as keyof typeof SERVICE_LABELS] || serviceType}
              </div>
            </div>
            
            <div>
              <div className="text-gray-500">Property</div>
              <div className="font-medium text-gray-900">
                {PROPERTY_LABELS[propertyType as keyof typeof PROPERTY_LABELS] || propertyType}, {numRooms} room{numRooms !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div>
              <div className="text-gray-500">Date & Time</div>
              <div className="font-medium text-gray-900">
                {formatDate(bookingDate)}, {formatTime(bookingTime)}
              </div>
            </div>
            
            <div>
              <div className="text-gray-500">Duration</div>
              <div className="font-medium text-gray-900">{duration} hour{duration !== 1 ? 's' : ''}</div>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="text-gray-500">Address</div>
            <div className="font-medium text-gray-900">{address}</div>
          </div>
          
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