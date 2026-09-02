"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { AdminIcon } from "@/components/admin/admin-icon";
import { AdminTextArea, AdminTextInput, type FieldState } from "@/components/admin/fields";
import { MediaPickerModal } from "@/components/admin/media-picker-modal";
import { createPackage, updatePackage } from "@/lib/admin/api/packages";
import { slugify } from "@/lib/admin/utils/slugify";
import type { ItineraryDay, PackageCategory, TravelPackage } from "@/lib/admin/types";

const allCategories: PackageCategory[] = ["Domestic", "International", "Beach", "City Break", "Family", "Business"];

type FieldKey = "destination" | "country" | "name" | "priceFrom" | "duration" | "summary" | "headline" | "description" | "included" | "excluded";
type FieldErrors = Partial<Record<FieldKey, string>>;

function validate(data: Record<string, FormDataEntryValue>): FieldErrors {
  const errors: FieldErrors = {};
  if (!String(data.destination ?? "").trim()) errors.destination = "Destination is required.";
  if (!String(data.country ?? "").trim()) errors.country = "Country is required.";
  if (!String(data.name ?? "").trim()) errors.name = "Package name is required.";
  const price = Number(data.priceFrom);
  if (!data.priceFrom || Number.isNaN(price) || price <= 0) errors.priceFrom = "Enter a valid starting price.";
  if (!String(data.duration ?? "").trim()) errors.duration = "Duration is required.";
  if (!String(data.summary ?? "").trim()) errors.summary = "Summary is required.";
  if (!String(data.headline ?? "").trim()) errors.headline = "Headline is required.";
  if (!String(data.description ?? "").trim()) errors.description = "Add at least one description line.";
  if (!String(data.included ?? "").trim()) errors.included = "Add at least one included item.";
  if (!String(data.excluded ?? "").trim()) errors.excluded = "Add at least one excluded item.";
  return errors;
}

