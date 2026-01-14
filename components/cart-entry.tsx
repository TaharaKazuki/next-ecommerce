import { Minus, Plus } from "lucide-react";
import Image from "next/image";

import { type CartItemWithProduct } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

import { Button } from "./ui/button";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

export default function CartEntry({ cartItem }: CartEntryProps) {
  return (
    <li className="border-muted flex justify-between border-b py-4">
      <div className="flex space-x-4">
        <div className="border-muted size-16 overflow-hidden rounded-md border">
          <Image
            className="h-full w-full object-cover"
            width={128}
            height={128}
            src={cartItem.product.image}
            alt={cartItem.product.name}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{cartItem.product.name}</div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-2">
        <p className="font-medium">{formatPrice(cartItem.product.price)}</p>

        <div className="border-muted flex items-center rounded-full border">
          <Button variant="ghost" className="rounded-l-full">
            <Minus className="h-4 w-4" />
          </Button>
          <p className="w-6 text-center">{cartItem.quantity}</p>
          <Button variant="ghost" className="rounded-l-full">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
