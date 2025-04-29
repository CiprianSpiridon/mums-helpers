'use client';

import React from 'react';
import { FormIcons } from './BookingIcons';

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
  nextLabel = 'Continue',
  backLabel = 'Back',
  isNextDisabled = false,
  isBackDisabled = false,
  currentStep,
  totalCost,
  isSubmitting = false,
}) => {

  // Determine final button labels based on step
  const finalNextLabel = currentStep === 5 ? 'Complete Booking' : nextLabel;
  const mobileNextLabel = currentStep === 5 ? 'Complete' : nextLabel;

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
            {FormIcons?.arrowLeft ? FormIcons.arrowLeft : (
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            )}
            {backLabel}
          </button>
        )}
        
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled || isSubmitting}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : finalNextLabel}
          {!isSubmitting && (FormIcons?.arrowRight ? FormIcons.arrowRight : (
             <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
          ))}
        </button>
      </div>

      {/* Mobile Floating Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        {totalCost !== undefined && (
            <div className="flex justify-between items-center mb-3">
            <div className="flex flex-col justify-center">
                <span className="text-sm text-gray-600">Total Cost</span>       
                <span className="text-xl font-bold text-pink-600">AED {totalCost}</span>
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
              {FormIcons?.arrowLeft ? FormIcons.arrowLeft : (
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              )}
              <span>{backLabel}</span>
            </button>
          )}
          
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
            className={`py-3 px-4 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${!onBack ? 'col-span-1' : ''}`}
          >
            <span>{isSubmitting ? 'Processing...' : mobileNextLabel}</span>
             {!isSubmitting && (FormIcons?.arrowRight ? FormIcons.arrowRight : (
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
             ))}
          </button>
        </div>
      </div>
    </>
  );
};

export default StepNavigation; 