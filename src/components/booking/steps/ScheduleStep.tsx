'use client';

import React, { useState, useEffect } from 'react';
import { FormIcons } from '../BookingIcons';
import { useBookingContext } from '@/context/BookingContext';
import StepNavigation from '../StepNavigation';

// Add totalCost back to props
interface ScheduleStepProps {
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onBlur: (field: string) => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({
  onNext,
  onBack,
  totalCost,
  errors,
  touched,
  onBlur,
}) => {
  // Get state and dispatch from context
  const { state, dispatch } = useBookingContext();
  const { bookingDate, bookingTime, duration } = state; // Destructure needed state

  // Keep local state for time slots if needed for original UI
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
   
  // Generate time slots - Original logic
  useEffect(() => {
    const slots = [];
    const startHour = 8; // 8 AM
    const endHour = 20; // 8 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    setTimeSlots(slots);
  }, []);

  // Update state using dispatch
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_FIELD', field: 'bookingDate', value: e.target.value });
  };

  const handleTimeChange = (time: string) => {
    dispatch({ type: 'SET_FIELD', field: 'bookingTime', value: time });
  };

  const handleDurationChange = (value: number) => {
    const newDuration = Math.max(2, value);
    dispatch({ type: 'SET_FIELD', field: 'duration', value: newDuration });
  };

  // Format date/time for display - Original logic
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Add error handling? For now, assume valid date from input
    return date.toLocaleDateString('en-AE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };
   
  const formatTimeDisplay = (timeString: string) => {
    if (!timeString) return '';
    const parts = timeString.split(':');
    if (parts.length !== 2) return timeString; // Basic fallback
    const hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
   
  // Get min/max date - Original logic
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Schedule Your Cleaning</h2>
      <p className="text-gray-600 mb-6">Select a convenient date and time for your service.</p>
      
      {/* Date Selection - Original Structure */}
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
            onChange={handleDateChange}
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
      
      {/* Time Slots - Original Structure */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Preferred Time <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleTimeChange(time)}
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
      
      {/* Duration - Original Structure */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Service Duration
        </label>
        <div className="flex items-center space-x-1 mb-2">
          {[2, 3, 4, 5, 6].map((hours) => (
            <button
              key={hours}
              type="button"
              onClick={() => handleDurationChange(hours)}
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
      </div>
      
      {/* Price Display - Original Structure */}
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mt-8 md:block hidden">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900">Estimated Cost</h3>
            <p className="text-xs text-gray-600">Based on your selections</p>
          </div>
          <div className="text-xl font-bold text-pink-600">AED {totalCost}</div>
        </div>
      </div>

      {/* Use StepNavigation Component */}
      <StepNavigation 
        onNext={onNext}
        onBack={onBack}
        totalCost={totalCost}
        currentStep={3}
      />
    </div>
  );
};

export default ScheduleStep; 