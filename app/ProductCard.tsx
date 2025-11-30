import Image from "next/image";

import { Product } from "@/lib/mocks";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="relative aspect-video">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="text-gray-500">{product.description}</p>
    </div>
  );
}
