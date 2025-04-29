'use client';

import React from 'react';
import { PropertyIcons } from '../BookingIcons';
import { useBookingContext } from '@/context/BookingContext';
import StepNavigation from '../StepNavigation';

interface PropertyStepProps {
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
}

const PropertyStep: React.FC<PropertyStepProps> = ({ onNext, onBack, totalCost }) => {
  const { state, dispatch } = useBookingContext();
  const { propertyType, numRooms } = state;

  const handlePropertyTypeChange = (type: string) => {
    dispatch({ type: 'SET_FIELD', field: 'propertyType', value: type });
  };

  const handleNumRoomsChange = (value: number) => {
    const rooms = Math.max(0, value);
    dispatch({ type: 'SET_FIELD', field: 'numRooms', value: rooms });
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Property Details</h2>
      <p className="text-gray-600 mb-6">Tell us about your property to customize your service.</p>
      
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Property Type
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
              <div className={`p-2 rounded-full mr-2 ${propertyType === 'house' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {PropertyIcons.house}
              </div>
              <h3 className="font-semibold text-gray-900">House</h3>
            </div>
            <p className="text-sm text-gray-700">Villa, townhouse or independent home</p>
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
              <div className={`p-2 rounded-full mr-2 ${propertyType === 'flat' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {PropertyIcons.flat}
              </div>
              <h3 className="font-semibold text-gray-900">Flat/Apartment</h3>
            </div>
            <p className="text-sm text-gray-700">Apartment or flat in a building</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          How many bedrooms do you have?
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
          This helps us calculate the time needed for your service
        </p>
      </div>
      
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mt-8 md:block hidden">
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
        currentStep={2}
      />
    </div>
  );
};

export default PropertyStep; 