"use client";

import { useEffect, useRef, useState } from "react";
import { AdminIcon } from "@/components/admin/admin-icon";
import { listMediaItems, uploadMediaItem } from "@/lib/admin/api/media";
import type { MediaItem } from "@/lib/admin/types";

export function MediaPickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-900/60 p-6">
      <div className="flex max-h-[80vh] w-full max-w-3xl flex-col rounded-[2px] border border-border-primary bg-surface-primary">
        <div className="flex items-center justify-between border-b border-border-primary px-6 py-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-text-primary">
            Choose an Image
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-[2px] text-text-tertiary transition-colors hover:bg-neutral-900/[0.06] hover:text-text-primary"
          >
            <AdminIcon icon="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-border-primary px-6 py-4">
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
            className="flex items-center gap-2 rounded-[2px] border border-border-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-text-primary transition-colors hover:bg-neutral-900/[0.04] disabled:opacity-50"
          >
            <AdminIcon icon="plus" className="h-3.5 w-3.5" />
            {uploading ? "Uploading…" : "Upload Image"}
          </button>
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {mediaItems === null ? (
            <div className="rounded-[2px] border border-dashed border-border-primary p-10 text-center text-sm text-text-tertiary">
              Loading…
            </div>
          ) : mediaItems.length === 0 ? (
            <div className="rounded-[2px] border border-dashed border-border-primary p-10 text-center text-sm text-text-tertiary">
              No images uploaded yet. Upload one above to get started.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {mediaItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.url)}
                  className="group relative aspect-square overflow-hidden rounded-[2px] border border-border-primary transition-colors hover:border-green-600"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-neutral-900/70 px-2 py-1 text-[10px] text-neutral-0 opacity-0 transition-opacity group-hover:opacity-100">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
