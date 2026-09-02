"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { SavedBanner } from "@/components/admin/saved-banner";
import { Button } from "@/components/ui/button";
import { listBlogPosts, deleteBlogPost } from "@/lib/admin/api/blog";
import { formatAdminDate } from "@/lib/admin/utils/format";
import type { BlogPost } from "@/lib/admin/types";

export default function BlogsListPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listBlogPosts()
      .then(setBlogPosts)
      .catch(() => setError("Could not load blog posts."));
  }, []);

  async function handleDelete(slug: string) {
    await deleteBlogPost(slug);
    setBlogPosts((prev) => (prev ?? []).filter((post) => post.slug !== slug));
  }

  const columns: AdminTableColumn<BlogPost>[] = [
    { key: "title", header: "Title", cell: (post) => post.title },
    { key: "category", header: "Category", cell: (post) => post.category },
    { key: "author", header: "Author", cell: (post) => post.author },
    {
      key: "status",
      header: "Status",
      cell: (post) => (
        <span
          className={`inline-block rounded-[2px] px-2.5 py-1 text-xs font-semibold uppercase tracking-widest ${
            post.status === "published" ? "bg-green-100 text-green-800" : "bg-neutral-200 text-neutral-700"
          }`}
        >
          {post.status}
        </span>
      ),
    },
    { key: "publishedAt", header: "Published", cell: (post) => formatAdminDate(post.publishedAt) },
    {
      key: "actions",
      header: "",
      className: "px-4 py-3 text-right",
      cell: (post) => (
        <div className="flex items-center justify-end">
          <ConfirmDeleteButton onConfirm={() => handleDelete(post.slug)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Blogs"
        description="Blog posts for the Travel & Tours site."
        action={
          <Button href="/admin/blogs/new" size="md">
            New Post
          </Button>
        }
      />

      <SavedBanner createdMessage="Post saved." updatedMessage="Post updated." />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {blogPosts === null ? (
        <div className="rounded-[2px] border border-border-primary p-12 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      ) : (
        <AdminTable
          columns={columns}
          rows={blogPosts}
          rowKey={(post) => post.slug}
          rowHref={(post) => `/admin/blogs/${post.slug}`}
          emptyMessage="No blog posts yet."
        />
      )}
    </div>
  );
}
