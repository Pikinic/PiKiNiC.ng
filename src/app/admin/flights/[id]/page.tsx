"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { FlightOfferForm } from "@/components/admin/forms/flight-offer-form";
import { getFlightOffer } from "@/lib/admin/api/flights";
import { ApiError } from "@/lib/admin/api/client";
import type { FlightOffer } from "@/lib/admin/types";

export default function EditFlightOfferPage() {
  const { id } = useParams<{ id: string }>();
  const [offer, setOffer] = useState<FlightOffer | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getFlightOffer(id)
      .then(setOffer)
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return (
      <div>
        <AdminPageHeader title="Flight Offer Not Found" />
        <p className="text-sm text-text-secondary">No flight offer matches that id.</p>
      </div>
    );
  }

  if (!offer) {
    return (
      <div>
        <AdminPageHeader title="Loading…" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title={`Edit: ${offer.from} → ${offer.to}`} />
      <FlightOfferForm initialOffer={offer} />
    </div>
  );
}
