"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

export function SortingControls() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const createSortUrl = (sortValue: string | null): string => {
    const params = new URLSearchParams(searchParams.toString());

    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }

    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ""}`;
  };
  return (
    <>
      <h3 className="text-muted-foreground mb-2 text-xs">Sort By</h3>

      <ul>
        <li>
          <Link
            href={createSortUrl(null)}
            className={cn(
              "hover:text-primary text-sm",
              !currentSort ? "underline" : ""
            )}
          >
            Latest
          </Link>
        </li>
        <li>
          <Link
            href={createSortUrl("price-asc")}
            className={cn(
              "hover:text-primary text-sm",
              currentSort === "price-asc" ? "underline" : ""
            )}
          >
            Price: Low to High
          </Link>
        </li>
        <li>
          <Link
            href={createSortUrl("price-desc")}
            className={cn(
              "hover:text-primary text-sm",
              currentSort === "price-desc" ? "underline" : ""
            )}
          >
            Price: High to Low
          </Link>
        </li>
      </ul>
    </>
  );
}
