'use client';

import React from 'react';
import { FormIcons } from './BookingIcons';
import { useTranslation } from '@/hooks/useTranslation';

interface StepNavigationProps {
  onNext: () => void;
  onBack?: () => void; // Back is optional (e.g., for first step)
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
  currentStep?: number; // To potentially customize labels
  totalCost?: number;   // Needed for mobile view
  isSubmitting?: boolean; // Optional: show loading state on submit button
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  onNext,
  onBack,
  nextLabel,
  backLabel,
  isNextDisabled = false,
  isBackDisabled = false,
  currentStep,
  totalCost,
  isSubmitting = false,
}) => {
  const { t, currentLanguage, isRtl } = useTranslation();

  // Determine final button labels based on step and translations
  const defaultNext = t('navigation.next');
  const defaultBack = t('navigation.back');
  const completeBooking = t('navigation.completeBooking');
  const completeMobile = t('navigation.completeBooking'); // Assuming same for mobile for now
  const processing = t('navigation.processing');

  // Use override labels if provided, otherwise use defaults/step-specific labels
  const finalBackLabel = backLabel || defaultBack;
  const finalNextLabel = nextLabel ? nextLabel :
                         currentStep === 5 ? completeBooking : defaultNext;
  const mobileNextLabel = currentStep === 5 ? completeMobile : (nextLabel || defaultNext);

  // Conditionally select icons based on language direction
  const BackIcon = isRtl ? FormIcons.arrowRight : FormIcons.arrowLeft;
  const NextIcon = isRtl ? FormIcons.arrowLeft : FormIcons.arrowRight;

  // Add margin classes dynamically based on icon direction
  const backIconMargin = isRtl ? "ml-2" : "mr-2"; 
  const nextIconMargin = isRtl ? "mr-2" : "ml-2";
  const mobileBackIconMargin = isRtl ? "ml-2" : "mr-2"; 
  const mobileNextIconMargin = isRtl ? "mr-2" : "ml-2";

  return (
    <>
      {/* Desktop Navigation Buttons */}
      <div className={`justify-between mt-8 md:flex hidden ${!onBack ? 'justify-end' : 'justify-between'}`}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={isBackDisabled}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Use conditional icon and margin */}
            {BackIcon ? React.cloneElement(BackIcon, { className: `${backIconMargin} w-5 h-5` }) : null}
            {finalBackLabel}
          </button>
        )}
        
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled || isSubmitting}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? processing : finalNextLabel}
          {/* Use conditional icon and margin */}
          {!isSubmitting && (NextIcon ? React.cloneElement(NextIcon, { className: `${nextIconMargin} w-5 h-5` }) : null)}
        </button>
      </div>

      {/* Mobile Floating Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        {totalCost !== undefined && (
            <div className="flex justify-between items-center mb-3">
            <div className="flex flex-col justify-center">
                <span className="text-sm text-gray-600">{t('totalCost')}</span>
                <span className="text-xl font-bold text-pink-600">{t('aed')} {totalCost}</span>
            </div>
            </div>
        )}
        
        <div className={`grid gap-3 ${onBack ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={isBackDisabled}
              className="py-3 px-4 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {/* Use conditional icon and margin */} 
              {BackIcon ? React.cloneElement(BackIcon, { className: `${mobileBackIconMargin} w-5 h-5` }) : null}
              <span>{finalBackLabel}</span>
            </button>
          )}
          
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
            className={`py-3 px-4 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${!onBack ? 'col-span-1' : ''}`}
          >
            <span>{isSubmitting ? processing : mobileNextLabel}</span>
             {/* Use conditional icon and margin */} 
             {!isSubmitting && (NextIcon ? React.cloneElement(NextIcon, { className: `${mobileNextIconMargin} w-5 h-5` }) : null)}
          </button>
        </div>
      </div>
    </>
  );
};

export default StepNavigation; 