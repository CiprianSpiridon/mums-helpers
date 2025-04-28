import React from 'react';
import { FormIcons } from './BookingIcons';

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex flex-col items-center">
          <div 
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 
              ${currentStep >= step 
                ? 'bg-pink-600 text-white' 
                : 'bg-gray-200 text-gray-500'}`}
          >
            {currentStep > step ? FormIcons.check : step}
          </div>
          <span className={`mt-2 text-xs font-medium ${currentStep >= step ? 'text-pink-600' : 'text-gray-500'}`}>
            {step === 1 ? 'Service Details' : step === 2 ? 'Contact Info' : 'Confirmation'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps; 