export function PackageForm({ initialPackage }: { initialPackage?: TravelPackage }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!initialPackage;

  const [imageUrls, setImageUrls] = useState<string[]>(initialPackage?.imageUrls ?? []);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(initialPackage?.itinerary ?? []);
  const [pickerOpen, setPickerOpen] = useState(false);
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

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.currentTarget;
    if (!target) return;
    setTouched((prev) => ({ ...prev, [target.name]: true }));
    revalidate();
  }

  function addItineraryDay() {
    setItinerary((prev) => [...prev, { day: prev.length + 1, title: "", description: "" }]);
  }

  function updateItineraryDay(index: number, changes: Partial<ItineraryDay>) {
    setItinerary((prev) => prev.map((day, i) => (i === index ? { ...day, ...changes } : day)));
  }

  function removeItineraryDay(index: number) {
    setItinerary((prev) => prev.filter((_, i) => i !== index).map((day, i) => ({ ...day, day: i + 1 })));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setTouched({
      destination: true, country: true, name: true, priceFrom: true, duration: true,
      summary: true, headline: true, description: true, included: true, excluded: true,
    });
    const errors = revalidate();
    if (Object.keys(errors).length > 0) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const categories = new FormData(form).getAll("categories") as PackageCategory[];

    const pkg: TravelPackage = {
      slug: initialPackage?.slug ?? slugify(data.name),
      destination: data.destination,
      country: data.country,
      name: data.name,
      categories,
      priceFrom: Number(data.priceFrom),
      duration: data.duration,
      availability: data.availability || "Contact us for available dates",
      summary: data.summary,
      headline: data.headline,
      description: data.description.split("\n").map((l) => l.trim()).filter(Boolean),
      included: data.included.split("\n").map((l) => l.trim()).filter(Boolean),
      excluded: data.excluded.split("\n").map((l) => l.trim()).filter(Boolean),
      itinerary: itinerary.length > 0 ? itinerary : undefined,
      imageUrls,
    };

    setSubmitting(true);
    try {
      if (isEdit) {
        await updatePackage(pkg.slug, pkg);
        router.push(`/admin/packages?updated=${pkg.slug}`);
      } else {
        const created = await createPackage(pkg);
        router.push(`/admin/packages?created=${created.slug}`);
      }
    } catch {
      setFormError("Could not save this package. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="max-w-2xl space-y-8">
      {/* Header — matches the eyebrow + H1 + subhead at the top of the
          live package detail page (packages/[slug]/page.tsx). */}
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminTextInput
            label="Destination"
            name="destination"
            placeholder="Dubai"
            defaultValue={initialPackage?.destination}
            onBlur={handleBlur}
            state={fieldState("destination")}
            error={fieldErrors.destination}
          />
          <AdminTextInput
            label="Country"
            name="country"
            placeholder="United Arab Emirates"
            defaultValue={initialPackage?.country}
            onBlur={handleBlur}
            state={fieldState("country")}
            error={fieldErrors.country}
          />
        </div>
        <AdminTextInput
          label="Package Name"
          name="name"
          placeholder="Dubai Getaway"
          defaultValue={initialPackage?.name}
          onBlur={handleBlur}
          state={fieldState("name")}
          error={fieldErrors.name}
        />
        <AdminTextInput
          label="Headline"
          name="headline"
          placeholder="Dubai, done properly."
          defaultValue={initialPackage?.headline}
          onBlur={handleBlur}
          state={fieldState("headline")}
          error={fieldErrors.headline}
        />
        <p className="text-xs text-text-tertiary">
          Destination/country, name, and headline appear together at the top of the detail page,
          in this order.
        </p>
      </div>

      {/* Gallery — the package's photos. */}
      <div>
        <label className="text-sm font-medium text-text-primary">Gallery Images</label>
        <div className="mt-2 flex flex-wrap gap-3">
          {imageUrls.map((url, index) => (
            <div key={index} className="group relative h-20 w-20 overflow-hidden rounded-[2px] border border-border-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setImageUrls((prev) => prev.filter((_, i) => i !== index))}
                className="absolute inset-0 flex items-center justify-center bg-neutral-900/60 text-neutral-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <AdminIcon icon="trash" className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-[2px] border border-dashed border-border-primary text-text-tertiary transition-colors hover:border-green-600 hover:text-green-700"
          >
            <AdminIcon icon="plus" className="h-4 w-4" />
            <span className="text-[10px] uppercase tracking-widest">Add</span>
          </button>
        </div>
      </div>
      {pickerOpen && (
        <MediaPickerModal
          onSelect={(url) => {
            setImageUrls((prev) => [...prev, url]);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}

      {/* Trip vitals — matches the bordered price/duration/availability card
          next to the header on the live page. */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Trip Vitals
        </h3>
        <div className="grid gap-5 sm:grid-cols-3">
          <AdminTextInput
            label="Price From (₦)"
            name="priceFrom"
            type="number"
            min={0}
            defaultValue={initialPackage?.priceFrom}
            onBlur={handleBlur}
            state={fieldState("priceFrom")}
            error={fieldErrors.priceFrom}
          />
          <AdminTextInput
            label="Duration"
            name="duration"
            placeholder="5 nights"
            defaultValue={initialPackage?.duration}
            onBlur={handleBlur}
            state={fieldState("duration")}
            error={fieldErrors.duration}
          />
          <AdminTextInput
            label="Availability"
            name="availability"
            placeholder="Contact us for available dates"
            defaultValue={initialPackage?.availability}
          />
        </div>
      </div>

      {/* Main body — matches the left column of the detail page: prose
          description, then the optional itinerary below it. */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Description
        </h3>
        <AdminTextArea
          label="Description (one line per paragraph)"
          name="description"
          rows={4}
          defaultValue={initialPackage?.description.join("\n")}
          onBlur={handleBlur}
          state={fieldState("description")}
          error={fieldErrors.description}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Itinerary (optional)
          </h3>
          <button
            type="button"
            onClick={addItineraryDay}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-green-700 hover:text-green-800"
          >
            <AdminIcon icon="plus" className="h-3.5 w-3.5" />
            Add Day
          </button>
        </div>
        {itinerary.length > 0 && (
          <div className="mt-3 space-y-3">
            {itinerary.map((day, index) => (
              <div key={index} className="rounded-[2px] border border-border-primary p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                    Day {day.day}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(index)}
                    className="text-xs font-semibold uppercase tracking-widest text-text-tertiary hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Day title"
                    value={day.title}
                    onChange={(e) => updateItineraryDay(index, { title: e.target.value })}
                    className="h-10 w-full rounded-[2px] border border-border-primary bg-surface-primary px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                  />
                  <textarea
                    placeholder="Day description"
                    rows={2}
                    value={day.description}
                    onChange={(e) => updateItineraryDay(index, { description: e.target.value })}
                    className="w-full rounded-[2px] border border-border-primary bg-surface-primary px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right-column lists on the live page — shown parallel to the
          description/itinerary, not below them. */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Included / Not Included
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminTextArea
            label="Included (one per line)"
            name="included"
            rows={4}
            defaultValue={initialPackage?.included.join("\n")}
            onBlur={handleBlur}
            state={fieldState("included")}
            error={fieldErrors.included}
          />
          <AdminTextArea
            label="Excluded (one per line)"
            name="excluded"
            rows={4}
            defaultValue={initialPackage?.excluded.join("\n")}
            onBlur={handleBlur}
            state={fieldState("excluded")}
            error={fieldErrors.excluded}
          />
        </div>
      </div>

      {/* Categories — used only to filter the /packages listing page;
          not displayed anywhere on the detail page itself. */}
      <div>
        <label className="text-sm font-medium text-text-primary">Categories</label>
        <p className="mt-1 text-xs text-text-tertiary">
          Used to filter the packages listing page — not shown on the package&rsquo;s own detail page.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 rounded-[2px] border border-border-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-text-primary has-[:checked]:border-green-600 has-[:checked]:bg-green-50 has-[:checked]:text-green-800"
            >
              <input
                type="checkbox"
                name="categories"
                value={category}
                defaultChecked={initialPackage?.categories.includes(category)}
                className="h-3.5 w-3.5 accent-green-700"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <AdminTextArea
        label="Summary"
        name="summary"
        rows={2}
        defaultValue={initialPackage?.summary}
        onBlur={handleBlur}
        state={fieldState("summary")}
        error={fieldErrors.summary}
      />

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Saving…" : isEdit ? "Save Changes" : "Add Package"}
      </Button>
    </form>
  );
}
