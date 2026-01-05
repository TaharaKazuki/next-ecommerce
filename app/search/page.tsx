import { Suspense } from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { searchProducts } from "@/lib/actions";
import { sleep } from "@/lib/utils";

import { ProductCard } from "../ProductCard";
import { ProductsSkeleton } from "../ProductsSkeleton";

type SearchPageProps = {
  searchParams: Promise<{ query?: string; sort?: string }>;
};

async function Products({ query, sort }: { query: string; sort?: string }) {
  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const products = await searchProducts(query, orderBy);

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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const sort = params.sort;

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: `Results for "${query}"`,
      href: `/search?query=${encodeURIComponent(query)}`,
    },
  ];

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={breadcrumbs} />

      <Suspense key={`${query}-${sort}`} fallback={<ProductsSkeleton />}>
        <Products query={query} sort={sort} />
      </Suspense>
    </main>
  );
}
