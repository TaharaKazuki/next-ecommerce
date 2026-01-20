import Link from "next/link";

import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

import { Button } from "./ui/button";

export default async function CartSummary() {
  const cart = await getCart();

  if (!cart) return null;

  const subtotal = cart.subtotal;
  const taxes = 0;
  const shipping = 0;

  const total = subtotal + taxes + shipping;

  return (
    <div className="flex flex-col pt-4">
      <div className="text-muted-foreground text-sm">
        <div className="mb-3 flex items-center justify-between border-b pb-1">
          <p>Subtotal</p>
          <p className="text-foreground text-base">{formatPrice(subtotal)}</p>
        </div>

        <div className="mb-3 flex items-center justify-between border-b pb-1">
          <p>Taxes</p>
          <p>Calculated at checkout</p>
        </div>

        <div className="mb-3 flex items-center justify-between border-b pb-1">
          <p>Shipping</p>
          <p>Calculated at checkout</p>
        </div>

        <div className="mb-3 flex items-center justify-between border-b pb-1 font-semibold">
          <p>Total</p>
          <p className="text-foreground text-base">{formatPrice(total)}</p>
        </div>
      </div>

      <Button size="lg" asChild className="mt-4 w-full">
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  );
}
