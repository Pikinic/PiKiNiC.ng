"use client";

import { useState, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { AdminIcon } from "@/components/admin/admin-icon";
import { MediaPickerModal } from "@/components/admin/media-picker-modal";
import { cn } from "@/lib/utils";

export type FieldState = "default" | "invalid" | "valid";

function fieldBorder(state?: FieldState) {
  if (state === "invalid") return "border-red-500";
  if (state === "valid") return "border-green-600";
  return "border-border-primary";
}

type BaseFieldProps = {
  label: string;
  name: string;
  error?: string;
  state?: FieldState;
};

export function AdminTextInput({
  label,
  name,
  error,
  state,
  className,
  ...props
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={name}
          name={name}
          aria-invalid={state === "invalid"}
          className={cn(
            "h-11 w-full rounded-[2px] border bg-surface-primary px-4 pr-10 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700",
            fieldBorder(state),
            className
          )}
          {...props}
        />
        {state === "valid" && (
          <AdminIcon
            icon="check"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600"
          />
        )}
      </div>
      {state === "invalid" && error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function AdminTextArea({
  label,
  name,
  error,
  state,
  className,
  ...props
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        aria-invalid={state === "invalid"}
        className={cn(
          "mt-2 w-full rounded-[2px] border bg-surface-primary px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700",
          fieldBorder(state),
          className
        )}
        {...props}
      />
      {state === "invalid" && error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function AdminSelect({
  label,
  name,
  error,
  state,
  className,
  children,
  ...props
}: BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={name}
          name={name}
          aria-invalid={state === "invalid"}
          className={cn(
            "h-11 w-full appearance-none rounded-[2px] border bg-surface-primary px-4 pr-10 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700",
            fieldBorder(state),
            className
          )}
          {...props}
        >
          {children}
        </select>
        <AdminIcon
          icon="chevron-down"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
        />
      </div>
      {state === "invalid" && error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function ImagePickerField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div>
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <input type="hidden" name={name} value={value} />
      <div className="mt-2 flex items-start gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-border-primary bg-neutral-900/[0.03]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[10px] uppercase tracking-widest text-text-tertiary">No image</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="rounded-[2px] border border-border-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-text-primary transition-colors hover:bg-neutral-900/[0.04]"
          >
            {value ? "Change Image" : "Choose Image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs font-semibold uppercase tracking-widest text-text-tertiary transition-colors hover:text-red-600"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {pickerOpen && (
        <MediaPickerModal
          onSelect={(url) => {
            onChange(url);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}
