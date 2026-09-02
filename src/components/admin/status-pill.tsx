import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/lib/admin/types";

const styles: Record<BookingStatus, string> = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-neutral-200 text-neutral-700",
  cancelled: "bg-red-100 text-red-700",
};

export function StatusPill({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-block rounded-[2px] px-2.5 py-1 text-xs font-semibold uppercase tracking-widest",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}
