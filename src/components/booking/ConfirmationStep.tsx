import React from 'react';

interface ConfirmationStepProps {
  serviceType: string;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  propertyType: string;
  numRooms: number;
  name: string;
  onReset: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  serviceType,
  bookingDate,
  bookingTime,
  duration,
  propertyType,
  numRooms,
  name,
  onReset
}) => {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
        <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-6">Your cleaning service has been scheduled. We&apos;ll send you a confirmation email shortly.</p>
      
      {/* Booking Summary */}
      <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-bold text-gray-900 text-left mb-4">Booking Summary</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-gray-700 font-medium text-left">Service:</div>
          <div className="text-right font-semibold text-gray-900">
            {serviceType === 'regular' ? 'Regular Cleaning' : 
             serviceType === 'deep' ? 'Deep Cleaning' : 'Move-in/out Cleaning'}
          </div>
          
          <div className="text-gray-700 font-medium text-left">Property:</div>
          <div className="text-right font-semibold text-gray-900">
            {propertyType === 'house' ? 'House' : 'Flat/Apartment'}, {numRooms === 6 ? '6+' : numRooms} rooms
          </div>
          
          <div className="text-gray-700 font-medium text-left">Date:</div>
          <div className="text-right font-semibold text-gray-900">{bookingDate}</div>
          
          <div className="text-gray-700 font-medium text-left">Time:</div>
          <div className="text-right font-semibold text-gray-900">{bookingTime}</div>
          
          <div className="text-gray-700 font-medium text-left">Duration:</div>
          <div className="text-right font-semibold text-gray-900">{duration} hours</div>
          
          <div className="text-gray-700 font-medium text-left">Name:</div>
          <div className="text-right font-semibold text-gray-900">{name}</div>
        </div>
      </div>
      
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
      >
        Book Another Service
      </button>
    </div>
  );
};

export default ConfirmationStep; 