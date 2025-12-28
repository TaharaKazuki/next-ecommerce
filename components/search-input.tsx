import { SearchIcon } from "lucide-react";

import { Input } from "./ui/input";

export function SearchInput() {
  return (
    <form className="relative w-full">
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <Input type="search" placeholder="Search" className="pl-8" />
    </form>
  );
}
