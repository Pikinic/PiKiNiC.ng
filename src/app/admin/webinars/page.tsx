"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { SavedBanner } from "@/components/admin/saved-banner";
import { Button } from "@/components/ui/button";
import { listWebinars, deleteWebinar } from "@/lib/admin/api/webinars";
import { formatAdminDateTime } from "@/lib/admin/utils/format";
import type { Webinar } from "@/lib/admin/types";

export default function WebinarsListPage() {
  const [webinars, setWebinars] = useState<Webinar[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listWebinars()
      .then(setWebinars)
      .catch(() => setError("Could not load webinars."));
  }, []);

  async function handleDelete(slug: string) {
    await deleteWebinar(slug);
    setWebinars((prev) => (prev ?? []).filter((webinar) => webinar.slug !== slug));
  }

  const columns: AdminTableColumn<Webinar>[] = [
    { key: "title", header: "Title", cell: (webinar) => webinar.title },
    { key: "host", header: "Host", cell: (webinar) => webinar.host },
    { key: "dateTime", header: "Date & Time", cell: (webinar) => formatAdminDateTime(webinar.dateTime) },
    {
      key: "actions",
      header: "",
      className: "px-4 py-3 text-right",
      cell: (webinar) => (
        <div className="flex items-center justify-end">
          <ConfirmDeleteButton onConfirm={() => handleDelete(webinar.slug)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Webinars"
        description="Landing-page content for upcoming webinars, published on their own subdomain."
        action={
          <Button href="/admin/webinars/new" size="md">
            New Webinar
          </Button>
        }
      />

      <SavedBanner createdMessage="Webinar created." updatedMessage="Webinar updated." />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {webinars === null ? (
        <div className="rounded-[2px] border border-border-primary p-12 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      ) : (
        <AdminTable
          columns={columns}
          rows={webinars}
          rowKey={(webinar) => webinar.slug}
          rowHref={(webinar) => `/admin/webinars/${webinar.slug}`}
          emptyMessage="No webinars yet."
        />
      )}
    </div>
  );
}
