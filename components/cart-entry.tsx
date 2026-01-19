"use client";

import { useTransition } from "react";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

import { setProductQuantity, type CartItemWithProduct } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

import { Button } from "./ui/button";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

export default function CartEntry({ cartItem }: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const handleSetProductQuantity = (quantity: number) => {
    startTransition(async () => {
      try {
        await setProductQuantity(cartItem.product.id, quantity);
      } catch (error) {
        console.error("Error decrementing cart item:", error);
      }
    });
  };

  return (
    <li className="border-muted flex justify-between border-b py-4">
      <div className="flex space-x-4">
        <div className="absolute z-10 -mt-2 -ml-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={isPending}
            className="bg-muted text-muted-foreground h-7 w-7 rounded-full"
            onClick={() => handleSetProductQuantity(0)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

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
          <Button
            variant="ghost"
            className="rounded-l-full"
            onClick={() => handleSetProductQuantity(cartItem.quantity - 1)}
            disabled={isPending}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <p className="w-6 text-center">{cartItem.quantity}</p>
          <Button
            variant="ghost"
            className="rounded-l-full"
            onClick={() => handleSetProductQuantity(cartItem.quantity + 1)}
            disabled={isPending}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
