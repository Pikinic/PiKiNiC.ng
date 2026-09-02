"use client";

import { useState } from "react";
import { AdminIcon } from "@/components/admin/admin-icon";

export function ConfirmDeleteButton({
  label = "Delete",
  confirmLabel = "Confirm?",
  onConfirm,
}: {
  label?: string;
  confirmLabel?: string;
  onConfirm: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
        <span className="text-red-600">{confirmLabel}</span>
        <button
          type="button"
          onClick={onConfirm}
          className="text-red-600 underline underline-offset-2 hover:text-red-700"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-text-tertiary underline underline-offset-2 hover:text-text-secondary"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-text-tertiary transition-colors hover:text-red-600"
    >
      <AdminIcon icon="trash" className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
