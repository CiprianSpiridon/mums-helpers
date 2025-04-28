import React from 'react';

interface FormStepProgressProps {
  currentStep: number;
  steps: Array<{
    title: string;
    description?: string;
  }>;
}

const FormStepProgress: React.FC<FormStepProgressProps> = ({ 
  currentStep,
  steps 
}) => {
  return (
    <div className="mb-8">
      {/* Mobile view - simple progress bar */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-pink-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Desktop view - detailed steps */}
      <div className="hidden md:block">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step circle */}
              <div className="relative flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full 
                    transition-colors duration-300
                    ${index + 1 < currentStep 
                      ? 'bg-pink-500 text-white' 
                      : index + 1 === currentStep 
                        ? 'bg-pink-500 text-white border-4 border-pink-100' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {index + 1 < currentStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                
                {/* Step title */}
                <div className="absolute mt-16 text-center">
                  <div className={`text-xs font-medium uppercase ${index + 1 <= currentStep ? 'text-pink-500' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-500 mt-0.5 max-w-[120px] text-center">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div 
                  className={`flex-auto border-t-2 transition-colors duration-300 ${
                    index + 1 < currentStep ? 'border-pink-500' : 'border-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormStepProgress; 