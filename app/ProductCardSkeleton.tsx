import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative aspect-video">
        <Skeleton className="h-full w-full" />
      </div>

      <CardHeader>
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </CardFooter>
    </Card>
  );
}
