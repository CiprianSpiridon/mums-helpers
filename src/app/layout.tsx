// Remove 'use client'

import type { Metadata } from "next"; // Restore Metadata import
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Keep LanguageProvider import, remove hook import
import { LanguageProvider } from '@/context/LanguageContext';
// Import the new client wrapper
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Restore metadata export
export const metadata: Metadata = { 
  title: "MumzHelpers - Maid Booking Services",
  description: "Book professional cleaning and maid services with MumzHelpers",
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
  },
};

// Remove LayoutContent inner component
/*
function LayoutContent({ children }: { children: React.ReactNode }) {
  // ... (logic removed)
}
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default lang/dir, client wrapper will update
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {/* Use ClientLayoutWrapper */}
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
