export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`skeleton block rounded ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded bg-white p-3 ring-1 ring-black/5">
      <Skeleton className="aspect-[4/3] w-full rounded-sm" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="mt-1 h-6 w-1/2" />
      <Skeleton className="mt-1 h-9 w-full rounded-sm" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function RailSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-[158px] shrink-0 sm:w-[220px] lg:w-[238px] 2xl:w-[252px]"
        >
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
