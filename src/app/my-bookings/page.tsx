'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { findBookings } from '@/lib/strapi';
import { FetchedBooking } from '@/types/strapi';
import BookingFilters from '@/components/my-bookings/BookingFilters';
import BookingCard from '@/components/my-bookings/BookingCard';
import EmptyState from '@/components/my-bookings/EmptyState';
import type { Booking, BookingStatus } from '@/components/my-bookings/BookingCard';

// Define sample service type options for the filter dropdown
// In a real app, these might come from config or API
const serviceTypeOptions = [
  { value: 'all', labelKey: 'myBookingsPage.tabAll' },
  { value: 'regular', labelKey: 'common.serviceRegular' },
  { value: 'deep', labelKey: 'common.serviceDeep' },
  { value: 'move', labelKey: 'common.serviceMove' },
];

const MyBookingsPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  // --- State for Filters and Results ---
  const [activeTab, setActiveTab] = useState<BookingStatus>('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [identifier, setIdentifier] = useState(''); // Keep state for search input
  const [bookings, setBookings] = useState<FetchedBooking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearchedOrLoaded, setHasSearchedOrLoaded] = useState(false); // Track search/load attempt
  // ------------------------------------

  // --- Fetching Logic ---
  const fetchBookings = async (searchIdentifier: string) => {
    if (!searchIdentifier) return; // Don't fetch if identifier is empty

    setIsLoading(true);
    setError(null);
    setBookings([]); 
    setHasSearchedOrLoaded(true); // Mark that an attempt was made
    console.log("Fetching bookings for:", searchIdentifier);

    try {
      const results = await findBookings(searchIdentifier);
      setBookings(results);
      console.log('Fetch complete. Results:', results.length);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      const errorKey = 'myBookingsPage.searchError'; 
      setError(err instanceof Error ? err.message : t(errorKey));
    } finally {
      setIsLoading(false);
    }
  };

  // --- Deep Link Handling ---
  useEffect(() => {
    const customerDocId = searchParams.get('documentId');
    if (customerDocId) {
      console.log('Found documentId in URL:', customerDocId);
      setIdentifier(customerDocId); // Pre-fill the search box
      fetchBookings(customerDocId); // Auto-fetch bookings
    } else {
      // Set loading to false explicitly if not auto-fetching
      // This prevents the loading indicator from showing indefinitely
      setIsLoading(false); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  // -------------------------

  // --- Manual Search Submission ---
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      const errorKey = 'myBookingsPage.enterEmailOrPhone';
      setError(t(errorKey));
      return;
    }
    fetchBookings(identifier); // Fetch using the current identifier in the input
  };
  // ---------------------------

  // --- Filtering Logic (keep as is) ---
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = activeTab === 'all' || booking.bookingStatus === activeTab;
    const matchesService = serviceFilter === 'all'; // Placeholder - TODO: Implement service filter
    return matchesStatus && matchesService;
  });
  // -----------------------------------

  // --- Status Badge Helper (keep as is) ---
  const getStatusBadge = (status: string) => {
    let text = status.charAt(0).toUpperCase() + status.slice(1);
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';

    switch(status?.toLowerCase()) {
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
      case 'submitted':
        text = t('myBookingsPage.statusSubmitted');
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      case 'confirmed':
        text = t('myBookingsPage.statusConfirmed');
        bgColor = 'bg-purple-100';
        textColor = 'text-purple-800';
        break;
      case 'in_progress':
      case 'inprogress':
        text = t('myBookingsPage.statusInProgress');
        bgColor = 'bg-orange-100';
        textColor = 'text-orange-800';
        break;
      case 'rescheduled':
        text = t('myBookingsPage.statusRescheduled');
        bgColor = 'bg-indigo-100';
        textColor = 'text-indigo-800';
        break;
      default:
        text = status ? status.charAt(0).toUpperCase() + status.slice(1) : t('common.notAvailable');
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        break;
    }
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>{text}</span>;
  };
  // ------------------------------------

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-start pt-20 pb-16 px-0 sm:px-6 bg-gray-50">
        <div className="w-full max-w-4xl">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
              {t('myBookingsPage.title')}
            </h1>

            {/* --- Search Form (Always visible) --- */} 
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="text"
                value={identifier}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)}
                placeholder={t('myBookingsPage.emailOrPhonePlaceholder')}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-100 placeholder:text-gray-600 text-gray-900"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !identifier}
                className="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('myBookingsPage.searching') : t('myBookingsPage.searchButton')}
              </button>
            </form>
            {/* ------------------------------------ */}

            {/* Error Display */} 
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-6" role="alert">
                {error}
              </div>
            )}

            {/* Loading State */} 
            {isLoading && (
              <div className="text-center text-gray-700 py-10">{t('myBookingsPage.loadingBookings')}</div>
            )}
            
            {/* --- Conditionally Render Filters & Results/Empty State --- */} 
            {!isLoading && hasSearchedOrLoaded && (
              <>
                <BookingFilters
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  serviceFilter={serviceFilter}
                  setServiceFilter={setServiceFilter}
                  serviceTypeOptions={serviceTypeOptions.map(opt => opt.value)}
                />

                <div className="space-y-6 mt-6">
                  {filteredBookings.length === 0 && !error ? (
                    <EmptyState />
                  ) : (
                    filteredBookings.map((fetchedBooking: FetchedBooking) => {
                      const cardBooking: Booking = {
                        id: fetchedBooking.documentId,
                        serviceType: fetchedBooking.service?.displayName || 'unknown',
                        date: fetchedBooking.scheduledDateTime.split('T')[0],
                        time: fetchedBooking.scheduledDateTime.split('T')[1].substring(0, 5),
                        duration: fetchedBooking.durationHours,
                        address: fetchedBooking.address,
                        status: fetchedBooking.bookingStatus as BookingStatus,
                        price: fetchedBooking.calculatedCost,
                        maid: {
                          name: t('myBookingsPage.assignedHelper'),
                          rating: 4.9,
                          image: `https://ui-avatars.com/api/?name=Helper&background=random&color=fff`
                        }
                      };
                      return (
                        <BookingCard 
                          key={fetchedBooking.id}
                          booking={cardBooking}
                          getStatusBadge={getStatusBadge} 
                        />
                      );
                    })
                  )}
                </div>
              </>
            )}
            
            {/* Prompt to search if nothing loaded/searched yet */}
            {!isLoading && !hasSearchedOrLoaded && !error && (
                 <div className="text-center text-gray-600 py-10 bg-gray-50 rounded-lg">
                    <p>{t('myBookingsPage.promptToSearch')}</p>
                 </div>
             )}
            {/* ------------------------------------------------------- */} 
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyBookingsPage; 