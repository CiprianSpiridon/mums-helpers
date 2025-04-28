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
  onSubmit: (e: React.FormEvent) => void;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  onBack,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
      
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Your Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {FormIcons.user}
          </div>
        </div>
      </div>
      
      {/* Email and Phone Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {FormIcons.email}
            </div>
          </div>
        </div>
        
        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971 XX XXX XXXX"
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {FormIcons.phone}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          {FormIcons.arrowLeft}
          Back
        </button>
        
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          Confirm Booking
          {FormIcons.arrowRight}
        </button>
      </div>
    </form>
  );
};

export default ContactInfoStep; 