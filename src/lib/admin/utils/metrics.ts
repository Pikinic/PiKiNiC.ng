import type { Booking } from "@/lib/admin/types";

export type BookingMetrics = {
  totalBookings: number;
  totalPaidAmount: number;
  paidCount: number;
  pendingCount: number;
  cancelledCount: number;
};

export function getBookingMetrics(bookings: Booking[]): BookingMetrics {
  return bookings.reduce<BookingMetrics>(
    (metrics, booking) => {
      metrics.totalBookings += 1;
      if (booking.status === "paid") {
        metrics.paidCount += 1;
        metrics.totalPaidAmount += booking.amount;
      } else if (booking.status === "pending") {
        metrics.pendingCount += 1;
      } else {
        metrics.cancelledCount += 1;
      }
      return metrics;
    },
    { totalBookings: 0, totalPaidAmount: 0, paidCount: 0, pendingCount: 0, cancelledCount: 0 }
  );
}
