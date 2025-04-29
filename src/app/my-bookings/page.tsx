'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import BookingFilters from '@/components/my-bookings/BookingFilters'; 
import BookingCard from '@/components/my-bookings/BookingCard';
import EmptyState from '@/components/my-bookings/EmptyState';
// Import types from BookingCard component
import type { BookingStatus, Booking } from '@/components/my-bookings/BookingCard'; 

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
      image: `https://ui-avatars.com/api/?name=Sarah+Johnson&background=random&color=fff`,
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
      image: `https://ui-avatars.com/api/?name=Maria+Garcia&background=random&color=fff`,
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
      image: `https://ui-avatars.com/api/?name=Sarah+Johnson&background=random&color=fff`,
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
      image: `https://ui-avatars.com/api/?name=Emma+Wilson&background=random&color=fff`,
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
      image: `https://ui-avatars.com/api/?name=Maria+Garcia&background=random&color=fff`,
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
      image: `https://ui-avatars.com/api/?name=Sarah+Johnson&background=random&color=fff`,
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
      image: `https://ui-avatars.com/api/?name=Emma+Wilson&background=random&color=fff`,
    },
  },
];

// Keep filter options local
const filterOptions = {
  serviceType: ['all', 'regular', 'deep', 'move'],
};

const MyBookingsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<BookingStatus>('scheduled');
  const [serviceFilter, setServiceFilter] = useState('all');
  
  // Filter bookings based on selected filters
  const filteredBookings = sampleBookings.filter(booking => {
    const matchesStatus = activeTab === 'all' || booking.status === activeTab;
    const matchesService = serviceFilter === 'all' || booking.serviceType === serviceFilter;
    return matchesStatus && matchesService;
  });

  const getStatusBadge = (status: string) => { 
    let text = status.charAt(0).toUpperCase() + status.slice(1);
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';

    switch(status) {
      case 'completed':
        text = t('myBookingsPage.tabCompleted');
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'scheduled':
        text = t('myBookingsPage.tabScheduled');
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'cancelled':
        text = t('myBookingsPage.tabCancelled');
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
    }
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>{text}</span>;
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-start pt-20 pb-16 px-0 sm:px-6 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
              {t('myBookingsPage.title')}
            </h1>
            
            {/* Use BookingFilters component */}
            <BookingFilters
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              serviceFilter={serviceFilter}
              setServiceFilter={setServiceFilter}
              serviceTypeOptions={filterOptions.serviceType}
            />
            
            {/* Bookings list */}
            <div className="space-y-6">
              {filteredBookings.length === 0 ? (
                <EmptyState />
              ) : (
                filteredBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking as Booking}
                    getStatusBadge={getStatusBadge} 
                  />
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