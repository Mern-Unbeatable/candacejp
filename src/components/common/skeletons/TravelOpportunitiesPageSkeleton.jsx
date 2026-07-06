import PaginationSkeleton from './PaginationSkeleton'

function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function OpportunityCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <SkeletonBlock className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <SkeletonBlock className="h-5 w-48" />
            <SkeletonBlock className="h-4 w-32" />
          </div>
        </div>
        <SkeletonBlock className="h-7 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SkeletonBlock className="h-16" />
        <SkeletonBlock className="h-16" />
        <SkeletonBlock className="h-16" />
      </div>
    </div>
  )
}

export default function TravelOpportunitiesPageSkeleton() {
  return (
    <div className="mx-auto space-y-8">
      <div className="space-y-2">
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-5 w-80 max-w-full" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <OpportunityCardSkeleton key={index} />
        ))}
      </div>

      <PaginationSkeleton />
    </div>
  )
}
