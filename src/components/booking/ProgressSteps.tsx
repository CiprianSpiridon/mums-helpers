import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Service" },
    { number: 2, label: "Property" },
    { number: 3, label: "Schedule" },
    { number: 4, label: "Location" },
    { number: 5, label: "Contact" },
    { number: 6, label: "Confirm" }
  ];

  return (
    <div className="w-full mb-8">
      {/* Desktop Progress Steps */}
      <div className="hidden md:flex w-full justify-between relative">
        {/* Progress Bar Background */}
        <div className="absolute left-0 top-[15px] h-1 bg-gray-200 w-full -z-10"></div>
        
        {/* Progress Bar Fill based on currentStep */}
        <div 
          className="absolute left-0 top-[15px] h-1 bg-pink-500 transition-all duration-500 -z-5"
          style={{ width: `${(Math.max(0, currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-300 ${
                step.number < currentStep
                  ? 'bg-pink-500 text-white'
                  : step.number === currentStep
                    ? 'bg-pink-500 text-white ring-4 ring-pink-100'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number < currentStep ? (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span className={`text-xs font-medium ${
              step.number <= currentStep ? 'text-pink-600' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Mobile Progress Indicator */}
      <div className="md:hidden">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-pink-600">Step {currentStep} of {steps.length}</span>
          <span className="text-sm font-medium text-pink-600">{steps[currentStep - 1]?.label}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps; 