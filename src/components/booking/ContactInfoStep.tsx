import React from 'react';
import { FormIcons } from './BookingIcons';

interface ContactInfoStepProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onBlur?: (field: string) => void;
  totalCost: number;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  onBack,
  onSubmit,
  errors = {},
  touched = {},
  onBlur = () => {},
  totalCost,
}) => {
  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
      
      {/* Price Display - Only visible on desktop */}
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mb-6 md:block hidden">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900">Total Cost</h3>
            <p className="text-xs text-gray-600">Final price for your booking</p>
          </div>
          <div className="text-2xl font-bold text-pink-600">AED {totalCost}</div>
        </div>
      </div>
      
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
      </div>
      
      {/* Back and Submit Buttons - Only visible on desktop */}
      <div className="flex justify-between mt-8 md:flex hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          {FormIcons.arrowLeft}
          Back
        </button>
        
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          Submit Booking
          {FormIcons.check}
        </button>
      </div>
      
      {/* Floating Price and Buttons for Mobile */}
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
            {FormIcons.arrowLeft}
            Back
          </button>
          
          <button
            type="button"
            onClick={onSubmit}
            className="py-3 px-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            Submit
            {FormIcons.check}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStep; 