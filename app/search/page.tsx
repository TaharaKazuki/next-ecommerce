import { Suspense } from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";

import ProductsSkeleton from "../ProductsSkeleton";

type SearchPageProps = {
  searchParams: Promise<{ query?: string; sort?: string }>;
};

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
        <ProductListServerWrapper params={{ query, sort }} />
      </Suspense>
    </main>
  );
}
