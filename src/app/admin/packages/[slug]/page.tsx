"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PackageForm } from "@/components/admin/forms/package-form";
import { getPackage } from "@/lib/admin/api/packages";
import { ApiError } from "@/lib/admin/api/client";
import type { TravelPackage } from "@/lib/admin/types";

export default function EditPackagePage() {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPackage(slug)
      .then(setPkg)
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) setNotFound(true);
      });
  }, [slug]);

  if (notFound) {
    return (
      <div>
        <AdminPageHeader title="Package Not Found" />
        <p className="text-sm text-text-secondary">No package matches that slug.</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div>
        <AdminPageHeader title="Loading…" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title={`Edit: ${pkg.name}`} />
      <PackageForm initialPackage={pkg} />
    </div>
  );
}
