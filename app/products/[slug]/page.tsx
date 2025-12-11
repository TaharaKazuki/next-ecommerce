import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/actions";
import { formatPrice, sleep } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  await sleep(1000);

  return (
    <main className="container mx-auto p-4">
      <Card className="mx-auto max-w-3xl">
        <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg font-semibold">
                {formatPrice(product.price)}
              </span>

              <Badge variant="outline">{product.category?.name}</Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="font-medium">Description</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
