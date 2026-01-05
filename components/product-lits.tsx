import { Product } from "@prisma/client";

import { ProductCard } from "@/app/ProductCard";

type ProductListProps = {
  products: Product[];
};

export async function ProductList({ products }: ProductListProps) {
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
