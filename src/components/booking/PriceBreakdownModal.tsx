'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { getServiceTranslationKey, getPropertyTranslationKey } from '@/lib/formatters';

interface PriceBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  propertyType: string;
  numRooms: number;
  duration: number;
  totalCost: number;
}

const PriceBreakdownModal: React.FC<PriceBreakdownModalProps> = ({
  isOpen,
  onClose,
  serviceType,
  propertyType,
  numRooms,
  duration,
  totalCost,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const basePrice = serviceType === 'regular' ? 120 : serviceType === 'deep' ? 200 : 250;
  const houseSurcharge = propertyType === 'house' ? basePrice * 0.2 : 0;
  const additionalRoomCost = (numRooms > 1) ? (numRooms - 1) * (serviceType === 'regular' ? 25 : serviceType === 'deep' ? 40 : 50) : 0;
  const additionalHourCost = (duration > 2) ? (duration - 2) * (serviceType === 'regular' ? 50 : serviceType === 'deep' ? 70 : 90) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('Price Breakdown', undefined, 'Price Breakdown')}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="border-b pb-3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{t('confirmationStep.serviceLabel')}:</span>
              <span className="font-medium">
                {t(getServiceTranslationKey(serviceType))}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{t('confirmationStep.propertyLabel')}:</span>
              <span className="font-medium">
                {t(getPropertyTranslationKey(propertyType))}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{t('Number of Rooms', undefined, 'Number of Rooms')}:</span>
              <span className="font-medium">{numRooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('confirmationStep.durationLabel')}:</span>
              <span className="font-medium">{duration} {t('scheduleStep.hours')}</span>
            </div>
          </div>
          
          <div className="space-y-2 border-b pb-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t('Base price for {service}', { service: t(getServiceTranslationKey(serviceType)) }, `Base price for ${t(getServiceTranslationKey(serviceType))}`)}</span>
              <span>{t('aed')} {basePrice.toFixed(0)}</span>
            </div>
            
            {propertyType === 'house' && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('House surcharge (20%)', undefined, 'House surcharge (20%)')}</span>
                <span>{t('aed')} {houseSurcharge.toFixed(0)}</span>
              </div>
            )}
            
            {numRooms > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('Additional rooms ({count})', { count: numRooms - 1 }, `Additional rooms (${numRooms - 1})`)}</span>
                <span>{t('aed')} {additionalRoomCost.toFixed(0)}</span>
              </div>
            )}
            
            {duration > 2 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('Additional hours ({count})', { count: duration - 2 }, `Additional hours (${duration - 2})`)}</span>
                <span>{t('aed')} {additionalHourCost.toFixed(0)}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between pt-2">
            <span className="font-semibold text-gray-900">{t('totalCost')}</span>
            <span className="font-bold text-pink-600">{t('aed')} {totalCost}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors duration-200"
          >
            {t('Close', undefined, 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdownModal; 