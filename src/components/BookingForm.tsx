'use client';

import React, { useState } from 'react';

const BookingForm = () => {
  const [serviceType, setServiceType] = useState('regular');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [duration, setDuration] = useState(2); // Default duration, e.g., 2 hours
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Handle form submission (e.g., display summary, simulate API call)
    console.log('Booking Details:', {
      serviceType,
      bookingDate,
      bookingTime,
      duration,
      address,
      instructions,
    });
    alert('Booking Submitted (Check Console for details)!'); // Placeholder confirmation
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Type */}
      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
          Service Type
        </label>
        <select
          id="serviceType"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        >
          <option value="regular">Regular Cleaning</option>
          <option value="deep">Deep Cleaning</option>
          <option value="move">Move-in/out Cleaning</option>
        </select>
      </div>

      {/* Date and Time Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date */}
        <div>
          <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="bookingDate"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
        {/* Time */}
        <div>
          <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            id="bookingTime"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duration (hours)
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10))}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        >
          <option value={2}>2 Hours</option>
          <option value={3}>3 Hours</option>
          <option value={4}>4 Hours</option>
          <option value={5}>5 Hours</option>
          <option value={6}>6 Hours</option>
        </select>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full address"
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      {/* Special Instructions */}
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
          Special Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          rows={4}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Any specific requests? e.g., focus on kitchen, use specific cleaning products"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
};

export default BookingForm; 