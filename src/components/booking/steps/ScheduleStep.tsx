'use client';

import React from 'react';
import { FormIcons } from '../BookingIcons';
import { useBookingContext } from '@/context/BookingContext';
import { useTranslation } from '@/hooks/useTranslation';
import StepNavigation from '../StepNavigation';
import FormField from '@/components/ui/FormField';
import DesktopPriceDisplay from '../DesktopPriceDisplay';

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

  // Update event type to handle both input/textarea
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name as ('bookingDate' | 'bookingTime'), value });
  };

  // Keep duration handler
  const handleDurationChange = (value: number) => {
    const newDuration = Math.max(2, value);
    dispatch({ type: 'SET_FIELD', field: 'duration', value: newDuration });
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{t('scheduleStep.title')}</h2>
      <p className="text-gray-600 mb-6">{t('scheduleStep.subtitle')}</p>
      
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
      
      {/* Use FormField for Time */}
       <FormField
        id="bookingTime"
        label={t('scheduleStep.timeLabel')}
        type="time"
        value={bookingTime}
        onChange={handleFieldChange}
        onBlur={() => onBlur('bookingTime')} 
        error={errors.bookingTime ? 'requiredField' : undefined}
        touched={touched.bookingTime}
        required={true}
        icon={FormIcons.time}
      />
      
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