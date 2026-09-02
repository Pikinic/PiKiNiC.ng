"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { AdminTextInput, type FieldState } from "@/components/admin/fields";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = "email" | "password";
type FieldErrors = Partial<Record<FieldKey, string>>;

function validate(data: Record<string, FormDataEntryValue>): FieldErrors {
  const errors: FieldErrors = {};
  const email = String(data.email ?? "").trim();
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (!String(data.password ?? "")) errors.password = "Password is required.";
  return errors;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    if (!target) return;
    setTouched((prev) => ({ ...prev, [target.name]: true }));
    revalidate();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setTouched({ email: true, password: true });
    const errors = revalidate();
    if (Object.keys(errors).length > 0) return;

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSubmitting(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setSubmitting(false);

    if (result?.error) {
      setFormError("Incorrect email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-text-primary">Admin Sign In</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Sign in with your Pikinic admin account.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <AdminTextInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            onBlur={handleBlur}
            state={fieldState("email")}
            error={fieldErrors.email}
          />
          <AdminTextInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            onBlur={handleBlur}
            state={fieldState("password")}
            error={fieldErrors.password}
          />
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
