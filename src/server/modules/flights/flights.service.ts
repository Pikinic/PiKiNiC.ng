import { prisma } from "@/lib/db";
import { flightOfferInputSchema, flightOfferUpdateSchema } from "@/server/modules/flights/flights.schema";

export function listFlightOffers() {
  return prisma.flightOffer.findMany({ orderBy: { createdAt: "desc" } });
}

export function getFlightOfferById(id: string) {
  return prisma.flightOffer.findUnique({ where: { id } });
}

export async function createFlightOffer(input: unknown) {
  const data = flightOfferInputSchema.parse(input);
  return prisma.flightOffer.create({ data });
}

export async function updateFlightOffer(id: string, input: unknown) {
  const data = flightOfferUpdateSchema.parse(input);
  return prisma.flightOffer.update({ where: { id }, data });
}

export async function deleteFlightOffer(id: string) {
  await prisma.flightOffer.delete({ where: { id } });
}
