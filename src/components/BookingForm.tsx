'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProgressSteps from './booking/ProgressSteps';
import ServiceTypeStep from './booking/steps/ServiceTypeStep';
import PropertyStep from './booking/steps/PropertyStep';
import ScheduleStep from './booking/steps/ScheduleStep';
import LocationStep from './booking/steps/LocationStep';
import ContactStep from './booking/steps/ContactStep';
import ConfirmationStep from './booking/steps/ConfirmationStep';
import { BookingProvider, useBookingContext } from '../context/BookingContext';

const BookingFormContent = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // State is now managed by BookingContext, access via hook
  const { state, dispatch } = useBookingContext();
  // Only destructure state needed directly in this component
  const { 
    // serviceType, propertyType, numRooms, // Unused here
    bookingDate, bookingTime, 
    // duration, // Unused here
    address, 
    // instructions, // Unused here
    name, email, phone, totalCost, // Keep totalCost for StepNavigation
    errors, touched
  } = state;

  // Add useEffect to handle scrolling when step changes
  useEffect(() => {
    // Only run after initial render
    if (currentStep > 1) {
      // Timeout to ensure DOM has updated
      setTimeout(() => {
        // Try multiple scroll approaches for better cross-browser compatibility
        try {
          // For most browsers
          window.scrollTo(0, 0);
          
          // Fallback for iOS Safari
          document.body.scrollTop = 0;
          
          // Fallback for older browsers
          document.documentElement.scrollTop = 0;
          
          // Focus the form container for accessibility
          if (formRef.current) {
            formRef.current.focus();
          }
        } catch (e) {
          console.error('Error scrolling:', e);
        }
      }, 100);
    }
  }, [currentStep]);

  // Validation functions for each step
  const validateServiceType = () => {
    return true; // No validation needed
  };
  
  const validatePropertyDetails = () => {
    return true; // No validation needed
  };
  
  const validateSchedule = () => {
    const newErrors: Record<string, string> = {};
    if (!bookingDate) newErrors.bookingDate = 'Booking date is required';
    if (!bookingTime) newErrors.bookingTime = 'Booking time is required';
    
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    dispatch({ 
      type: 'SET_TOUCHED', 
      touched: { bookingDate: true, bookingTime: true }
    });
    
    return Object.keys(newErrors).length === 0;
  };
  
  const validateLocation = () => {
    const newErrors: Record<string, string> = {};
    if (!address) newErrors.address = 'Address is required';
    
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    dispatch({ type: 'SET_TOUCHED', touched: { address: true } });
    
    return Object.keys(newErrors).length === 0;
  };
  
  const validateContactInfo = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (phone && !/^(\+|00)?[0-9\s\-()]{8,20}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    dispatch({ 
      type: 'SET_TOUCHED', 
      touched: { name: true, email: true, phone: true }
    });
    
    return Object.keys(newErrors).length === 0;
  };

  // Step navigation handlers
  const handleNext = () => {
    let isValid = false;
    switch (currentStep) {
      case 1: isValid = validateServiceType(); break;
      case 2: isValid = validatePropertyDetails(); break;
      case 3: isValid = validateSchedule(); break;
      case 4: isValid = validateLocation(); break;
      case 5: isValid = validateContactInfo(); break; // Validate before submit
      default: isValid = true;
    }
    
    if (isValid) {
      if (currentStep === 5) {
        handleSubmit(); // Call submit directly if last step is valid
      } else {
        setCurrentStep(currentStep + 1);
        dispatch({ type: 'SET_ERRORS', errors: {} }); // Clear errors
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    dispatch({ type: 'SET_ERRORS', errors: {} }); // Clear errors
  };

  const handleMapAddressSelect = (selectedAddress: string, lat?: number, lng?: number) => {
    dispatch({ 
      type: 'SET_LOCATION', 
      address: selectedAddress, 
      latitude: lat, 
      longitude: lng 
    });
  };

  const handleSubmit = () => {
    // Validation is now called within handleNext for the last step
    console.log('Form submitted:', state); // Log entire state from context
      
    // Simulate successful booking
    setBookingComplete(true);
    setTimeout(() => {
      setCurrentStep(6); // Move to final confirmation step
    }, 500);
  };

  const handleReset = () => {
    // Reset the form using context action
    dispatch({ type: 'RESET_FORM' });
    setCurrentStep(1);
    setBookingComplete(false);
  };

  const handleBlur = (field: string) => {
    dispatch({ type: 'SET_TOUCHED', touched: { field, value: true } });
  };

  return (
    <div className="w-full" ref={formRef} tabIndex={-1}>
      {/* Progress Steps */}
      <ProgressSteps currentStep={currentStep} />

      {/* Form Content */}
      <div className="bg-white rounded-xl pb-6 transition-all duration-300">
        {/* Step 1: Service Type */}
        {currentStep === 1 && (
          <ServiceTypeStep
            onNext={handleNext}
            totalCost={totalCost}
          />
        )}

        {/* Step 2: Property Details */}
        {currentStep === 2 && (
          <PropertyStep
            onNext={handleNext}
            onBack={handleBack}
            totalCost={totalCost}
          />
        )}

        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <ScheduleStep
            onNext={handleNext}
            onBack={handleBack}
            totalCost={totalCost}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
          />
        )}

        {/* Step 4: Location */}
        {currentStep === 4 && (
          <LocationStep
            onAddressSelect={handleMapAddressSelect}
            onNext={handleNext}
            onBack={handleBack}
            totalCost={totalCost}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
          />
        )}

        {/* Step 5: Contact Information */}
        {currentStep === 5 && (
          <ContactStep
            onNext={handleNext}
            onBack={handleBack}
            totalCost={totalCost}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
          />
        )}

        {/* Step 6: Confirmation */}
        {currentStep === 6 && bookingComplete && (
          <ConfirmationStep
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

// Original BookingForm component now acts as the provider wrapper
const BookingForm = () => {
  return (
    <BookingProvider>
      <BookingFormContent />
    </BookingProvider>
  );
};

export default BookingForm; 