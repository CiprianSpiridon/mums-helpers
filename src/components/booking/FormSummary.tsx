'use client';

import React, { useState } from 'react';
// Remove unused label imports
// import { SERVICE_LABELS, PROPERTY_LABELS } from '../../config/pricingConfig'; 
import { useBookingContext } from '@/context/BookingContext';
import { useTranslation } from '@/hooks/useTranslation';
// Import formatters
import { 
  getServiceTranslationKey, 
  getPropertyTranslationKey, 
  formatDate, 
  formatTime 
} from '@/lib/formatters';

interface FormSummaryProps {
  isCollapsible?: boolean;
}

const FormSummary: React.FC<FormSummaryProps> = ({ isCollapsible = true }) => {
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
    totalCost
  } = state;
  
  const [isExpanded, setIsExpanded] = useState(!isCollapsible);

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden w-full sm:w-auto mb-4 sm:mb-0">
      {/* Header */}
      <div 
        className={`flex justify-between items-center p-4 ${isCollapsible ? 'cursor-pointer border-b border-gray-200' : ''}`}
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <h3 className="font-medium text-gray-900">{t('summary')}</h3>
        </div>
        
        {isCollapsible && (
          <button 
            type="button"
            className="text-gray-500 hover:text-gray-700"
            aria-expanded={isExpanded}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        )}
      </div>
      
      {/* Details */}
      {isExpanded && (
        <div className="p-4 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <div className="text-gray-700">{t('confirmationStep.serviceLabel')}</div>
              <div className="font-medium text-gray-900">
                {t(getServiceTranslationKey(serviceType))}
              </div>
            </div>
            
            <div>
              <div className="text-gray-700">{t('confirmationStep.propertyLabel')}</div>
              <div className="font-medium text-gray-900">
                {t(getPropertyTranslationKey(propertyType))}
                {numRooms > 0 ? `, ${numRooms} ${numRooms === 1 ? t('common.room') : t('common.rooms')}` : ''}
              </div>
            </div>
            
            {(bookingDate || bookingTime) && (
              <div>
                <div className="text-gray-700">{t('confirmationStep.dateTimeLabel')}</div>
                <div className="font-medium text-gray-900">
                  {formatDate(bookingDate)}{bookingDate && bookingTime ? ', ' : ''}{formatTime(bookingTime)}
                </div>
              </div>
            )}
            
            {duration > 0 && (
              <div>
                <div className="text-gray-700">{t('confirmationStep.durationLabel')}</div>
                <div className="font-medium text-gray-900">{duration} {t('scheduleStep.hours')}</div>
              </div>
            )}
          </div>
          
          {address && (
             <div className="pt-2">
               <div className="text-gray-700">{t('confirmationStep.addressLabel')}</div>
               <div className="font-medium text-gray-900">{address}</div>
             </div>
          )}
          
          <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-center">
            <div className="text-gray-900 font-medium">{t('totalCost')}</div>
            <div className="text-lg font-bold text-pink-600">{t('aed')} {totalCost}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSummary; 