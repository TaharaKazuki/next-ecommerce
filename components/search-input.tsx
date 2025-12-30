"use client";

import { useState, useTransition } from "react";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "./ui/input";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    const params = new URLSearchParams();

    if (trimmedQuery) {
      params.set("query", trimmedQuery);
      startTransition(() => {
        router.push(`/search?${params.toString()}`);
      });
    } else {
      startTransition(() => {
        router.push("/search");
      });
    }
  };

  return (
    <form className="relative w-full" onSubmit={handleSearch}>
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="Search"
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isPending}
      />
    </form>
  );
}
