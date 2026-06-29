function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export function ConciergeStatsSkeleton() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200/80" />
          <div className="mt-4 h-9 w-16 animate-pulse rounded-md bg-gray-200/80" />
        </div>
      ))}
    </div>
  )
}

export function ConciergeTrendsSkeleton() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SkeletonBlock className="mb-6 h-5 w-40" />
          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <div key={rowIndex} className="space-y-2">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-1.5 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function ConciergeCalendarGridSkeleton() {
  return (
    <>
      <div className="mb-2 grid grid-cols-7 gap-2 text-center md:gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonBlock key={index} className="mx-auto h-4 w-8" />
        ))}
      </div>

      <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-7 md:gap-4">
        {Array.from({ length: 35 }).map((_, index) => (
          <div
            key={index}
            className="min-h-[100px] animate-pulse rounded-xl border border-gray-100 bg-gray-100/70 p-3 md:min-h-[120px]"
          />
        ))}
      </div>
    </>
  )
}

export function ConciergeCalendarSkeleton() {
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-56" />
          <SkeletonBlock className="h-4 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-9 w-9 rounded-lg" />
          <SkeletonBlock className="h-9 w-9 rounded-lg" />
          <SkeletonBlock className="h-9 w-48 rounded-lg" />
        </div>
      </div>

      <ConciergeCalendarGridSkeleton />

      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-gray-100 pt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-4 w-40" />
        ))}
      </div>
    </div>
  )
}

export default function ConciergeDashboardSkeleton() {
  return (
    <div className="mx-auto">
      <div className="mb-6 mt-4 space-y-2">
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-5 w-80 max-w-full" />
      </div>
      <ConciergeStatsSkeleton />
      <ConciergeTrendsSkeleton />
      <ConciergeCalendarSkeleton />
    </div>
  )
}

export function ConciergeCalendarPageSkeleton() {
  return (
    <div className="mx-auto">
      <ConciergeCalendarSkeleton />
    </div>
  )
}

export function CalendarDemandPageSkeleton() {
  return (
    <div className="mx-auto">
      <SkeletonBlock className="mb-6 h-5 w-36" />
      <div className="mb-8 space-y-2">
        <SkeletonBlock className="h-9 w-64" />
        <SkeletonBlock className="h-5 w-48" />
      </div>
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
      </div>
      <SkeletonBlock className="mb-4 h-6 w-48" />
      <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
    </div>
  )
}
