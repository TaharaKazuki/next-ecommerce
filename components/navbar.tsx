import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export const categories = [
  { id: 1, name: "Electronics", href: "/category/electronics" },
  { id: 2, name: "Fashion", href: "/category/fashion" },
  { id: 3, name: "Home", href: "/category/home" },
];

export function Navbar() {
  return (
    <div className="border-b border-dashed">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div>
          <div className="flex items-center gap-6">
            <Link className="hidden text-2xl font-bold md:block" href="/">
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
            <MobileNav />
          </div>
        </div>
        <div className="flex items-center gap-0">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
