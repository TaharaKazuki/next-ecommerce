import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <main className="container mx-auto p-4">
      <Card className="p-6">
        <CardContent>
          <h1 className="mb-6 text-3xl font-bold">{product.name}</h1>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-semibold text-lg">
              {formatPrice(product.price)}
            </span>
            <Badge variant="outline">{product.category?.name}</Badge>
          </div>
          <Separator />
          <div className="space-y-2">
            <h2 className="font-medium">Description</h2>
            <p>{product.description}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
