import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { webinarInputSchema, webinarUpdateSchema } from "@/server/modules/webinars/webinars.schema";

export function listWebinars() {
  return prisma.webinar.findMany({ orderBy: { dateTime: "asc" } });
}

export function getWebinarBySlug(slug: string) {
  return prisma.webinar.findUnique({ where: { slug } });
}

export async function createWebinar(input: unknown) {
  const data = webinarInputSchema.parse(input);
  return prisma.webinar.create({
    data: {
      ...data,
      dateTime: new Date(data.dateTime),
      agenda: data.agenda ? (data.agenda as Prisma.InputJsonValue) : undefined,
      metrics: data.metrics ? (data.metrics as Prisma.InputJsonValue) : undefined,
      testimonials: data.testimonials ? (data.testimonials as Prisma.InputJsonValue) : undefined,
    },
  });
}

export async function updateWebinar(slug: string, input: unknown) {
  const data = webinarUpdateSchema.parse(input);
  return prisma.webinar.update({
    where: { slug },
    data: {
      ...data,
      dateTime: data.dateTime ? new Date(data.dateTime) : undefined,
      agenda: data.agenda ? (data.agenda as Prisma.InputJsonValue) : undefined,
      metrics: data.metrics ? (data.metrics as Prisma.InputJsonValue) : undefined,
      testimonials: data.testimonials ? (data.testimonials as Prisma.InputJsonValue) : undefined,
    },
  });
}

export async function deleteWebinar(slug: string) {
  await prisma.webinar.delete({ where: { slug } });
}
