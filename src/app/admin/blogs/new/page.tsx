import { AdminPageHeader } from "@/components/admin/page-header";
import { BlogPostForm } from "@/components/admin/forms/blog-post-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader title="New Blog Post" />
      <BlogPostForm />
    </div>
  );
}
