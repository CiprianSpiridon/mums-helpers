import React from 'react';
import { SERVICE_LABELS, PROPERTY_LABELS } from '../../config/pricingConfig';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Price Breakdown</h3>
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
              <span className="text-gray-600">Service Type:</span>
              <span className="font-medium">
                {SERVICE_LABELS[serviceType as keyof typeof SERVICE_LABELS] || serviceType}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Property Type:</span>
              <span className="font-medium">
                {PROPERTY_LABELS[propertyType as keyof typeof PROPERTY_LABELS] || propertyType}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Number of Rooms:</span>
              <span className="font-medium">{numRooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{duration} hours</span>
            </div>
          </div>
          
          {/* This would be populated with actual breakdown calculations */}
          <div className="space-y-2 border-b pb-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base price for {SERVICE_LABELS[serviceType as keyof typeof SERVICE_LABELS]}</span>
              <span>AED {serviceType === 'regular' ? '120' : serviceType === 'deep' ? '200' : '250'}</span>
            </div>
            
            {propertyType === 'house' && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">House surcharge (20%)</span>
                <span>AED {(serviceType === 'regular' ? 24 : serviceType === 'deep' ? 40 : 50).toFixed(0)}</span>
              </div>
            )}
            
            {numRooms > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Additional rooms ({numRooms - 1})</span>
                <span>AED {((numRooms - 1) * (serviceType === 'regular' ? 25 : serviceType === 'deep' ? 40 : 50)).toFixed(0)}</span>
              </div>
            )}
            
            {duration > 2 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Additional hours ({duration - 2})</span>
                <span>AED {((duration - 2) * (serviceType === 'regular' ? 50 : serviceType === 'deep' ? 70 : 90)).toFixed(0)}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between pt-2">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-pink-600">AED {totalCost}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdownModal; 