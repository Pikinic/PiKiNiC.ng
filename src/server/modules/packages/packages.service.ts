import type { Prisma, TravelPackage as DbTravelPackage, PackageCategory as DbPackageCategory } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { travelPackageInputSchema, travelPackageUpdateSchema } from "@/server/modules/packages/packages.schema";
import type { z } from "zod";

type AppPackageCategory = z.infer<typeof travelPackageInputSchema>["categories"][number];

const CATEGORY_TO_DB: Record<AppPackageCategory, DbPackageCategory> = {
  Domestic: "Domestic",
  International: "International",
  Beach: "Beach",
  "City Break": "CityBreak",
  Family: "Family",
  Business: "Business",
};

const CATEGORY_FROM_DB: Record<DbPackageCategory, AppPackageCategory> = {
  Domestic: "Domestic",
  International: "International",
  Beach: "Beach",
  CityBreak: "City Break",
  Family: "Family",
  Business: "Business",
};

function toAppPackage<T extends DbTravelPackage>(pkg: T) {
  return { ...pkg, categories: pkg.categories.map((category) => CATEGORY_FROM_DB[category]) };
}

export async function listPackages() {
  const packages = await prisma.travelPackage.findMany({ orderBy: { createdAt: "desc" } });
  return packages.map(toAppPackage);
}

export async function getPackageBySlug(slug: string) {
  const pkg = await prisma.travelPackage.findUnique({ where: { slug } });
  return pkg ? toAppPackage(pkg) : null;
}

export async function createPackage(input: unknown) {
  const data = travelPackageInputSchema.parse(input);
  const pkg = await prisma.travelPackage.create({
    data: {
      ...data,
      categories: data.categories.map((category) => CATEGORY_TO_DB[category]),
      itinerary: data.itinerary ? (data.itinerary as Prisma.InputJsonValue) : undefined,
    },
  });
  return toAppPackage(pkg);
}

export async function updatePackage(slug: string, input: unknown) {
  const data = travelPackageUpdateSchema.parse(input);
  const pkg = await prisma.travelPackage.update({
    where: { slug },
    data: {
      ...data,
      categories: data.categories ? data.categories.map((category) => CATEGORY_TO_DB[category]) : undefined,
      itinerary: data.itinerary ? (data.itinerary as Prisma.InputJsonValue) : undefined,
    },
  });
  return toAppPackage(pkg);
}

export async function deletePackage(slug: string) {
  await prisma.travelPackage.delete({ where: { slug } });
}
