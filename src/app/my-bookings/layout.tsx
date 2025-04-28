import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings | MumzHelpers",
  description: "View and manage your maid service bookings with MumzHelpers",
};

export default function MyBookingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
} 