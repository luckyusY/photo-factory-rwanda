import { RailSkeleton, Skeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div>
      <div className="bg-[#F5F5F5]">
        <div className="mx-auto max-w-[1368px] px-3 py-5 sm:px-4 sm:py-8">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-3 h-9 w-64" />
          <Skeleton className="mt-3 h-4 w-3/4 max-w-2xl" />
        </div>
      </div>
      <div className="mx-auto max-w-[1368px] space-y-8 px-3 py-6 sm:px-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="mb-3 h-6 w-48" />
            <RailSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
