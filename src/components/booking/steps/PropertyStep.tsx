'use client';

import React from 'react';
import { PropertyIcons } from '../BookingIcons';
import { useBookingContext } from '@/context/BookingContext';
import { useTranslation } from '@/hooks/useTranslation';
import StepNavigation from '../StepNavigation';
import DesktopPriceDisplay from '../DesktopPriceDisplay';
import { CLEANING_SUPPLIES_FEE } from '@/config/pricingConfig';

interface PropertyStepProps {
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
}

const PropertyStep: React.FC<PropertyStepProps> = ({ onNext, onBack, totalCost }) => {
  const { state, dispatch } = useBookingContext();
  const { propertyType, numRooms, needsCleaningSupplies } = state;
  const { t, isRtl } = useTranslation();

  const handlePropertyTypeChange = (type: string) => {
    dispatch({ type: 'SET_FIELD', field: 'propertyType', value: type });
  };

  const handleNumRoomsChange = (value: number) => {
    const rooms = Math.max(0, value);
    dispatch({ type: 'SET_FIELD', field: 'numRooms', value: rooms });
  };
  
  const handleCleaningSuppliesChange = () => {
    dispatch({ 
      type: 'SET_FIELD', 
      field: 'needsCleaningSupplies', 
      value: !needsCleaningSupplies 
    });
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{t('propertyStep.title')}</h2>
      <p className="text-gray-600 mb-6">{t('propertyStep.subtitle')}</p>
      
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          {t('propertyStep.propertyTypeLabel')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div 
            onClick={() => handlePropertyTypeChange('house')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              propertyType === 'house' 
                ? 'border-pink-500 bg-pink-50' 
                : 'border-gray-200 hover:border-pink-200'
            }`}
          >
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-full ${isRtl ? 'ml-2' : 'mr-2'} ${propertyType === 'house' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {PropertyIcons.house}
              </div>
              <h3 className="font-semibold text-gray-900">{t('propertyStep.house')}</h3>
            </div>
            <p className={`text-sm text-gray-700 ${isRtl ? 'text-right' : 'text-left'}`}>{t('propertyStep.houseDesc')}</p>
          </div>
          <div 
            onClick={() => handlePropertyTypeChange('flat')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              propertyType === 'flat' 
                ? 'border-pink-500 bg-pink-50' 
                : 'border-gray-200 hover:border-pink-200'
            }`}
          >
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-full ${isRtl ? 'ml-2' : 'mr-2'} ${propertyType === 'flat' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {PropertyIcons.flat}
              </div>
              <h3 className="font-semibold text-gray-900">{t('propertyStep.flat')}</h3>
            </div>
            <p className={`text-sm text-gray-700 ${isRtl ? 'text-right' : 'text-left'}`}>{t('propertyStep.flatDesc')}</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          {t('propertyStep.roomsLabel')}
        </label>
        <div className="flex items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5, '6+'].map((rooms) => (
            <button
              key={rooms}
              type="button"
              onClick={() => handleNumRoomsChange(typeof rooms === 'string' ? 6 : rooms)} 
              className={`flex-1 py-2 border-2 rounded-lg text-sm font-medium transition-colors ${
                (typeof rooms === 'string' && numRooms >= 6) || numRooms === rooms
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'border-gray-300 text-gray-700 hover:border-pink-300'
              }`}
            >
              {rooms}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {t('propertyStep.roomsHelpText')}
        </p>
      </div>
      
      <div>
        <div className="flex items-start mt-6">
          <div className="flex items-center h-5">
            <input
              id="cleaning-supplies"
              type="checkbox"
              checked={needsCleaningSupplies}
              onChange={handleCleaningSuppliesChange}
              className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="cleaning-supplies" className="font-semibold text-gray-800">
              {t('propertyStep.cleaningSuppliesLabel')}
              <span className="ml-2 text-sm font-semibold text-pink-500">
                (+{CLEANING_SUPPLIES_FEE} {t('aed')})
              </span>
            </label>
            <p className="text-gray-600 mt-1">
              {t('propertyStep.cleaningSuppliesDesc')}
            </p>
          </div>
        </div>
      </div>
      
      <DesktopPriceDisplay totalCost={totalCost} />
      
      <StepNavigation 
        onNext={onNext}
        onBack={onBack}
        totalCost={totalCost}
        currentStep={2}
      />
    </div>
  );
};

export default PropertyStep; 