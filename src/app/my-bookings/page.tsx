'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Sample booking data
const sampleBookings = [
  {
    id: 'BK-20231105-001',
    serviceType: 'regular',
    date: '2023-11-05',
    time: '10:00',
    duration: 3,
    address: 'Villa 23, Street 14, Al Wasl, Dubai',
    status: 'completed',
    price: 300,
    maid: {
      name: 'Sarah Johnson',
      rating: 4.8,
      image: '/maid1.jpg',
    },
  },
  {
    id: 'BK-20231215-002',
    serviceType: 'deep',
    date: '2023-12-15',
    time: '14:00',
    duration: 4,
    address: 'Apartment 1204, Marina Crown Tower, Dubai Marina, Dubai',
    status: 'completed',
    price: 450,
    maid: {
      name: 'Maria Garcia',
      rating: 4.9,
      image: '/maid2.jpg',
    },
  },
  {
    id: 'BK-20240105-003',
    serviceType: 'regular',
    date: '2024-01-05',
    time: '09:30',
    duration: 2,
    address: 'Villa 23, Street 14, Al Wasl, Dubai',
    status: 'completed',
    price: 210,
    maid: {
      name: 'Sarah Johnson',
      rating: 4.8,
      image: '/maid1.jpg',
    },
  },
  {
    id: 'BK-20240210-004',
    serviceType: 'move',
    date: '2024-02-10',
    time: '08:00',
    duration: 6,
    address: 'Villa 45, Street 7, Arabian Ranches, Dubai',
    status: 'completed',
    price: 720,
    maid: {
      name: 'Emma Wilson',
      rating: 4.7,
      image: '/maid3.jpg',
    },
  },
  {
    id: 'BK-20240315-005',
    serviceType: 'deep',
    date: '2024-03-15',
    time: '13:00',
    duration: 5,
    address: 'Apartment 1204, Marina Crown Tower, Dubai Marina, Dubai',
    status: 'completed',
    price: 580,
    maid: {
      name: 'Maria Garcia',
      rating: 4.9,
      image: '/maid2.jpg',
    },
  },
  {
    id: 'BK-20240423-006',
    serviceType: 'regular',
    date: '2024-04-23',
    time: '15:30',
    duration: 3,
    address: 'Villa 23, Street 14, Al Wasl, Dubai',
    status: 'scheduled',
    price: 300,
    maid: {
      name: 'Sarah Johnson',
      rating: 4.8,
      image: '/maid1.jpg',
    },
  },
  {
    id: 'BK-20240510-007',
    serviceType: 'deep',
    date: '2024-05-10',
    time: '10:00',
    duration: 4,
    address: 'Villa 23, Street 14, Al Wasl, Dubai',
    status: 'scheduled',
    price: 450,
    maid: {
      name: 'Emma Wilson',
      rating: 4.7,
      image: '/maid3.jpg',
    },
  },
];

// Filter options
const filterOptions = {
  status: ['all', 'scheduled', 'completed', 'cancelled'],
  serviceType: ['all', 'regular', 'deep', 'move'],
};

const MyBookingsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  
  // Filter bookings based on selected filters
  const filteredBookings = sampleBookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.serviceType === serviceFilter;
    return matchesStatus && matchesService;
  });

  const getServiceLabel = (type: string) => {
    switch(type) {
      case 'regular': return 'Regular Cleaning';
      case 'deep': return 'Deep Cleaning';
      case 'move': return 'Move-in/out Cleaning';
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'scheduled':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Scheduled</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Cancelled</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center pt-28 pb-16 px-4 sm:px-6 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
              My Bookings
            </h1>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  {filterOptions.status.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="serviceFilter" className="text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <select
                  id="serviceFilter"
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  {filterOptions.serviceType.map(service => (
                    <option key={service} value={service}>
                      {service === 'all' ? 'All' : getServiceLabel(service)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Bookings list */}
            <div className="space-y-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
                  <p className="mt-1 text-gray-500">Try changing your filters or book a new service.</p>
                  <div className="mt-6">
                    <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700">
                      Book a Service
                    </Link>
                  </div>
                </div>
              ) : (
                filteredBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{getServiceLabel(booking.serviceType)}</h3>
                        <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Date & Time</p>
                          <p className="text-base text-gray-900">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                            <span className="ml-2">at {booking.time}</span>
                          </p>
                          <p className="text-sm text-gray-700 mt-1">Duration: {booking.duration} hours</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p className="text-base text-gray-900">{booking.address}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500">Maid</p>
                          <div className="flex items-center mt-1">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden mr-2">
                              {/* Placeholder for maid image */}
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <p className="text-base text-gray-900">{booking.maid.name}</p>
                              <div className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm text-gray-700 ml-1">{booking.maid.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p className="text-xl font-bold text-gray-900">AED {booking.price}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {booking.status === 'scheduled' && (
                          <>
                            <button className="px-3 py-2 text-sm font-medium text-pink-700 hover:bg-pink-50 rounded-lg transition-colors">
                              Reschedule
                            </button>
                            <button className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              Cancel
                            </button>
                          </>
                        )}
                        <button className="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors">
                          {booking.status === 'completed' ? 'Book Again' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyBookingsPage; 