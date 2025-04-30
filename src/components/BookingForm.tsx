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
// Import Strapi API functions
import { 
  findCustomerByEmail, 
  createCustomer, 
  submitBooking 
} from '@/lib/strapi';
// import { Service, BookingPayload, Customer } from '@/types/strapi'; // Remove unused Service import
import { BookingPayload, Customer } from '@/types/strapi'; // Import only used types
import { formatISO } from 'date-fns'; // Assuming date-fns is installed for ISO formatting

const BookingFormContent = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state
  const [submissionError, setSubmissionError] = useState<string | null>(null); // Add error state
  const [createdBookingId, setCreatedBookingId] = useState<number | null>(null); // <-- Add state for booking ID
  
  // State is now managed by BookingContext, access via hook
  const { state, dispatch } = useBookingContext();
  // Destructure all needed state for submission
  const { 
    services, // Need the full services array to find the ID
    serviceType, 
    propertyType, 
    numRooms, 
    bookingDate, 
    bookingTime, 
    duration, 
    address, 
    // latitude, // Comment out unused vars
    // longitude,
    instructions, 
    name, 
    email, 
    phone, 
    needsCleaningSupplies,
    totalCost, 
    errors, 
    touched
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

  const handleSubmit = async () => {
    // Don't submit if already submitting
    if (isSubmitting) return;

    console.log('Attempting booking submission...');
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // 1. Find or Create Customer
      let customer: Customer | null = await findCustomerByEmail(email);
      if (!customer) {
        console.log('Customer not found, creating new customer...');
        customer = await createCustomer({ name, email, phone });
        console.log('New customer created:', customer);
      }
      if (!customer) {
        throw new Error('Failed to find or create customer.');
      }
      const customerId = customer.id;

      // 2. Find Selected Service ID
      const selectedService = services.find(s => s.serviceTypeId === serviceType);
      if (!selectedService) {
        throw new Error('Selected service details not found.');
      }
      const serviceId = selectedService.id;

      // 3. Format DateTime (Combine date and time, then format as ISO string)
      // Basic combination - assumes bookingDate is YYYY-MM-DD and bookingTime is HH:MM
      // IMPORTANT: This might need adjustment based on actual date/time picker output
      // and might fail if date/time is not set. Add validation earlier.
      let scheduledDateTimeISO = '';
      if (bookingDate && bookingTime) {
        try {
            // Combine date (YYYY-MM-DD) and time (HH:MM:SS.ms) directly using 'T' separator
            const dateTimeString = `${bookingDate}T${bookingTime}`;
            console.log('Attempting to parse:', dateTimeString); // Log the string being parsed
            const dateTimeObj = new Date(dateTimeString);

            // Check if the date object is valid before formatting
            if (isNaN(dateTimeObj.getTime())) {
              console.error('Failed to create valid Date object from:', dateTimeString);
              throw new Error('Invalid date or time combination.');
            }

            scheduledDateTimeISO = formatISO(dateTimeObj);
            console.log('Formatted DateTime:', scheduledDateTimeISO);
        } catch (e) {
            console.error("Error formatting date/time:", e);
            throw new Error('Invalid date or time format.');
        }
      } else {
          throw new Error('Booking date and time must be selected.');
      }

      // 4. Construct Booking Payload
      const payload: BookingPayload = {
        scheduledDateTime: scheduledDateTimeISO,
        address: address,
        bookingStatus: 'submitted', // Changed from status
        propertyType: propertyType,
        numberOfRooms: numRooms,
        durationHours: duration,
        needsCleaningSupplies: needsCleaningSupplies,
        calculatedCost: totalCost,
        notes: instructions,
        customer: customerId,
        service: serviceId,
        // maid: undefined, // Assign later if needed
        // Add latitude/longitude if schema supports it
      };
      console.log('Submitting payload:', payload);

      // 5. Submit Booking
      const createdBooking = await submitBooking(payload);
      console.log('Booking successful:', createdBooking);
      setCreatedBookingId(createdBooking.id); // <-- Store the ID

      // 6. Update UI on Success
      setBookingComplete(true);
      setCurrentStep(6); // Move to final confirmation step

    } catch (error) {
      console.error('Booking submission failed:', error);
      setSubmissionError(error instanceof Error ? error.message : 'An unknown error occurred during submission.');
    } finally {
      setIsSubmitting(false); // Ensure submitting state is reset
    }
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

      {/* Display Submission Error */}
      {submissionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-4 md:mx-0" role="alert">
          <strong className="font-bold">Booking Failed: </strong>
          <span className="block sm:inline">{submissionError}</span>
        </div>
      )}

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
            bookingId={createdBookingId} // <-- Pass the ID as prop
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