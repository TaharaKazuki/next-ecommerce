import { ProductCardSkeleton } from "./ProductCardSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Home</h1>
      <p>Showing 5 products</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
