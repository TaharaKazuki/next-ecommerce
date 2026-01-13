import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";

export async function CartIndicatorSkeleton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="relative opacity-30"
      disabled
    >
      <Link href="/cart">
        <ShoppingCart className="size-5" />
      </Link>
    </Button>
  );
}
