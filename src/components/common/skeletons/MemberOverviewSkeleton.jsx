function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export function StatsRowSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
        >
          <SkeletonBlock className="h-12 w-12 flex-shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-8 w-12" />
            <SkeletonBlock className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}

function InsightListItemSkeleton({ tall = false }) {
  return (
    <div className="rounded-lg bg-[#F1F5F980] p-4">
      <SkeletonBlock className="h-4 w-32" />
      <SkeletonBlock className={`mt-2 ${tall ? 'h-3 w-24' : 'h-3 w-20'}`} />
    </div>
  )
}

export function DemandInsightsSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <SkeletonBlock className="mt-1 h-5 w-5 rounded" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-6 w-40" />
          <SkeletonBlock className="h-4 w-full max-w-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <SkeletonBlock className="mb-4 h-4 w-36" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <InsightListItemSkeleton key={index} />
            ))}
          </div>
        </div>
        <div>
          <SkeletonBlock className="mb-4 h-4 w-36" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <InsightListItemSkeleton key={index} tall />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function UpcomingTripsSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <SkeletonBlock className="h-6 w-36" />
        <SkeletonBlock className="h-4 w-20" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-[#F1F5F980] p-4"
          >
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="h-3 w-28" />
            </div>
            <SkeletonBlock className="h-7 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MemberOverviewSkeleton() {
  return (
    <div className="mx-auto space-y-8">
      <div className="space-y-2">
        <SkeletonBlock className="h-9 w-64" />
        <SkeletonBlock className="h-4 w-80 max-w-full" />
      </div>
      <StatsRowSkeleton />
      <DemandInsightsSkeleton />
      <UpcomingTripsSkeleton />
    </div>
  )
}
