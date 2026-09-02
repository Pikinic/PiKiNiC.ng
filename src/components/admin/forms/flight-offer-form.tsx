"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { AdminSelect, AdminTextInput, ImagePickerField, type FieldState } from "@/components/admin/fields";
import { createFlightOffer, updateFlightOffer } from "@/lib/admin/api/flights";
import type { FlightOffer } from "@/lib/admin/types";

const tripTypes = ["Round trip", "One way", "Multi-city"];

type FieldKey = "from" | "fromCode" | "to" | "toCode" | "price" | "tripType" | "stops";
type FieldErrors = Partial<Record<FieldKey, string>>;

function validate(data: Record<string, FormDataEntryValue>): FieldErrors {
  const errors: FieldErrors = {};
  if (!String(data.from ?? "").trim()) errors.from = "Origin city is required.";
  if (!String(data.fromCode ?? "").trim()) errors.fromCode = "Origin airport code is required.";
  if (!String(data.to ?? "").trim()) errors.to = "Destination city is required.";
  if (!String(data.toCode ?? "").trim()) errors.toCode = "Destination airport code is required.";
  const price = Number(data.price);
  if (!data.price || Number.isNaN(price) || price <= 0) errors.price = "Enter a valid price.";
  const stops = Number(data.stops);
  if (data.stops === "" || Number.isNaN(stops) || stops < 0) errors.stops = "Enter the number of stops (0 for nonstop).";
  return errors;
}

export function FlightOfferForm({ initialOffer }: { initialOffer?: FlightOffer }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!initialOffer;

  const [imageUrl, setImageUrl] = useState(initialOffer?.imageUrl ?? "");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function fieldState(field: FieldKey): FieldState {
    if (!touched[field]) return "default";
    return fieldErrors[field] ? "invalid" : "valid";
  }

  function revalidate() {
    if (!formRef.current) return {};
    const data = Object.fromEntries(new FormData(formRef.current).entries());
    const errors = validate(data);
    setFieldErrors(errors);
    return errors;
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.currentTarget;
    if (!target) return;
    setTouched((prev) => ({ ...prev, [target.name]: true }));
    revalidate();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setTouched({ from: true, fromCode: true, to: true, toCode: true, price: true, tripType: true, stops: true });
    const errors = revalidate();
    if (Object.keys(errors).length > 0) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const offerData = {
      from: data.from,
      fromCode: data.fromCode.toUpperCase(),
      to: data.to,
      toCode: data.toCode.toUpperCase(),
      price: Number(data.price),
      tripType: data.tripType,
      stops: Number(data.stops),
      imageUrl: imageUrl || undefined,
    };

    setSubmitting(true);
    try {
      if (isEdit) {
        await updateFlightOffer(initialOffer.id, offerData);
        router.push(`/admin/flights?updated=${initialOffer.id}`);
      } else {
        const created = await createFlightOffer(offerData);
        router.push(`/admin/flights?created=${created.id}`);
      }
    } catch {
      setFormError("Could not save this flight offer. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <AdminTextInput
          label="Origin City"
          name="from"
          placeholder="Lagos"
          defaultValue={initialOffer?.from}
          onBlur={handleBlur}
          state={fieldState("from")}
          error={fieldErrors.from}
        />
        <AdminTextInput
          label="Origin Airport Code"
          name="fromCode"
          placeholder="LOS"
          maxLength={3}
          defaultValue={initialOffer?.fromCode}
          onBlur={handleBlur}
          state={fieldState("fromCode")}
          error={fieldErrors.fromCode}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <AdminTextInput
          label="Destination City"
          name="to"
          placeholder="London"
          defaultValue={initialOffer?.to}
          onBlur={handleBlur}
          state={fieldState("to")}
          error={fieldErrors.to}
        />
        <AdminTextInput
          label="Destination Airport Code"
          name="toCode"
          placeholder="LHR"
          maxLength={3}
          defaultValue={initialOffer?.toCode}
          onBlur={handleBlur}
          state={fieldState("toCode")}
          error={fieldErrors.toCode}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <AdminTextInput
          label="Price (₦)"
          name="price"
          type="number"
          min={0}
          defaultValue={initialOffer?.price}
          onBlur={handleBlur}
          state={fieldState("price")}
          error={fieldErrors.price}
        />
        <AdminSelect
          label="Trip Type"
          name="tripType"
          defaultValue={initialOffer?.tripType ?? tripTypes[0]}
          onBlur={handleBlur}
          state={fieldState("tripType")}
          error={fieldErrors.tripType}
        >
          {tripTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </AdminSelect>
        <AdminTextInput
          label="Stops"
          name="stops"
          type="number"
          min={0}
          defaultValue={initialOffer?.stops ?? 0}
          onBlur={handleBlur}
          state={fieldState("stops")}
          error={fieldErrors.stops}
        />
      </div>
      <ImagePickerField label="Image (optional)" name="imageUrl" value={imageUrl} onChange={setImageUrl} />

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Saving…" : isEdit ? "Save Changes" : "Add Flight Offer"}
      </Button>
    </form>
  );
}
