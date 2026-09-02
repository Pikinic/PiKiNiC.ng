"use client";

import { useEffect, useRef, useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminIcon } from "@/components/admin/admin-icon";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { listMediaItems, uploadMediaItem, deleteMediaItem } from "@/lib/admin/api/media";
import { formatAdminDateTime } from "@/lib/admin/utils/format";
import type { MediaItem } from "@/lib/admin/types";

export default function MediaLibraryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listMediaItems()
      .then(setMediaItems)
      .catch(() => setError("Could not load the media library."));
  }, []);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const item = await uploadMediaItem(file);
        setMediaItems((prev) => [item, ...(prev ?? [])]);
      }
    } catch {
      setError("Could not upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteMediaItem(id);
    setMediaItems((prev) => (prev ?? []).filter((item) => item.id !== id));
  }

  return (
    <div>
      <AdminPageHeader
        title="Media"
        description="Shared image library — upload once here, then pick from it in any blog, package, or webinar form."
        action={
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-[2px] bg-green-700 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-neutral-0 transition-colors hover:bg-green-800 disabled:opacity-50"
            >
              <AdminIcon icon="plus" className="h-4 w-4" />
              {uploading ? "Uploading…" : "Upload Images"}
            </button>
          </>
        }
      />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {mediaItems === null ? (
        <div className="rounded-[2px] border border-dashed border-border-primary p-16 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="rounded-[2px] border border-dashed border-border-primary p-16 text-center text-sm text-text-tertiary">
          No images uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {mediaItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[2px] border border-border-primary">
              <div className="aspect-square bg-neutral-900/[0.03]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate text-xs font-semibold text-text-primary">{item.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-text-tertiary">
                  {formatAdminDateTime(item.uploadedAt)}
                </p>
                <ConfirmDeleteButton onConfirm={() => handleDelete(item.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
