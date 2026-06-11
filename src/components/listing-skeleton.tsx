import { ProductGridSkeleton, Skeleton } from "@/components/skeletons";

export function ListingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4">
      <Skeleton className="h-7 w-52" />
      <Skeleton className="mt-2 h-4 w-3/4 max-w-xl" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="hidden space-y-4 lg:block">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded bg-white p-4 ring-1 ring-black/5">
              <Skeleton className="h-4 w-24" />
              <div className="mt-3 space-y-2">
                {Array.from({ length: 4 }).map((__, i) => (
                  <Skeleton key={i} className="h-3.5 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <ProductGridSkeleton count={9} />
      </div>
    </div>
  );
}
