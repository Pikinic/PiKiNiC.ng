import { AdminPageHeader } from "@/components/admin/page-header";
import { PackageForm } from "@/components/admin/forms/package-form";

export default function NewPackagePage() {
  return (
    <div>
      <AdminPageHeader title="New Travel Package" />
      <PackageForm />
    </div>
  );
}
