import React from 'react';
import { ServiceIcons, PropertyIcons, FormIcons } from './BookingIcons';

interface ServiceDetailsStepProps {
  serviceType: string;
  setServiceType: (type: string) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  numRooms: number;
  setNumRooms: (rooms: number) => void;
  bookingDate: string;
  setBookingDate: (date: string) => void;
  bookingTime: string;
  setBookingTime: (time: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  address: string;
  setAddress: (address: string) => void;
  instructions: string;
  setInstructions: (instructions: string) => void;
  onNext: () => void;
}

const ServiceDetailsStep: React.FC<ServiceDetailsStepProps> = ({
  serviceType,
  setServiceType,
  propertyType,
  setPropertyType,
  numRooms,
  setNumRooms,
  bookingDate,
  setBookingDate,
  bookingTime,
  setBookingTime,
  duration,
  setDuration,
  address,
  setAddress,
  instructions,
  setInstructions,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Service Details</h2>

      {/* Service Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div 
          onClick={() => setServiceType('regular')}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            serviceType === 'regular' 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-200 hover:border-pink-200'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-full mr-2 ${serviceType === 'regular' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {ServiceIcons.regular}
            </div>
            <h3 className="font-semibold text-gray-900">Regular Cleaning</h3>
          </div>
          <p className="text-sm text-gray-700">Standard cleaning service for maintaining your home.</p>
        </div>

        <div 
          onClick={() => setServiceType('deep')}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            serviceType === 'deep' 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-200 hover:border-pink-200'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-full mr-2 ${serviceType === 'deep' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {ServiceIcons.deep}
            </div>
            <h3 className="font-semibold text-gray-900">Deep Cleaning</h3>
          </div>
          <p className="text-sm text-gray-700">Intensive cleaning that covers hard-to-reach areas.</p>
        </div>

        <div 
          onClick={() => setServiceType('move')}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            serviceType === 'move' 
              ? 'border-pink-500 bg-pink-50' 
              : 'border-gray-200 hover:border-pink-200'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-full mr-2 ${serviceType === 'move' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {ServiceIcons.move}
            </div>
            <h3 className="font-semibold text-gray-900">Move-in/out</h3>
          </div>
          <p className="text-sm text-gray-700">Complete cleaning service when moving in or out.</p>
        </div>
      </div>

      {/* Property Type Cards */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Property Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div 
            onClick={() => setPropertyType('house')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              propertyType === 'house' 
                ? 'border-pink-500 bg-pink-50' 
                : 'border-gray-200 hover:border-pink-200'
            }`}
          >
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-full mr-2 ${propertyType === 'house' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {PropertyIcons.house}
              </div>
              <h3 className="font-semibold text-gray-900">House</h3>
            </div>
            <p className="text-sm text-gray-700">Villa, townhouse or independent home</p>
          </div>

          <div 
            onClick={() => setPropertyType('flat')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              propertyType === 'flat' 
                ? 'border-pink-500 bg-pink-50' 
                : 'border-gray-200 hover:border-pink-200'
            }`}
          >
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-full mr-2 ${propertyType === 'flat' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {PropertyIcons.flat}
              </div>
              <h3 className="font-semibold text-gray-900">Flat/Apartment</h3>
            </div>
            <p className="text-sm text-gray-700">Apartment or flat in a building</p>
          </div>
        </div>
      </div>

      {/* Number of Rooms */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Number of Rooms
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5, '6+'].map((rooms) => (
            <button
              key={rooms}
              type="button"
              onClick={() => setNumRooms(typeof rooms === 'string' ? 6 : rooms)}
              className={`flex-1 py-2 border-2 rounded-lg text-sm font-medium transition-colors ${
                (typeof rooms === 'string' && numRooms >= 6) || numRooms === rooms
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'border-gray-300 text-gray-700 hover:border-pink-300'
              }`}
            >
              {rooms}
            </button>
          ))}
        </div>
      </div>

      {/* Date and Time Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {FormIcons.date}
            </div>
          </div>
        </div>
        
        {/* Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Time
          </label>
          <div className="relative">
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {FormIcons.time}
            </div>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Duration (hours)
        </label>
        <div className="flex items-center space-x-1">
          {[2, 3, 4, 5, 6].map((hours) => (
            <button
              key={hours}
              type="button"
              onClick={() => setDuration(hours)}
              className={`flex-1 py-2 border-2 rounded-lg text-sm font-medium transition-colors ${
                duration === hours
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'border-gray-300 text-gray-700 hover:border-pink-300'
              }`}
            >
              {hours}h
            </button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Address
        </label>
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full address"
            required
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {FormIcons.address}
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Special Instructions (Optional)
        </label>
        <textarea
          rows={4}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Any specific requests? e.g., focus on kitchen, use specific cleaning products"
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-900"
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
        >
          Continue to Contact Info
          {FormIcons.arrowRight}
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailsStep; 