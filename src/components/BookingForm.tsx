'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProgressSteps from './booking/ProgressSteps';
import ServiceDetailsStep from './booking/ServiceDetailsStep';
import ContactInfoStep from './booking/ContactInfoStep';
import ConfirmationStep from './booking/ConfirmationStep';
import { calculateTotalCost } from '../config/pricingConfig';

const BookingForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // Service details state
  const [serviceType, setServiceType] = useState('regular');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [propertyType, setPropertyType] = useState('house');
  const [numRooms, setNumRooms] = useState(2);
  
  // Contact info state
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

  const validateServiceDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingDate) newErrors.bookingDate = 'Booking date is required';
    if (!bookingTime) newErrors.bookingTime = 'Booking time is required';
    if (!address) newErrors.address = 'Address is required. Please select from the map';
    
    // Add other validations as needed
    if (numRooms <= 0) newErrors.numRooms = 'Number of rooms must be at least 1';
    if (duration <= 0) newErrors.duration = 'Duration must be at least 1 hour';
    
    setErrors(newErrors);
    setTouched({
      bookingDate: true,
      bookingTime: true,
      address: true,
      numRooms: true,
      duration: true,
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

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateServiceDetails()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    // Clear errors when going back
    setErrors({});
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
        setCurrentStep(3); // Move to final confirmation step
      }, 1000);
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
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleMapAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  return (
    <div className="w-full" ref={formRef} tabIndex={-1}>
      {/* Progress Steps */}
      <ProgressSteps currentStep={currentStep} />

      {/* Form Content */}
      <div className="bg-white rounded-xl pt-6 transition-all duration-300">
        {currentStep === 1 && (
          <ServiceDetailsStep
            serviceType={serviceType}
            setServiceType={setServiceType}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            numRooms={numRooms}
            setNumRooms={setNumRooms}
            bookingDate={bookingDate}
            setBookingDate={setBookingDate}
            bookingTime={bookingTime}
            setBookingTime={setBookingTime}
            duration={duration}
            setDuration={setDuration}
            address={address}
            setAddress={setAddress}
            onAddressSelect={handleMapAddressSelect}
            instructions={instructions}
            setInstructions={setInstructions}
            onNext={handleNext}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            totalCost={totalCost}
          />
        )}

        {currentStep === 2 && (
          <ContactInfoStep
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            onBack={handleBack}
            onSubmit={handleSubmit}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            totalCost={totalCost}
          />
        )}

        {currentStep === 3 && (
          <ConfirmationStep
            serviceType={serviceType}
            bookingDate={bookingDate}
            bookingTime={bookingTime}
            duration={duration}
            propertyType={propertyType}
            numRooms={numRooms}
            address={address}
            name={name}
            totalCost={totalCost}
            onReset={handleReset}
          />
        )}

        {currentStep === 4 && bookingComplete && (
          <div className="booking-confirmation">
            <h2>Booking Confirmed!</h2>
            <p>Thank you for your booking. A confirmation has been sent to your email.</p>
            <button onClick={handleReset} className="btn-primary">Book Another Service</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm; 