"use cache";

import { cacheLife } from "next/cache";

import { prisma } from "./prisma";

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

export async function getProducts(page: number, pageSize: number) {
  cacheLife("minutes"); // 数分キャッシュ（商品一覧は頻繁に更新される可能性）

  const skip = (page - 1) * pageSize;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: pageSize,
    }),
    prisma.product.count(),
  ]);

  return { products, total };
}

export async function searchProducts(
  query: string,
  orderBy: Record<string, "asc" | "desc"> | undefined = undefined
) {
  cacheLife("minutes"); // 検索結果を数分キャッシュ

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    ...(orderBy ? { orderBy } : {}),
    take: 18,
  });

  return products;
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
