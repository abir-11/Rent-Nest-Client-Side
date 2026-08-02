
 export const PropertyCardSkeleton = () => {
  return (
    <div className="bg-[#0B1C14] border border-white/5 rounded-xl overflow-hidden flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="h-56 w-full bg-white/5 animate-pulse rounded-t-xl relative">
        {/* Badge Skeletons */}
        <div className="absolute top-4 left-4 h-6 w-20 bg-white/10 rounded-full" />
        <div className="absolute top-4 right-4 h-6 w-24 bg-white/10 rounded-full" />
      </div>

      <div className="p-5 pb-0">
        {/* Title & Location Skeleton */}
        <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse mb-3" />
        <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
      </div>

      <div className="p-5 flex-grow">
        {/* Price Skeleton */}
        <div className="h-8 w-1/3 bg-white/5 rounded animate-pulse mb-6 mt-2" />

        {/* Amenities Skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 bg-white/5 rounded-md animate-pulse" />
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="p-5 pt-0 mt-auto border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 pt-4">
          <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
          <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="h-10 w-28 bg-white/5 rounded-xl animate-pulse mt-4" />
      </div>
    </div>
  );
};