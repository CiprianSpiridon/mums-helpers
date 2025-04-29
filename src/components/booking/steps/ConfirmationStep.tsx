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

interface ConfirmationStepProps {
  onReset: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ onReset }) => {
  const { state } = useBookingContext();
  const { t } = useTranslation();
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
  } = state;

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col items-center mb-8 text-center">
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
        <h2 className="text-2xl font-bold text-gray-900">{t('confirmationStep.title')}</h2>
        <p className="text-gray-600 mt-2">
          {t('confirmationStep.subtitle', name)}
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 text-left">
          {t('confirmationStep.summaryTitle')}
        </h3>
        
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

          {address && (
             <div className="flex justify-between py-2 border-b border-gray-200">
               <span className="text-gray-700 text-left font-medium">{t('confirmationStep.addressLabel')}:</span>
               <span className="font-semibold text-right text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap max-w-[70%]">{address}</span>
             </div>
          )}

          {name && (
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700 text-left font-medium">{t('confirmationStep.nameLabel')}:</span>
              <span className="font-semibold text-right text-gray-900">{name}</span>
            </div>
          )}
          
          <div className="flex justify-between py-3 border-b-0 border-gray-200 bg-pink-50 px-3 rounded-lg mt-4">
            <span className="text-gray-800 font-semibold text-left">{t('confirmationStep.totalCostLabel')}:</span>
            <span className="font-bold text-right text-pink-600">{t('aed')} {totalCost}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          {t('navigation.bookAnother')}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep; 