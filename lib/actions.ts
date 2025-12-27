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
