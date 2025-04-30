'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { getServiceTranslationKey } from '@/lib/formatters';

// Define Status type again for clarity, including all handled statuses
type BookingStatus = 
  | 'all' 
  | 'scheduled' 
  | 'completed' 
  | 'cancelled' 
  | 'submitted' 
  | 'confirmed' 
  | 'in_progress' 
  | 'rescheduled';

interface BookingFiltersProps {
  activeTab: BookingStatus;
  setActiveTab: (status: BookingStatus) => void;
  serviceFilter: string;
  setServiceFilter: (service: string) => void;
  serviceTypeOptions: string[]; // e.g., ['all', 'regular', 'deep', 'move']
}

const BookingFilters: React.FC<BookingFiltersProps> = ({
  activeTab,
  setActiveTab,
  serviceFilter,
  setServiceFilter,
  serviceTypeOptions,
}) => {
  const { t } = useTranslation();

  const tabs: { labelKey: string; status: BookingStatus }[] = [
    { labelKey: 'myBookingsPage.tabAll', status: 'all' },
    { labelKey: 'myBookingsPage.tabScheduled', status: 'scheduled' },
    { labelKey: 'myBookingsPage.statusSubmitted', status: 'submitted' },
    { labelKey: 'myBookingsPage.statusConfirmed', status: 'confirmed' },
    { labelKey: 'myBookingsPage.statusInProgress', status: 'in_progress' },
    { labelKey: 'myBookingsPage.tabCompleted', status: 'completed' },
    { labelKey: 'myBookingsPage.statusRescheduled', status: 'rescheduled' },
    { labelKey: 'myBookingsPage.tabCancelled', status: 'cancelled' },
  ];

  return (
    <>
      {/* Tabs for Status Filtering */} 
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 sm:space-x-8 overflow-x-auto pb-px" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.status}
              onClick={() => setActiveTab(tab.status)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${ 
                activeTab === tab.status
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              aria-current={activeTab === tab.status ? 'page' : undefined}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </nav>
      </div>

      {/* Service Type Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="serviceFilter" className="text-sm font-medium text-gray-700">
            {t('myBookingsPage.filterService')}
          </label>
          <select
            id="serviceFilter"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-700"
          >
            <option key="all" value="all">{t('myBookingsPage.tabAll')}</option>
            {serviceTypeOptions.filter(s => s !== 'all').map(service => {
              const translationKey = getServiceTranslationKey(service);
              const translatedValue = t(translationKey);
              // Log the service, key, and translated value for debugging
              console.log(`[BookingFilters] Service: ${service}, Key: ${translationKey}, Translated: ${translatedValue}`);
              return (
                <option key={service} value={service}>
                  {translatedValue}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default BookingFilters; 