import React from 'react';
import { ServiceIcons } from '../BookingIcons';

interface ServiceTypeStepProps {
  serviceType: string;
  setServiceType: (type: string) => void;
  onNext: () => void;
  totalCost: number;
}

const ServiceTypeStep: React.FC<ServiceTypeStepProps> = ({
  serviceType,
  setServiceType,
  onNext,
  totalCost
}) => {
  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Select Cleaning Service</h2>
      
      {/* Service Type Cards */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div 
          onClick={() => setServiceType('regular')}
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
              <h3 className="font-semibold text-gray-900 text-lg">Regular Cleaning</h3>
              <p className="text-gray-600">From AED 120</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 ml-14">
            Standard cleaning service for maintaining your home. Includes dusting, vacuuming, 
            mopping, and bathroom cleaning.
          </p>
        </div>

        <div 
          onClick={() => setServiceType('deep')}
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
              <h3 className="font-semibold text-gray-900 text-lg">Deep Cleaning</h3>
              <p className="text-gray-600">From AED 200</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 ml-14">
            Intensive cleaning that covers hard-to-reach areas, cabinets, appliances, 
            and detailed bathroom sanitation.
          </p>
        </div>

        <div 
          onClick={() => setServiceType('move')}
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
              <h3 className="font-semibold text-gray-900 text-lg">Move-in/out Cleaning</h3>
              <p className="text-gray-600">From AED 250</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 ml-14">
            Complete cleaning service when moving in or out. Includes all deep cleaning tasks
            plus inside cabinets, appliances, and windows.
          </p>
        </div>
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

      {/* Next Button - Only visible on desktop */}
      <div className="flex justify-end mt-8 md:block hidden">
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

      {/* Floating Price and Next Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Total Cost</span>
            <span className="text-xl font-bold text-pink-600">AED {totalCost}</span>
          </div>
        </div>
        
        <button
          type="button"
          onClick={onNext}
          className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          Continue to Property Details
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ServiceTypeStep; 