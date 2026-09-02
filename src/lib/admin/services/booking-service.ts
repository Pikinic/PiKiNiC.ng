import type { Booking, BookingStatus } from "@/lib/admin/types";

export function updateBookingStatus(
  bookings: Booking[],
  id: string,
  status: BookingStatus
): Booking[] {
  return bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking));
}
