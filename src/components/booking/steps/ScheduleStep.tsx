'use client';

import React, { useState, useEffect } from 'react';
import { FormIcons } from '../BookingIcons';
import { useBookingContext } from '@/context/BookingContext';
import { useTranslation } from '@/hooks/useTranslation';
import StepNavigation from '../StepNavigation';
import FormField from '@/components/ui/FormField';
import DesktopPriceDisplay from '../DesktopPriceDisplay';
import { fetchSlots, SlotDefinition } from '@/lib/strapi';

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
  const { t } = useTranslation(); // Use hook
  const [availableSlots, setAvailableSlots] = useState<SlotDefinition[]>([]); // State for slots
  const [isLoadingSlots, setIsLoadingSlots] = useState(true); // Loading state

  // Fetch slots on component mount
  useEffect(() => {
    const loadSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const allSlots = await fetchSlots();
        // Filter slots between 8 AM (inclusive) and 6 PM (inclusive)
        const filteredSlots = allSlots.filter(slot => 
          slot.startTime >= "08:00:00.000" && slot.startTime <= "18:00:00.000"
        );
        setAvailableSlots(filteredSlots);
      } catch (error) {
        console.error("Error loading slots:", error);
        // Handle error state if necessary
      } finally {
        setIsLoadingSlots(false);
      }
    };
    loadSlots();
  }, []);

  // Update event type to handle both input/textarea/select
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name as ('bookingDate' | 'bookingTime' | 'duration'), value }); // Include duration for consistency
  };

  // Keep duration handler
  const handleDurationChange = (value: number) => {
    const newDuration = Math.max(2, value);
    dispatch({ type: 'SET_FIELD', field: 'duration', value: newDuration });
  };

  // Helper to format time (e.g., "08:00:00.000" -> "08:00")
  const formatTime = (timeString: string) => {
    return timeString ? timeString.substring(0, 5) : '';
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{t('scheduleStep.title')}</h2>
      <p className="text-gray-800 mb-6">{t('scheduleStep.subtitle')}</p>
      
      {/* Use FormField for Date */}
      <FormField
        id="bookingDate"
        label={t('scheduleStep.dateLabel')}
        type="date"
        value={bookingDate}
        onChange={handleFieldChange}
        onBlur={() => onBlur('bookingDate')}
        error={errors.bookingDate ? 'requiredField' : undefined}
        touched={touched.bookingDate}
        required={true}
        icon={FormIcons.date}
      />
      
      {/* Replace Dropdown with Time Slot Buttons */}
      <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
              {t('scheduleStep.timeLabel')} <span className="text-red-500">*</span>
          </label>
          {isLoadingSlots ? (
              <div className="text-center text-gray-500 py-4">{t('scheduleStep.loadingTimes')}</div>
          ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {availableSlots.map((slot) => (
                      <button
                          key={slot.id}
                          type="button"
                          onClick={() => dispatch({ type: 'SET_FIELD', field: 'bookingTime', value: slot.startTime })}
                          onBlur={() => onBlur('bookingTime')} // Trigger validation on blur if needed
                          className={`w-full py-2 border-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-1 ${
                              bookingTime === slot.startTime
                                  ? 'bg-pink-500 text-white border-pink-500'
                                  : 'border-gray-300 text-gray-700 hover:border-pink-400 hover:bg-pink-50'
                          } ${
                            // Optionally disable slots based on future logic (e.g., availability)
                            false ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          // disabled={/* Add logic to disable past or unavailable slots if needed */}
                      >
                          {formatTime(slot.startTime)}
                      </button>
                  ))}
              </div>
          ) : (
              <div className="text-center text-red-500 py-4">{t('scheduleStep.noTimesAvailable')}</div> // Handle case where no slots are returned
          )}
          {/* Display validation error below the grid */}
          {errors.bookingTime && touched.bookingTime && (
              <p className="mt-1 text-xs text-red-500">{t(`errors.${errors.bookingTime}`)}</p>
          )}
      </div>
      
      {/* Duration - Original Structure */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          {t('scheduleStep.durationLabel')}
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
              {hours} {t('scheduleStep.hours')}
            </button>
          ))}
        </div>
      </div>
      
      {/* Replace Price Display JSX */}
      <DesktopPriceDisplay totalCost={totalCost} />

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