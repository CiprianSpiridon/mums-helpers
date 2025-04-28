'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProgressSteps from './booking/ProgressSteps';
import ServiceTypeStep from './booking/steps/ServiceTypeStep';
import PropertyStep from './booking/steps/PropertyStep';
import ScheduleStep from './booking/steps/ScheduleStep';
import LocationStep from './booking/steps/LocationStep';
import ContactStep from './booking/steps/ContactStep';
import ConfirmationStep from './booking/steps/ConfirmationStep';
import { calculateTotalCost } from '../config/pricingConfig';

const BookingForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // Service Type state (Step 1)
  const [serviceType, setServiceType] = useState('regular');
  
  // Property Details state (Step 2)
  const [propertyType, setPropertyType] = useState('house');
  const [numRooms, setNumRooms] = useState(2);
  
  // Schedule state (Step 3)
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [duration, setDuration] = useState(2);
  
  // Location state (Step 4)
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  
  // Contact info state (Step 5)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Price calculation state
  const [totalCost, setTotalCost] = useState(0);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Calculate the total cost whenever the relevant inputs change
  useEffect(() => {
    const cost = calculateTotalCost(serviceType, propertyType, numRooms, duration);
    setTotalCost(cost);
  }, [serviceType, propertyType, numRooms, duration]);

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
    // Service type is pre-selected, so no validation needed
    return true;
  };
  
  const validatePropertyDetails = () => {
    // Property type and rooms are pre-selected, so no validation needed
    return true;
  };
  
  const validateSchedule = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingDate) newErrors.bookingDate = 'Booking date is required';
    if (!bookingTime) newErrors.bookingTime = 'Booking time is required';
    
    setErrors(newErrors);
    setTouched({
      bookingDate: true,
      bookingTime: true,
    });
    
    return Object.keys(newErrors).length === 0;
  };
  
  const validateLocation = () => {
    const newErrors: Record<string, string> = {};
    
    if (!address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    setTouched({
      address: true,
    });
    
    return Object.keys(newErrors).length === 0;
  };
  
  const validateContactInfo = () => {
    const newErrors: Record<string, string> = {};
    
    // Required field validations
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    
    // Format validations
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // More flexible phone validation that accepts various formats
    if (phone && !/^(\+|00)?[0-9\s\-()]{8,20}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
    });
    
    return Object.keys(newErrors).length === 0;
  };

  // Step navigation handlers
  const handleNext = () => {
    // Validate current step before proceeding
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateServiceType();
        break;
      case 2:
        isValid = validatePropertyDetails();
        break;
      case 3:
        isValid = validateSchedule();
        break;
      case 4:
        isValid = validateLocation();
        break;
      case 5:
        isValid = validateContactInfo();
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
      // Clear errors when moving to next step
      setErrors({});
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    // Clear errors when going back
    setErrors({});
  };

  const handleMapAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  const handleSubmit = () => {
    if (validateContactInfo()) {
      console.log('Form submitted:', {
        serviceType, propertyType, numRooms, bookingDate, bookingTime, 
        duration, address, instructions, name, email, phone, totalCost
      });
      
      // Simulate successful booking
      setBookingComplete(true);
      setTimeout(() => {
        setCurrentStep(6); // Move to final confirmation step
      }, 500);
    }
  };

  const handleReset = () => {
    // Reset the form and go back to step 1
    setCurrentStep(1);
    setBookingDate('');
    setBookingTime('');
    setAddress('');
    setInstructions('');
    setName('');
    setEmail('');
    setPhone('');
    // Keep default values for other fields
    setServiceType('regular');
    setPropertyType('house');
    setNumRooms(2);
    setDuration(2);
    // Clear errors and touched state
    setErrors({});
    setTouched({});
    setBookingComplete(false);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
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
            serviceType={serviceType}
            setServiceType={setServiceType}
            onNext={handleNext}
            totalCost={totalCost}
          />
        )}

        {/* Step 2: Property Details */}
        {currentStep === 2 && (
          <PropertyStep
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            numRooms={numRooms}
            setNumRooms={setNumRooms}
            onNext={handleNext}
            onBack={handleBack}
            totalCost={totalCost}
          />
        )}

        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <ScheduleStep
            bookingDate={bookingDate}
            setBookingDate={setBookingDate}
            bookingTime={bookingTime}
            setBookingTime={setBookingTime}
            duration={duration}
            setDuration={setDuration}
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
            address={address}
            setAddress={setAddress}
            onAddressSelect={handleMapAddressSelect}
            instructions={instructions}
            setInstructions={setInstructions}
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
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            onNext={handleSubmit}
            onBack={handleBack}
            serviceType={serviceType}
            propertyType={propertyType}
            numRooms={numRooms}
            bookingDate={bookingDate}
            bookingTime={bookingTime}
            duration={duration}
            address={address}
            totalCost={totalCost}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
          />
        )}

        {/* Step 6: Confirmation */}
        {currentStep === 6 && bookingComplete && (
          <ConfirmationStep
            serviceType={serviceType}
            propertyType={propertyType}
            numRooms={numRooms}
            bookingDate={bookingDate}
            bookingTime={bookingTime}
            duration={duration}
            address={address}
            name={name}
            totalCost={totalCost}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default BookingForm; 