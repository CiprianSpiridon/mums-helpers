import React, { useState, useEffect } from 'react';
import { FormIcons } from '../BookingIcons';

interface ScheduleStepProps {
  bookingDate: string;
  setBookingDate: (date: string) => void;
  bookingTime: string;
  setBookingTime: (time: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onBlur?: (field: string) => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({
  bookingDate,
  setBookingDate,
  bookingTime,
  setBookingTime,
  duration,
  setDuration,
  onNext,
  onBack,
  totalCost,
  errors = {},
  touched = {},
  onBlur = () => {},
}) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  
  // Generate time slots in 30-minute intervals from 8:00 AM to 8:00 PM
  useEffect(() => {
    const slots = [];
    const startHour = 8; // 8 AM
    const endHour = 20; // 8 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Add full hour slot
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      // Add half hour slot
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    setTimeSlots(slots);
  }, []);
  
  // Format date for display
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Format time for display
  const formatTimeDisplay = (timeString: string) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  // Get min date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  // Calculate max date (3 months from now)
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Schedule Your Cleaning</h2>
      <p className="text-gray-600 mb-6">Select a convenient date and time for your service.</p>
      
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Preferred Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            value={bookingDate}
            min={minDate}
            max={maxDateString}
            onChange={(e) => setBookingDate(e.target.value)}
            onBlur={() => onBlur('bookingDate')}
            required
            className={`block w-full pl-10 pr-3 py-3 border ${
              touched.bookingDate && errors.bookingDate 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
            } rounded-lg transition-all duration-200 text-gray-900`}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {FormIcons.date}
          </div>
        </div>
        {touched.bookingDate && errors.bookingDate && (
          <p className="mt-1 text-sm text-red-600">{errors.bookingDate}</p>
        )}
        {bookingDate && (
          <p className="mt-2 text-sm text-gray-600">
            You selected: <span className="font-medium">{formatDateDisplay(bookingDate)}</span>
          </p>
        )}
      </div>
      
      {/* Time Slots */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Preferred Time <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setBookingTime(time)}
              className={`py-2 px-1 border rounded-lg text-sm font-medium transition-colors ${
                bookingTime === time
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'border-gray-300 text-gray-700 hover:border-pink-300'
              }`}
            >
              {formatTimeDisplay(time)}
            </button>
          ))}
        </div>
        {touched.bookingTime && errors.bookingTime && (
          <p className="mt-1 text-sm text-red-600">{errors.bookingTime}</p>
        )}
      </div>
      
      {/* Duration */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Service Duration
        </label>
        <div className="flex items-center space-x-1 mb-2">
          {[2, 3, 4, 5, 6].map((hours) => (
            <button
              key={hours}
              type="button"
              onClick={() => setDuration(hours)}
              className={`flex-1 py-2 border-2 rounded-lg text-sm font-medium transition-colors ${
                duration === hours
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'border-gray-300 text-gray-700 hover:border-pink-300'
              }`}
            >
              {hours} hour{hours !== 1 ? 's' : ''}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          We recommend {propertyTypeRecommendation(duration)} for most homes
        </p>
      </div>
      
      {/* Price Display */}
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mt-8 md:block hidden">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900">Estimated Cost</h3>
            <p className="text-xs text-gray-600">Based on your selections</p>
          </div>
          <div className="text-xl font-bold text-pink-600">AED {totalCost}</div>
        </div>
      </div>

      {/* Desktop Navigation Buttons */}
      <div className="flex justify-between mt-8 md:flex hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          Continue
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Floating Navigation Buttons for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Total Cost</span>
            <span className="text-xl font-bold text-pink-600">AED {totalCost}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            <svg className="inline-block mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button
            type="button"
            onClick={onNext}
            className="py-3 px-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            Continue
            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to provide duration recommendations
const propertyTypeRecommendation = (duration: number): string => {
  switch (duration) {
    case 2:
      return '2 hours for studio or 1-bedroom apartments';
    case 3:
      return '3 hours for 2-bedroom apartments';
    case 4:
      return '4 hours for 3-bedroom homes';
    case 5:
      return '5 hours for 4-bedroom homes';
    case 6:
      return '6 hours for large properties';
    default:
      return `${duration} hours`;
  }
};

export default ScheduleStep; 