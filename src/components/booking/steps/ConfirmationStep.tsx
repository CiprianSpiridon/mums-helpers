'use client';

import React from 'react';
// Remove unused label imports
// import { SERVICE_LABELS, PROPERTY_LABELS } from '@/config/pricingConfig'; 
import { useBookingContext } from '@/context/BookingContext';
import { useTranslation } from '@/hooks/useTranslation';
// Import formatters
import { 
  getServiceTranslationKey, 
  getPropertyTranslationKey, 
  formatDate, 
  formatTime 
} from '@/lib/formatters';
// Import the CLEANING_SUPPLIES_FEE constant
import { CLEANING_SUPPLIES_FEE } from '@/config/pricingConfig';

// Add translation keys for cleaning supplies
const cleaningSuppliesTranslations = {
  en: {
    label: 'Cleaning Supplies',
    included: 'Included',
    notIncluded: 'Not Included'
  },
  ar: {
    label: 'مواد التنظيف',
    included: 'مشمولة',
    notIncluded: 'غير مشمولة'
  }
};

interface ConfirmationStepProps {
  bookingId: number | null;
  onReset: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ bookingId, onReset }) => {
  const { state } = useBookingContext();
  const { t, currentLanguage } = useTranslation();
  const {
    serviceType,
    propertyType,
    numRooms,
    bookingDate,
    bookingTime,
    duration,
    address,
    name,
    totalCost,
    needsCleaningSupplies
  } = state;

  // Get the correct translations based on the current language
  const suppliesTranslation = currentLanguage === 'ar' 
    ? cleaningSuppliesTranslations.ar 
    : cleaningSuppliesTranslations.en;

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('confirmationStep.title')}</h2>
        <p className="text-gray-600">
          {t('confirmationStep.subtitle', name)}
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 text-left">
          {t('confirmationStep.summaryTitle')}
        </h3>
        
        {/* Display Booking ID if available */}
        {bookingId && (
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">{t('confirmationStep.bookingIdLabel')}:</span>
            <span className="font-semibold text-right text-gray-900">#{bookingId}</span>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">{t('confirmationStep.serviceLabel')}:</span>
            <span className="font-semibold text-right text-gray-900">
              {t(getServiceTranslationKey(serviceType))}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">{t('confirmationStep.propertyLabel')}:</span>
            <span className="font-semibold text-right text-gray-900">
              {t(getPropertyTranslationKey(propertyType))}
              {numRooms > 0 ? `, ${numRooms} ${numRooms === 1 ? t('common.room') : t('common.rooms')}` : ''}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">{t('confirmationStep.dateTimeLabel')}:</span>
            <span className="font-semibold text-right text-gray-900">
                 {formatDate(bookingDate)}{bookingDate && bookingTime ? ', ' : ''}{formatTime(bookingTime)}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">{t('confirmationStep.durationLabel')}:</span>
            <span className="font-semibold text-right text-gray-900">{duration} {t('scheduleStep.hours')}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">{suppliesTranslation.label}:</span>
            <span className="font-semibold text-right text-gray-900">
              {needsCleaningSupplies 
                ? `${suppliesTranslation.included} (+${CLEANING_SUPPLIES_FEE} ${t('aed')})` 
                : suppliesTranslation.notIncluded}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">{t('confirmationStep.addressLabel')}:</span>
            <span className="font-semibold text-right text-gray-900">{address}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 text-left font-medium">{t('confirmationStep.nameLabel')}:</span>
            <span className="font-semibold text-right text-gray-900">{name}</span>
          </div>

          <div className="flex justify-between pt-3">
            <span className="text-gray-900 text-left font-bold">{t('confirmationStep.totalCostLabel')}:</span>
            <span className="font-bold text-xl text-right text-pink-600">{totalCost} {t('aed')}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-3 px-4 text-center bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors"
        >
          {t('navigation.bookAnother')}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep; 