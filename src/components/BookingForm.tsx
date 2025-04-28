'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProgressSteps from './booking/ProgressSteps';
import ServiceDetailsStep from './booking/ServiceDetailsStep';
import ContactInfoStep from './booking/ContactInfoStep';
import ConfirmationStep from './booking/ConfirmationStep';

const BookingForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
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

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    // Scrolling is handled by the useEffect
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    // Scrolling is handled by the useEffect
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Final submit - would normally send to backend
    console.log('Booking Details:', {
      serviceType,
      bookingDate,
      bookingTime,
      duration,
      address,
      propertyType,
      numRooms,
      instructions,
      name,
      email,
      phone,
    });
    
    // Move to confirmation step
    setCurrentStep(3);
    // Scrolling is handled by the useEffect
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
  };

  return (
    <div className="w-full" ref={formRef} tabIndex={-1}>
      {/* Progress Steps */}
      <ProgressSteps currentStep={currentStep} />

      {/* Form Content */}
      <div className="bg-white rounded-xl p-6 transition-all duration-300">
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
            instructions={instructions}
            setInstructions={setInstructions}
            onNext={handleNext}
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
            name={name}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default BookingForm; 