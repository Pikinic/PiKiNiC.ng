"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { AdminIcon } from "@/components/admin/admin-icon";
import { AdminTextArea, AdminTextInput, ImagePickerField, type FieldState } from "@/components/admin/fields";
import { createWebinar, updateWebinar } from "@/lib/admin/api/webinars";
import { slugify } from "@/lib/admin/utils/slugify";
import type { Webinar, WebinarAgendaItem } from "@/lib/admin/types";

type FieldKey = "title" | "tagline" | "dateTime" | "host" | "description" | "registrationLabel" | "registrationUrl";
type FieldErrors = Partial<Record<FieldKey, string>>;

function validate(data: Record<string, FormDataEntryValue>): FieldErrors {
  const errors: FieldErrors = {};
  if (!String(data.title ?? "").trim()) errors.title = "Title is required.";
  if (!String(data.tagline ?? "").trim()) errors.tagline = "Tagline is required.";
  if (!String(data.dateTime ?? "").trim()) errors.dateTime = "Date and time are required.";
  if (!String(data.host ?? "").trim()) errors.host = "Host is required.";
  if (!String(data.description ?? "").trim()) errors.description = "Description is required.";
  if (!String(data.registrationLabel ?? "").trim()) errors.registrationLabel = "Button label is required.";
  if (!String(data.registrationUrl ?? "").trim()) errors.registrationUrl = "Registration link is required.";
  return errors;
}

export function WebinarForm({ initialWebinar }: { initialWebinar?: Webinar }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!initialWebinar;

  const [coverImageUrl, setCoverImageUrl] = useState(initialWebinar?.coverImageUrl ?? "");
  const [agenda, setAgenda] = useState<WebinarAgendaItem[]>(initialWebinar?.agenda ?? []);
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

  function addAgendaItem() {
    setAgenda((prev) => [...prev, { time: "", title: "" }]);
  }

  function updateAgendaItem(index: number, changes: Partial<WebinarAgendaItem>) {
    setAgenda((prev) => prev.map((item, i) => (i === index ? { ...item, ...changes } : item)));
  }

  function removeAgendaItem(index: number) {
    setAgenda((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setTouched({
      title: true, tagline: true, dateTime: true, host: true,
      description: true, registrationLabel: true, registrationUrl: true,
    });
    const errors = revalidate();
    if (Object.keys(errors).length > 0) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const webinar: Webinar = {
      slug: initialWebinar?.slug ?? slugify(data.title),
      title: data.title,
      tagline: data.tagline,
      coverImageUrl,
      dateTime: data.dateTime,
      host: data.host,
      description: data.description,
      agenda: agenda.length > 0 ? agenda : undefined,
      registrationLabel: data.registrationLabel,
      registrationUrl: data.registrationUrl,
    };

    setSubmitting(true);
    try {
      if (isEdit) {
        await updateWebinar(webinar.slug, webinar);
        router.push(`/admin/webinars?updated=${webinar.slug}`);
      } else {
        const created = await createWebinar(webinar);
        router.push(`/admin/webinars?created=${created.slug}`);
      }
    } catch {
      setFormError("Could not save this webinar. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="max-w-2xl space-y-5">
      <AdminTextInput
        label="Title"
        name="title"
        placeholder="UK Study Abroad: September Info Session"
        defaultValue={initialWebinar?.title}
        onBlur={handleBlur}
        state={fieldState("title")}
        error={fieldErrors.title}
      />
      <AdminTextInput
        label="Tagline"
        name="tagline"
        placeholder="Everything you need to apply for the January intake."
        defaultValue={initialWebinar?.tagline}
        onBlur={handleBlur}
        state={fieldState("tagline")}
        error={fieldErrors.tagline}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <AdminTextInput
          label="Date & Time"
          name="dateTime"
          type="datetime-local"
          defaultValue={initialWebinar?.dateTime.slice(0, 16)}
          onBlur={handleBlur}
          state={fieldState("dateTime")}
          error={fieldErrors.dateTime}
        />
        <AdminTextInput
          label="Host"
          name="host"
          defaultValue={initialWebinar?.host ?? "Adeniyi Akintoye"}
          onBlur={handleBlur}
          state={fieldState("host")}
          error={fieldErrors.host}
        />
      </div>
      <AdminTextArea
        label="Description"
        name="description"
        rows={4}
        defaultValue={initialWebinar?.description}
        onBlur={handleBlur}
        state={fieldState("description")}
        error={fieldErrors.description}
      />

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-primary">Agenda (optional)</label>
          <button
            type="button"
            onClick={addAgendaItem}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-green-700 hover:text-green-800"
          >
            <AdminIcon icon="plus" className="h-3.5 w-3.5" />
            Add Item
          </button>
        </div>
        {agenda.length > 0 && (
          <div className="mt-3 space-y-2">
            {agenda.map((item, index) => (
              <div key={index} className="flex items-center gap-2 rounded-[2px] border border-border-primary p-3">
                <input
                  type="text"
                  placeholder="6:00 PM"
                  value={item.time}
                  onChange={(e) => updateAgendaItem(index, { time: e.target.value })}
                  className="h-9 w-28 shrink-0 rounded-[2px] border border-border-primary bg-surface-primary px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                />
                <input
                  type="text"
                  placeholder="Session title"
                  value={item.title}
                  onChange={(e) => updateAgendaItem(index, { title: e.target.value })}
                  className="h-9 flex-1 rounded-[2px] border border-border-primary bg-surface-primary px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                />
                <button
                  type="button"
                  onClick={() => removeAgendaItem(index)}
                  className="text-text-tertiary transition-colors hover:text-red-600"
                  aria-label="Remove agenda item"
                >
                  <AdminIcon icon="trash" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <AdminTextInput
          label="Registration Button Label"
          name="registrationLabel"
          placeholder="Reserve Your Spot"
          defaultValue={initialWebinar?.registrationLabel ?? "Reserve Your Spot"}
          onBlur={handleBlur}
          state={fieldState("registrationLabel")}
          error={fieldErrors.registrationLabel}
        />
        <AdminTextInput
          label="Registration Link"
          name="registrationUrl"
          placeholder="https://pikinic.ng/contact"
          defaultValue={initialWebinar?.registrationUrl}
          onBlur={handleBlur}
          state={fieldState("registrationUrl")}
          error={fieldErrors.registrationUrl}
        />
      </div>

      <ImagePickerField label="Cover Image" name="coverImageUrl" value={coverImageUrl} onChange={setCoverImageUrl} />

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Saving…" : isEdit ? "Save Changes" : "Create Webinar"}
      </Button>
    </form>
  );
}
