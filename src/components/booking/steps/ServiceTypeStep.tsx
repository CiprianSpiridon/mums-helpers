'use client';

import React from 'react';
import { ServiceIcons } from '../BookingIcons';
import { useBookingContext } from '@/context/BookingContext';
import { useTranslation } from '@/hooks/useTranslation';
import StepNavigation from '../StepNavigation';
import DesktopPriceDisplay from '../DesktopPriceDisplay';

interface ServiceTypeStepProps {
  onNext: () => void;
  totalCost: number;
}

const ServiceTypeStep: React.FC<ServiceTypeStepProps> = ({ onNext, totalCost }) => {
  const { state, dispatch } = useBookingContext();
  const { serviceType } = state;
  const { t } = useTranslation();

  const handleServiceTypeChange = (type: string) => {
    dispatch({ type: 'SET_FIELD', field: 'serviceType', value: type });
  };

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t('serviceStep.title')}</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div 
          onClick={() => handleServiceTypeChange('regular')}
          className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            serviceType === 'regular' 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-200 hover:border-pink-200'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`p-3 rounded-full mr-3 ${serviceType === 'regular' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {ServiceIcons.regular} 
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{t('serviceStep.regularCleaning')}</h3>
              <p className="text-gray-600">{t('serviceStep.fromPrice', 120)}</p> 
            </div>
          </div>
          <p className="text-sm text-gray-700 ml-14">{t('serviceStep.regularDescription')}</p>
        </div>

        <div 
          onClick={() => handleServiceTypeChange('deep')}
          className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            serviceType === 'deep' 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-200 hover:border-pink-200'
          }`}
        >
           <div className="flex items-center mb-2">
            <div className={`p-3 rounded-full mr-3 ${serviceType === 'deep' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {ServiceIcons.deep}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{t('serviceStep.deepCleaning')}</h3>
              <p className="text-gray-600">{t('serviceStep.fromPrice', 200)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 ml-14">{t('serviceStep.deepDescription')}</p>
        </div>

        <div 
          onClick={() => handleServiceTypeChange('move')}
          className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            serviceType === 'move' 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-200 hover:border-pink-200'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`p-3 rounded-full mr-3 ${serviceType === 'move' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {ServiceIcons.move}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{t('serviceStep.moveInOutCleaning')}</h3>
              <p className="text-gray-600">{t('serviceStep.fromPrice', 250)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 ml-14">{t('serviceStep.moveDescription')}</p>
        </div>
      </div>

      <DesktopPriceDisplay totalCost={totalCost} />

      <StepNavigation 
        onNext={onNext}
        totalCost={totalCost}
        currentStep={1}
      />
    </div>
  );
};

export default ServiceTypeStep; 