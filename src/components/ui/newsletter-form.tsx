"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className={cn("text-sm text-neutral-300", className)}>
        <span className="font-semibold text-neutral-0">You&rsquo;re on the list.</span>{" "}
        We&rsquo;ll be in touch at {email}.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full max-w-sm gap-2", className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-11 w-full min-w-0 rounded-[2px] border border-neutral-700 bg-transparent px-4 text-sm text-neutral-0 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
      />
      <button
        type="submit"
        className="h-11 shrink-0 rounded-[2px] bg-green-700 px-5 text-sm font-semibold uppercase tracking-wide text-neutral-0 transition-colors hover:bg-green-600"
      >
        Subscribe
      </button>
    </form>
  );
}
