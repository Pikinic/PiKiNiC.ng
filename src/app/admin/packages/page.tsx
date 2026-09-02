"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { SavedBanner } from "@/components/admin/saved-banner";
import { Button } from "@/components/ui/button";
import { listPackages, deletePackage } from "@/lib/admin/api/packages";
import { formatNaira } from "@/lib/admin/utils/format";
import type { TravelPackage } from "@/lib/admin/types";

export default function PackagesListPage() {
  const [packages, setPackages] = useState<TravelPackage[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listPackages()
      .then(setPackages)
      .catch(() => setError("Could not load packages."));
  }, []);

  async function handleDelete(slug: string) {
    await deletePackage(slug);
    setPackages((prev) => (prev ?? []).filter((pkg) => pkg.slug !== slug));
  }

  const columns: AdminTableColumn<TravelPackage>[] = [
    { key: "name", header: "Package", cell: (pkg) => pkg.name },
    { key: "destination", header: "Destination", cell: (pkg) => `${pkg.destination}, ${pkg.country}` },
    { key: "categories", header: "Categories", cell: (pkg) => pkg.categories.join(", ") },
    { key: "priceFrom", header: "Price From", cell: (pkg) => formatNaira(pkg.priceFrom) },
    {
      key: "actions",
      header: "",
      className: "px-4 py-3 text-right",
      cell: (pkg) => (
        <div className="flex items-center justify-end">
          <ConfirmDeleteButton onConfirm={() => handleDelete(pkg.slug)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Travel Packages"
        description="Curated packages shown on the Travel & Tours site."
        action={
          <Button href="/admin/packages/new" size="md">
            New Package
          </Button>
        }
      />

      <SavedBanner createdMessage="Package added." updatedMessage="Package updated." />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {packages === null ? (
        <div className="rounded-[2px] border border-border-primary p-12 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      ) : (
        <AdminTable
          columns={columns}
          rows={packages}
          rowKey={(pkg) => pkg.slug}
          rowHref={(pkg) => `/admin/packages/${pkg.slug}`}
          emptyMessage="No packages yet."
        />
      )}
    </div>
  );
}
