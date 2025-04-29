'use client';

import React from 'react';
import { FormIcons } from '../BookingIcons';
import FormSummary from '../FormSummary';
import { useBookingContext } from '@/context/BookingContext';
import StepNavigation from '../StepNavigation';

interface ContactStepProps {
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onBlur: (field: string) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({
  onNext,
  onBack,
  totalCost,
  errors,
  touched,
  onBlur,
}) => {
  const { state, dispatch } = useBookingContext();
  const { name, email, phone } = state;

  const handleFieldChange = (field: 'name' | 'email' | 'phone', value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Details</h2>
      <p className="text-gray-600 mb-6">Please provide your contact information to complete your booking.</p>
      
      <FormSummary
        isCollapsible={true}
      />
      
      <div className="space-y-6 mt-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
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
        
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
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
        
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
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
      
      <StepNavigation 
        onNext={onNext}
        onBack={onBack}
        totalCost={totalCost}
        currentStep={5}
      />
    </div>
  );
};

export default ContactStep; 