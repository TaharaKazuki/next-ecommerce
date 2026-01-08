"use cache";

import { Prisma } from "@prisma/client";
import { cacheLife } from "next/cache";

import { prisma } from "./prisma";

export interface GetProductsParams {
  query?: string;
  slug?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export async function getProducts({
  query,
  slug,
  sort,
  page = 1,
  pageSize = 3,
}: GetProductsParams) {
  cacheLife("minutes");
  const where: Prisma.ProductWhereInput = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (slug) {
    where.category = {
      slug: slug,
    };
  }

  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const skip = pageSize ? (page - 1) * pageSize : undefined;
  const take = pageSize;

  return await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take,
  });
}

export async function getProductBySlug(slug: string) {
  cacheLife("hours"); // 1時間キャッシュ

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) return null;

  return product;
}

export async function getCategories() {
  cacheLife("hours"); // カテゴリは頻繁に変更されないため長めにキャッシュ

  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return categories;
}

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};
