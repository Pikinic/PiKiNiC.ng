import { create } from "zustand";
import type { Booking, BookingStatus } from "@/lib/admin/types";
import * as bookingService from "@/lib/admin/services/booking-service";

type AdminStore = {
  bookings: Booking[];
  updateBookingStatus: (id: string, status: BookingStatus) => void;
};

// Bookings have no backend yet — that data belongs to the Travel & Tours
// API (a separate, not-yet-built service), so this stays in-memory and
// empty until that integration exists.
export const useAdminStore = create<AdminStore>((set) => ({
  bookings: [],
  updateBookingStatus: (id, status) =>
    set((state) => ({ bookings: bookingService.updateBookingStatus(state.bookings, id, status) })),
}));
