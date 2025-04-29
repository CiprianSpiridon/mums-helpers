'use client'; // Ensure page is client component if using hooks/context directly

import BookingForm from "@/components/BookingForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Import the provider
import { BookingProvider } from '@/context/BookingContext'; 
import { useTranslation } from "@/hooks/useTranslation"; // Import hook

export default function BookingPage() {
  const { t } = useTranslation(); // Use hook

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Add translated heading if needed, or form handles its own title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {t('bookingPage.title')} {/* Translate title */} 
          </h1>
          {/* Wrap BookingForm with its provider */}
          <BookingProvider>
            <BookingForm />
          </BookingProvider>
        </div>
      </main>
      <Footer />
    </div>
  );
} 