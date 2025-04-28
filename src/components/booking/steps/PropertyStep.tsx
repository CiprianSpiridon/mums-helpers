import React from 'react';
import { PropertyIcons } from '../BookingIcons';

interface PropertyStepProps {
  propertyType: string;
  setPropertyType: (type: string) => void;
  numRooms: number;
  setNumRooms: (rooms: number) => void;
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
}

const PropertyStep: React.FC<PropertyStepProps> = ({
  propertyType,
  setPropertyType,
  numRooms,
  setNumRooms,
  onNext,
  onBack,
  totalCost
}) => {
  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Property Details</h2>
      <p className="text-gray-600 mb-6">Tell us about your property to customize your service.</p>
      
      {/* Property Type Cards */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Property Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div 
            onClick={() => setPropertyType('house')}
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
            onClick={() => setPropertyType('flat')}
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

      {/* Number of Rooms */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          How many bedrooms do you have?
        </label>
        <div className="flex items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5, '6+'].map((rooms) => (
            <button
              key={rooms}
              type="button"
              onClick={() => setNumRooms(typeof rooms === 'string' ? 6 : rooms)}
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
      
      {/* Price Display */}
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mt-8 md:block hidden">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900">Estimated Cost</h3>
            <p className="text-xs text-gray-600">Based on your selections</p>
          </div>
          <div className="text-xl font-bold text-pink-600">AED {totalCost}</div>
        </div>
      </div>

      {/* Desktop Navigation Buttons */}
      <div className="flex justify-between mt-8 md:flex hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          Continue
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Floating Navigation Buttons for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Total Cost</span>
            <span className="text-xl font-bold text-pink-600">AED {totalCost}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            <svg className="inline-block mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button
            type="button"
            onClick={onNext}
            className="py-3 px-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            Continue
            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyStep; 