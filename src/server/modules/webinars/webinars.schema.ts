import { z } from "zod";

const webinarAgendaItemSchema = z.object({
  time: z.string().min(1),
  title: z.string().min(1),
});

export const webinarInputSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  coverImageUrl: z.string(),
  dateTime: z.string().min(1),
  host: z.string().min(1),
  description: z.string().min(1),
  agenda: z.array(webinarAgendaItemSchema).optional(),
  registrationLabel: z.string().min(1),
  registrationUrl: z.string().min(1),
});

export const webinarUpdateSchema = webinarInputSchema.partial().omit({ slug: true });
