import { Suspense } from "react";

import Link from "next/link";

import { CartIndicator } from "./cart-indicator";
import { CartIndicatorSkeleton } from "./cart-indicator-skeleton";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { SearchInput } from "./search-input";
import { Input } from "./ui/input";

export const categories = [
  { id: 1, name: "Electronics", href: "/search/electronics" },
  { id: 2, name: "Clothing", href: "/search/clothing" },
  { id: 3, name: "Home", href: "/search/home" },
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

        <div className="mx-4 w-full md:mx-8 md:block">
          <Suspense
            fallback={
              <Input
                type="search"
                placeholder="Search"
                className="pl-8"
                disabled
              />
            }
          >
            <SearchInput />
          </Suspense>
        </div>

        <div className="flex items-center gap-0">
          <Suspense fallback={<CartIndicatorSkeleton />}>
            <CartIndicator />
          </Suspense>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
