import type { Prisma, BlogPost as DbBlogPost, BlogCategory as DbBlogCategory } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { blogPostInputSchema, blogPostUpdateSchema } from "@/server/modules/blog/blog.schema";
import type { z } from "zod";

type AppBlogCategory = z.infer<typeof blogPostInputSchema>["category"];

const CATEGORY_TO_DB: Record<AppBlogCategory, DbBlogCategory> = {
  "Travel Tips": "TravelTips",
  "Visa & Documentation": "VisaAndDocumentation",
  "Money & Fares": "MoneyAndFares",
  "Destination Guides": "DestinationGuides",
};

const CATEGORY_FROM_DB: Record<DbBlogCategory, AppBlogCategory> = {
  TravelTips: "Travel Tips",
  VisaAndDocumentation: "Visa & Documentation",
  MoneyAndFares: "Money & Fares",
  DestinationGuides: "Destination Guides",
};

function toAppBlogPost<T extends DbBlogPost>(post: T) {
  return { ...post, category: CATEGORY_FROM_DB[post.category] };
}

export async function listPublishedBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published", publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: "desc" },
  });
  return posts.map(toAppBlogPost);
}

export async function listAllBlogPosts() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
  return posts.map(toAppBlogPost);
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: "published", publishedAt: { lte: new Date() } },
  });
  return post ? toAppBlogPost(post) : null;
}

export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  return post ? toAppBlogPost(post) : null;
}

export async function createBlogPost(input: unknown) {
  const data = blogPostInputSchema.parse(input);
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      category: CATEGORY_TO_DB[data.category],
      publishedAt: new Date(data.publishedAt),
      content: data.content as Prisma.InputJsonValue,
    },
  });
  return toAppBlogPost(post);
}

export async function updateBlogPost(slug: string, input: unknown) {
  const data = blogPostUpdateSchema.parse(input);
  const post = await prisma.blogPost.update({
    where: { slug },
    data: {
      ...data,
      category: data.category ? CATEGORY_TO_DB[data.category] : undefined,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      content: data.content ? (data.content as Prisma.InputJsonValue) : undefined,
    },
  });
  return toAppBlogPost(post);
}

export async function deleteBlogPost(slug: string) {
  await prisma.blogPost.delete({ where: { slug } });
}
