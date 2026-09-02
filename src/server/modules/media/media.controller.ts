import { ok, fail } from "@/lib/api-response";
import { requireAdminSession } from "@/lib/auth/session";
import * as mediaService from "@/server/modules/media/media.service";

export async function list() {
  const session = await requireAdminSession();
  if (!session) return fail("Unauthorized.", 401);

  try {
    const items = await mediaService.listMediaItems();
    return ok(items);
  } catch (error) {
    console.error("List media items error:", error);
    return fail("Could not load media items.", 500);
  }
}

export async function upload(request: Request) {
  const session = await requireAdminSession();
  if (!session) return fail("Unauthorized.", 401);

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return fail("A file is required.", 400);

    const item = await mediaService.createMediaItem(file);
    return ok(item, 201);
  } catch (error) {
    console.error("Upload media item error:", error);
    return fail("Could not upload image.", 500);
  }
}

export async function remove(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) return fail("Unauthorized.", 401);

  try {
    const { id } = await params;
    await mediaService.deleteMediaItem(id);
    return ok({ ok: true });
  } catch (error) {
    console.error("Delete media item error:", error);
    return fail("Could not delete media item.", 500);
  }
}
