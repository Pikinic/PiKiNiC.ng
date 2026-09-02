import { AdminPageHeader } from "@/components/admin/page-header";
import { FlightOfferForm } from "@/components/admin/forms/flight-offer-form";

export default function NewFlightOfferPage() {
  return (
    <div>
      <AdminPageHeader title="New Flight Offer" />
      <FlightOfferForm />
    </div>
  );
}
