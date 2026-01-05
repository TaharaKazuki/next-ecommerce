import { Suspense } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductsSkeleton } from "@/app/ProductsSkeleton";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategorySidebar } from "@/components/category-sidebar";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";

import { ProductCard } from "../../ProductCard";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

async function Products({ slug, sort }: { slug: string; sort?: string }) {
  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug,
      },
    },
    ...(orderBy ? { orderBy } : {}),
    take: 18,
  });

  await sleep(1000);

  if (products.length === 0) {
    return (
      <div className="text-muted-foreground text-center">
        No products found.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: category.name,
      href: `/search/${category.slug}`,
    },
  ];

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8 flex gap-3 text-sm">
        <Link href={`/search/${slug}`}>Latest</Link>
        <Link href={`/search/${slug}?sort=price-asc`}>Price: Low to High</Link>
        <Link href={`/search/${slug}?sort=price-desc`}>Price: High to Low</Link>
      </div>

      <div className="flex gap-8">
        <Suspense fallback={<div className="w-[125px]">Loading...</div>}>
          <CategorySidebar />
        </Suspense>

        <div className="flex-1">
          <Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
            <Products slug={slug} sort={sort} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
