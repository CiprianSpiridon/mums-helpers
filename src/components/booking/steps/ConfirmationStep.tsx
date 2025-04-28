import React from 'react';
import { SERVICE_LABELS, PROPERTY_LABELS } from '../../../config/pricingConfig';

interface ConfirmationStepProps {
  serviceType: string;
  propertyType: string;
  numRooms: number;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  address: string;
  name: string;
  totalCost: number;
  onReset: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  serviceType,
  propertyType,
  numRooms,
  bookingDate,
  bookingTime,
  duration,
  address,
  name,
  totalCost,
  onReset,
}) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center mb-8">
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
          Thank you for your booking. A confirmation has been sent to your email.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
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
              {PROPERTY_LABELS[propertyType as keyof typeof PROPERTY_LABELS] || propertyType}, {numRooms} room{numRooms !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Date:</span>
            <span className="font-semibold text-right text-gray-900">{formatDate(bookingDate)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Time:</span>
            <span className="font-semibold text-right text-gray-900">{formatTime(bookingTime)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Duration:</span>
            <span className="font-semibold text-right text-gray-900">{duration} hour{duration !== 1 ? 's' : ''}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Address:</span>
            <span className="font-semibold text-right text-gray-900">{address}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">Name:</span>
            <span className="font-semibold text-right text-gray-900">{name}</span>
          </div>
          
          <div className="flex justify-between py-3 border-b border-gray-200 bg-pink-50 px-3 rounded-lg mt-4">
            <span className="text-gray-800 font-semibold text-left">Total Cost:</span>
            <span className="font-bold text-right text-pink-600">AED {totalCost}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
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