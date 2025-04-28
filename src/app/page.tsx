import React from "react";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12 sm:p-24 bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
          Book Your Maid Service
        </h1>
        <BookingForm />
      </div>
    </main>
  );
}
