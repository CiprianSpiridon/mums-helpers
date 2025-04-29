'use client';

import React, { useCallback } from 'react';
// import { FormIcons } from '../BookingIcons';
import AddressMapSelector from '../AddressMapSelector';
import { useBookingContext } from '@/context/BookingContext';
import { useTranslation } from '@/hooks/useTranslation';
import StepNavigation from '../StepNavigation';
import DesktopPriceDisplay from '../DesktopPriceDisplay';

interface LocationStepProps {
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
  onAddressSelect: (address: string, lat?: number, lng?: number) => void;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onBlur: (field: string) => void;
}

const LocationStep: React.FC<LocationStepProps> = ({
  onNext,
  onBack,
  totalCost,
  onAddressSelect,
  errors,
  touched,
  onBlur,
}) => {
  const { state, dispatch } = useBookingContext();
  const { address, instructions, latitude, longitude } = state;
  const { t } = useTranslation();

  const handleAddressChange = useCallback((value: string) => {
    dispatch({ type: 'SET_FIELD', field: 'address', value });
  }, [dispatch]);

  const handleInstructionsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_FIELD', field: 'instructions', value: e.target.value });
  }, [dispatch]);

  const handleBlur = useCallback((field: string) => {
    onBlur(field);
  }, [onBlur]);

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{t('locationStep.title')}</h2>
      <p className="text-gray-600 mb-6">{t('locationStep.subtitle')}</p>
      
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          {t('locationStep.addressLabel')} <span className="text-red-500">*</span>
        </label>
        
        <AddressMapSelector
          address={address}
          setAddress={handleAddressChange}
          onAddressSelect={onAddressSelect}
          error={touched.address && errors.address ? t('requiredField') : undefined}
          touched={touched.address}
          onBlur={() => handleBlur('address')}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
      
      <div>
        <label htmlFor="instructions" className="block text-sm font-semibold text-gray-800 mb-2">
          {t('locationStep.instructionsLabel')}
        </label>
        <textarea
          id="instructions"
          rows={4}
          value={instructions}
          onChange={handleInstructionsChange}
          placeholder={t('locationStep.instructionsPlaceholder')}
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
        />
        <p className="text-xs text-gray-500 mt-1">
          {t('locationStep.instructionsHelpText')}
        </p>
      </div>
      
      <DesktopPriceDisplay totalCost={totalCost} />

      <StepNavigation 
        onNext={onNext}
        onBack={onBack}
        totalCost={totalCost}
        currentStep={4}
      />
    </div>
  );
};

export default LocationStep; 