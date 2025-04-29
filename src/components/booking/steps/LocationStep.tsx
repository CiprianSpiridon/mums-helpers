'use client';

import React from 'react';
// import { FormIcons } from '../BookingIcons';
import AddressMapSelector from '../AddressMapSelector';
import { useBookingContext } from '@/context/BookingContext';
import StepNavigation from '../StepNavigation';

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
  const { address, instructions } = state;

  const handleAddressChange = (value: string) => {
    dispatch({ type: 'SET_FIELD', field: 'address', value });
  };

  const handleInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_FIELD', field: 'instructions', value: e.target.value });
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Location Details</h2>
      <p className="text-gray-600 mb-6">Let us know where to provide our cleaning service.</p>
      
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Your Address <span className="text-red-500">*</span>
        </label>
        
        <AddressMapSelector
          address={address}
          setAddress={handleAddressChange}
          onAddressSelect={onAddressSelect}
          error={errors.address}
          touched={touched.address}
          onBlur={() => onBlur('address')}
        />
         <p className="text-xs text-gray-500 mt-1">
           Select a location on the map or type your address above
         </p>
      </div>
      
      <div>
        <label htmlFor="instructions" className="block text-sm font-semibold text-gray-800 mb-2">
          Special Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          rows={4}
          value={instructions}
          onChange={handleInstructionsChange}
          placeholder="Any special requests or instructions for our cleaning team? (e.g., entry details, focus areas, etc.)"
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
        />
        <p className="text-xs text-gray-500 mt-1">
          Provide any details that will help our team deliver a better service
        </p>
      </div>
      
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mt-8 hidden md:block">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900">Estimated Cost</h3>
            <p className="text-xs text-gray-600">Based on your selections</p>
          </div>
          <div className="text-xl font-bold text-pink-600">AED {totalCost}</div>
        </div>
      </div>

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