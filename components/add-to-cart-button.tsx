"use client";

import { useTransition } from "react";

import { Product } from "@prisma/client";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addCart } from "@/lib/cart";

export function AddToCartButton({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();

  const handleAddCart = () => {
    startTransition(async () => {
      try {
        await addCart(product.id, 1);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    });
  };

  return (
    <Button onClick={handleAddCart} disabled={isPending} className="w-full">
      <ShoppingCart className="mr-1 size-4" />
      {product.inventory > 0 ? "Add to Cart" : "Out of stock"}
    </Button>
  );
}
