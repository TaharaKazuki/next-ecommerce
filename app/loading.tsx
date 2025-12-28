import { BreadcrumbsSkeleton } from "@/components/bredcrumbs-skeleton";

import { ProductsSkeleton } from "./ProductsSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <BreadcrumbsSkeleton />
      <ProductsSkeleton />
    </main>
  );
}
