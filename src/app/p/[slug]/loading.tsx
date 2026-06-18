import { Skeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1440px] px-3 py-4 sm:px-4 2xl:px-6">
      <Skeleton className="h-3 w-64" />
      <Skeleton className="mt-4 h-7 w-3/4 max-w-2xl" />
      <Skeleton className="mt-2 h-4 w-40" />
      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="flex gap-3">
          <div className="hidden flex-col gap-2 sm:flex">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-16 rounded-sm" />
            ))}
          </div>
          <Skeleton className="aspect-square flex-1 rounded-sm" />
        </div>
        <div className="rounded-sm border border-[#e5e5e5] p-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-3 h-9 w-40" />
          <Skeleton className="mt-4 h-12 w-full rounded-sm" />
          <Skeleton className="mt-2 h-11 w-full rounded-sm" />
          <Skeleton className="mt-4 h-4 w-3/4" />
          <Skeleton className="mt-2 h-4 w-2/3" />
          <Skeleton className="mt-2 h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}
