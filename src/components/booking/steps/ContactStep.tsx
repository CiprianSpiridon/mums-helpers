import React from 'react';
import { FormIcons } from '../BookingIcons';
import FormSummary from '../FormSummary';

interface ContactStepProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  onNext: () => void;
  onBack: () => void;
  serviceType: string;
  propertyType: string;
  numRooms: number;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  address: string;
  totalCost: number;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onBlur?: (field: string) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  onNext,
  onBack,
  serviceType,
  propertyType,
  numRooms,
  bookingDate,
  bookingTime,
  duration,
  address,
  totalCost,
  errors = {},
  touched = {},
  onBlur = () => {},
}) => {
  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Details</h2>
      <p className="text-gray-600 mb-6">Please provide your contact information to complete your booking.</p>
      
      {/* Booking Summary */}
      <FormSummary
        serviceType={serviceType}
        propertyType={propertyType}
        numRooms={numRooms}
        bookingDate={bookingDate}
        bookingTime={bookingTime}
        duration={duration}
        address={address}
        totalCost={totalCost}
        isCollapsible={true}
      />
      
      {/* Contact Form */}
      <div className="space-y-6 mt-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => onBlur('name')}
              placeholder="Your full name"
              required
              className={`block w-full pl-10 pr-3 py-3 border ${
                touched.name && errors.name 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
              } rounded-lg transition-all duration-200 text-gray-900`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {FormIcons.user}
            </div>
          </div>
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => onBlur('email')}
              placeholder="Your email address"
              required
              className={`block w-full pl-10 pr-3 py-3 border ${
                touched.email && errors.email 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
              } rounded-lg transition-all duration-200 text-gray-900`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {FormIcons.email}
            </div>
          </div>
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => onBlur('phone')}
              placeholder="Your phone number"
              required
              className={`block w-full pl-10 pr-3 py-3 border ${
                touched.phone && errors.phone 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
              } rounded-lg transition-all duration-200 text-gray-900`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {FormIcons.phone}
            </div>
          </div>
          {touched.phone && errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            We&apos;ll only use this to contact you about your booking
          </p>
        </div>
        
        {/* Terms and Privacy Policy */}
        <div className="mt-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                I agree to the <a href="#" className="text-pink-600 hover:text-pink-800">Terms of Service</a> and <a href="#" className="text-pink-600 hover:text-pink-800">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Navigation Buttons */}
      <div className="flex justify-between mt-8 md:flex hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          Complete Booking
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Floating Navigation Buttons for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Total Cost</span>
            <span className="text-xl font-bold text-pink-600">AED {totalCost}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            <svg className="inline-block mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button
            type="button"
            onClick={onNext}
            className="py-3 px-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            Complete
            <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactStep; 