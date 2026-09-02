"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { BlogPostForm } from "@/components/admin/forms/blog-post-form";
import { getBlogPost } from "@/lib/admin/api/blog";
import { ApiError } from "@/lib/admin/api/client";
import type { BlogPost } from "@/lib/admin/types";

export default function EditBlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getBlogPost(slug)
      .then(setPost)
      .catch((error) => {
        if (error instanceof ApiError && error.status === 404) setNotFound(true);
      });
  }, [slug]);

  if (notFound) {
    return (
      <div>
        <AdminPageHeader title="Post Not Found" />
        <p className="text-sm text-text-secondary">No blog post matches that slug.</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <AdminPageHeader title="Loading…" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title={`Edit: ${post.title}`} />
      <BlogPostForm initialPost={post} />
    </div>
  );
}
