import { ProductsSkeleton } from "./ProductsSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Home</h1>
      <p>Showing 5 products</p>
      <ProductsSkeleton />
    </main>
  );
}
