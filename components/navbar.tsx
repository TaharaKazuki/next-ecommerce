import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const categories = [
  {
    id: 1,
    name: "Electronics",
    href: "/categories/electronics",
  },
  {
    id: 2,
    name: "Fashion",
    href: "/categories/fashion",
  },
  {
    id: 3,
    name: "Home",
    href: "/categories/home",
  },
];

export function Navbar() {
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div>
          <div className="flex items-center gap-6">
            <Link className="text-2xl font-bold" href="/">
              Store
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                  href={category.href}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="size-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="size-5" />
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
