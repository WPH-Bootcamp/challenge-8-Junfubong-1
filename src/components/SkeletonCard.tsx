export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] bg-gray-800 rounded-xl" />
      <div className="mt-2 space-y-1.5">
        <div className="h-3.5 bg-gray-800 rounded w-4/5" />
        <div className="h-3 bg-gray-800 rounded w-2/5" />
      </div>
    </div>
  );
}

export function SkeletonRow({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-36 sm:w-44">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative w-full h-[85vh] min-h-[560px] bg-gray-900 animate-pulse">
      <div className="absolute bottom-16 left-8 sm:left-16 lg:left-24 space-y-4 max-w-md">
        <div className="h-6 bg-gray-800 rounded-full w-24" />
        <div className="h-12 bg-gray-800 rounded w-3/4" />
        <div className="h-12 bg-gray-800 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
          <div className="h-4 bg-gray-800 rounded w-4/6" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-11 bg-gray-800 rounded-full w-36" />
          <div className="h-11 bg-gray-800 rounded-full w-28" />
        </div>
      </div>
    </div>
  );
}
