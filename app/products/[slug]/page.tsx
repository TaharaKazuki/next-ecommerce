import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          <div className="relative h-[200px] overflow-hidden rounded-lg md:h-[400px]">
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
            <Separator className="my-4" />
            <div className="space-y-2">
              <h2 className="font-medium">Availability</h2>
              <div className="flex items-center gap-2">
                {product.inventory > 0 ? (
                  <Badge variant="outline" className="text-green-600">
                    In stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600">
                    Out of stock
                  </Badge>
                )}

                {product.inventory > 0 && (
                  <span className="text-xs text-gray-500">
                    {product.inventory}
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <Button disabled={product.inventory === 0} className="w-full">
                <ShoppingCart className="mr-1 h-4 w-4" />
                {product.inventory > 0 ? "Add to Cart" : "Out of stock"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
