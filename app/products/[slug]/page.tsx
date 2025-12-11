import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{product.name}</h1>
      <p className="mb-6 text-lg">{product.description}</p>
      <p className="mb-6 text-lg">{formatPrice(product.price)}</p>
    </div>
  );
}
