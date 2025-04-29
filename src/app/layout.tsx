'use client'; // Make layout a client component to access context

// Remove unused Metadata import
// import type { Metadata } from "next"; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider, useLanguageContext } from '@/context/LanguageContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata might need adjustment or alternative handling in client components
// export const metadata: Metadata = { ... }; 
// Consider setting title dynamically within the component if needed

// Inner component to access context after provider
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { state } = useLanguageContext();
  const currentLang = state.language;

  return (
    <html lang={currentLang} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Metadata can be managed via next/head in client components */}
        <title>MumzHelpers - Maid Booking Services</title>
        <meta name="description" content="Book professional cleaning and maid services with MumzHelpers" />
        {/* Add other head elements like favicons here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // LanguageProvider wraps the content that needs language state
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}
