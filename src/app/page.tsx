import React from "react";
import BookingForm from "@/components/BookingForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-start pt-20 pb-16 px-0 sm:px-6 bg-gray-50">
        <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
            Book Your Maid Service
          </h1>
          <BookingForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
