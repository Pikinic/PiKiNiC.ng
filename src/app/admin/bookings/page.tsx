"use client";

import { useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";
import { StatTile, StatTileGrid } from "@/components/admin/stat-tile";
import { StatusPill } from "@/components/admin/status-pill";
import { useAdminStore } from "@/lib/admin/store";
import { formatAdminDateTime, formatNaira } from "@/lib/admin/utils/format";
import { getBookingMetrics } from "@/lib/admin/utils/metrics";
import type { Booking, BookingStatus } from "@/lib/admin/types";

const filters: { key: BookingStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "cancelled", label: "Cancelled" },
];

export default function BookingsPage() {
  const bookings = useAdminStore((state) => state.bookings);
  const updateBookingStatus = useAdminStore((state) => state.updateBookingStatus);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const metrics = useMemo(() => getBookingMetrics(bookings), [bookings]);
  const filteredBookings = useMemo(
    () => (filter === "all" ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter]
  );

  const columns: AdminTableColumn<Booking>[] = [
    {
      key: "customer",
      header: "Customer",
      cell: (booking) => (
        <div>
          <div className="font-semibold text-text-primary">{booking.customerName}</div>
          <div className="text-xs text-text-tertiary">{booking.customerEmail}</div>
        </div>
      ),
    },
    {
      key: "item",
      header: "Item",
      cell: (booking) => (
        <div>
          <span className="mr-2 inline-block rounded-[2px] bg-neutral-900/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
            {booking.itemType}
          </span>
          {booking.itemLabel}
        </div>
      ),
    },
    { key: "amount", header: "Amount", cell: (booking) => formatNaira(booking.amount) },
    { key: "status", header: "Status", cell: (booking) => <StatusPill status={booking.status} /> },
    { key: "bookedAt", header: "Booked", cell: (booking) => formatAdminDateTime(booking.bookedAt) },
    {
      key: "actions",
      header: "Update Status",
      cell: (booking) => (
        <select
          value={booking.status}
          onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingStatus)}
          className="h-9 rounded-[2px] border border-border-primary bg-surface-primary px-2 text-xs font-semibold uppercase tracking-wide text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
        >
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Bookings"
        description="Travel & Tours client bookings and payment status."
      />

      <StatTileGrid>
        <StatTile label="Total Bookings" value={String(metrics.totalBookings)} />
        <StatTile label="Total Paid" value={formatNaira(metrics.totalPaidAmount)} accent />
        <StatTile label="Pending" value={String(metrics.pendingCount)} />
        <StatTile label="Cancelled" value={String(metrics.cancelledCount)} />
      </StatTileGrid>

      <div className="mb-4 mt-8 flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-[2px] px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
              filter === f.key
                ? "bg-green-200 text-green-900"
                : "border border-border-primary text-text-secondary hover:bg-neutral-900/[0.04]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <AdminTable
        columns={columns}
        rows={filteredBookings}
        rowKey={(booking) => booking.id}
        emptyMessage="No bookings match this filter."
      />
    </div>
  );
}
