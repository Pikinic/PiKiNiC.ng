import { z } from "zod";

export const packageCategorySchema = z.enum([
  "Domestic",
  "International",
  "Beach",
  "City Break",
  "Family",
  "Business",
]);

const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
});

export const travelPackageInputSchema = z.object({
  slug: z.string().min(1),
  destination: z.string().min(1),
  country: z.string().min(1),
  name: z.string().min(1),
  categories: z.array(packageCategorySchema),
  priceFrom: z.number().positive(),
  duration: z.string().min(1),
  availability: z.string().min(1),
  summary: z.string().min(1),
  headline: z.string().min(1),
  description: z.array(z.string()),
  included: z.array(z.string()),
  excluded: z.array(z.string()),
  itinerary: z.array(itineraryDaySchema).optional(),
  imageUrls: z.array(z.string()),
});

export const travelPackageUpdateSchema = travelPackageInputSchema.partial().omit({ slug: true });
