import { prisma } from "@/lib/db";
import { uploadImage, destroyImage } from "@/lib/cloudinary";

export function listMediaItems() {
  return prisma.mediaItem.findMany({ orderBy: { uploadedAt: "desc" } });
}

export async function createMediaItem(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadImage(buffer);
  return prisma.mediaItem.create({
    data: {
      url: uploaded.url,
      name: file.name,
      publicId: uploaded.publicId,
      width: uploaded.width,
      height: uploaded.height,
      bytes: uploaded.bytes,
    },
  });
}

export async function deleteMediaItem(id: string) {
  const item = await prisma.mediaItem.findUnique({ where: { id } });
  if (!item) return;
  if (item.publicId) await destroyImage(item.publicId);
  await prisma.mediaItem.delete({ where: { id } });
}
