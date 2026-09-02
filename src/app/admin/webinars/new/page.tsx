import { AdminPageHeader } from "@/components/admin/page-header";
import { WebinarForm } from "@/components/admin/forms/webinar-form";

export default function NewWebinarPage() {
  return (
    <div>
      <AdminPageHeader title="New Webinar" />
      <WebinarForm />
    </div>
  );
}
