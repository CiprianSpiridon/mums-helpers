import React from 'react';
import GoogleMapComponent from '../GoogleMapComponent';
import { FormIcons } from '../BookingIcons';

interface LocationStepProps {
  address: string;
  setAddress: (address: string) => void;
  onAddressSelect: (address: string) => void;
  instructions: string;
  setInstructions: (instructions: string) => void;
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onBlur?: (field: string) => void;
}

const LocationStep: React.FC<LocationStepProps> = ({
  address,
  setAddress,
  onAddressSelect,
  instructions,
  setInstructions,
  onNext,
  onBack,
  totalCost,
  errors = {},
  touched = {},
  onBlur = () => {},
}) => {
  // You should create these environment variables in your .env.local file:
  // NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
  // NEXT_PUBLIC_GOOGLE_MAPS_ID=your_map_id_here
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || '';
  
  const handleMapLocationSelected = (selectedAddress: string) => {
    setAddress(selectedAddress);
    onAddressSelect(selectedAddress);
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Location Details</h2>
      <p className="text-gray-600 mb-6">Let us know where to provide our cleaning service.</p>
      
      {/* Address Map Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Your Address <span className="text-red-500">*</span>
        </label>
        
        {/* Google Maps Component */}
        <GoogleMapComponent 
          onSelectLocation={(address) => handleMapLocationSelected(address)}
          apiKey={apiKey}
          mapId={mapId}
        />
        
        {apiKey === '' && (
          <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 mb-2 mt-2">
            <p className="font-semibold">Map configuration required:</p>
            <p className="text-xs mt-1">
              Please configure Google Maps API in your environment variables.
            </p>
          </div>
        )}
        
        <div className="relative mt-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => onBlur('address')}
            placeholder="Enter your address or select from map above"
            required
            className={`block w-full pl-10 pr-3 py-3 border ${
              touched.address && errors.address 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
            } rounded-lg transition-all duration-200 text-gray-900`}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {FormIcons.address}
          </div>
        </div>
        
        {touched.address && errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
        
        <p className="text-xs text-gray-500 mt-1">
          Select a location on the map or type your address above
        </p>
      </div>
      
      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Special Instructions (Optional)
        </label>
        <textarea
          rows={4}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Any special requests or instructions for our cleaning team? (e.g., entry details, focus areas, etc.)"
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
        />
        <p className="text-xs text-gray-500 mt-1">
          Provide any details that will help our team deliver a better service
        </p>
      </div>
      
      {/* Price Display */}
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mt-8 hidden md:block">
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

export default LocationStep; 