"use client";
import { useCallback, useMemo } from "react";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

export function SortingControls() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const createSortUrl = useCallback(
    (sortValue: string | null): string => {
      const params = new URLSearchParams(searchParams.toString());

      if (sortValue) {
        params.set("sort", sortValue);
      } else {
        params.delete("sort");
      }

      const queryString = params.toString();
      return `${pathname}${queryString ? `?${queryString}` : ""}`;
    },
    [pathname, searchParams]
  );

  // Pre-compute all URLs to avoid recalculation on every render
  const urls = useMemo(
    () => ({
      latest: createSortUrl(null),
      priceAsc: createSortUrl("price-asc"),
      priceDesc: createSortUrl("price-desc"),
    }),
    [createSortUrl]
  );
  return (
    <>
      <h3 className="text-muted-foreground mb-2 text-xs">Sort By</h3>

      <ul>
        <li>
          <Link
            href={urls.latest}
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
            href={urls.priceAsc}
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
            href={urls.priceDesc}
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
