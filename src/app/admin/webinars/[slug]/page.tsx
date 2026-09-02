"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { WebinarForm } from "@/components/admin/forms/webinar-form";
import { getWebinar } from "@/lib/admin/api/webinars";
import { ApiError } from "@/lib/admin/api/client";
import type { Webinar } from "@/lib/admin/types";

export default function EditWebinarPage() {
  const { slug } = useParams<{ slug: string }>();
  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getWebinar(slug)
      .then(setWebinar)
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) setNotFound(true);
      });
  }, [slug]);

  if (notFound) {
    return (
      <div>
        <AdminPageHeader title="Webinar Not Found" />
        <p className="text-sm text-text-secondary">No webinar matches that slug.</p>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div>
        <AdminPageHeader title="Loading…" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title={`Edit: ${webinar.title}`} />
      <WebinarForm initialWebinar={webinar} />
    </div>
  );
}
