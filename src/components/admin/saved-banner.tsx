"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SavedBannerContent({
  createdMessage,
  updatedMessage,
}: {
  createdMessage: string;
  updatedMessage: string;
}) {
  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const updated = searchParams.get("updated");

  if (!created && !updated) return null;

  return (
    <div className="mb-6 rounded-[2px] border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
      {created ? createdMessage : updatedMessage}
    </div>
  );
}

export function SavedBanner(props: { createdMessage: string; updatedMessage: string }) {
  return (
    <Suspense fallback={null}>
      <SavedBannerContent {...props} />
    </Suspense>
  );
}
