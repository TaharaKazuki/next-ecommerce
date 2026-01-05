import { ReactNode } from "react";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container mx-auto py-4">
      <div className="flex gap-8">
        <div className="w-[125px] flex-none">
          Categories
          {/* <Suspense fallback={<div className="w-[125px]">Loading...</div>}>
            <CategorySidebar />
          </Suspense> */}
        </div>
        <div className="flex-1">{children}</div>
        <div className="w-[125px] flex-none">Sorting</div>
      </div>
    </main>
  );
}
