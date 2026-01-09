import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { getCart } from "@/lib/cart";

import { Button } from "./ui/button";

export async function CartIndicator() {
  const cart = await getCart();
  const cartSize = cart?.size ?? 0;

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/cart">
        <ShoppingCart className="size-5" />
        {cartSize > 0 && (
          <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {cartSize}
          </span>
        )}
      </Link>
    </Button>
  );
}
