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
  const { serviceType, services, servicesLoading } = state;
  const { t, isRtl } = useTranslation();

  const handleServiceTypeChange = (type: string) => {
    dispatch({ type: 'SET_FIELD', field: 'serviceType', value: type });
  };

  if (servicesLoading) {
    return (
      <div className="space-y-6 pb-24 md:pb-0">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('serviceStep.title')}</h2>
        <div className="text-center p-10">Loading services...</div>
        <div className="hidden md:block h-10" /> 
        <div className="h-12" /> 
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t('serviceStep.title')}</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {services.map((service) => {
          const isSelected = serviceType === service.serviceTypeId;
          const IconComponent = ServiceIcons[service.serviceTypeId as keyof typeof ServiceIcons] || ServiceIcons.regular;

          return (
            <div 
              key={service.serviceTypeId}
              onClick={() => handleServiceTypeChange(service.serviceTypeId)}
              className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-200 hover:border-pink-200'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`p-3 rounded-full ${isRtl ? 'ml-3' : 'mr-3'} ${isSelected ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {IconComponent} 
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{service.displayName}</h3>
                  <p className="text-gray-600">{t('serviceStep.fromPrice', service.basePrice)}</p> 
                </div>
              </div>
              {service.description && (
                <p className={`text-sm text-gray-700 ${isRtl ? 'mr-14 text-right' : 'ml-14 text-left'}`}>{service.description}</p>
              )}
            </div>
          );
        })}
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