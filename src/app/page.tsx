'use client';

import React from "react";
import BookingForm from "@/components/BookingForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { BookingProvider } from '@/context/BookingContext';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-start pt-20 pb-0 px-0 sm:px-6 bg-gray-50">
        <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
            {t('bookingPage.title')}
          </h1>
          <BookingProvider>
            <BookingForm />
          </BookingProvider>
        </div>
      </main>
      <Footer />
    </>
  );
}
