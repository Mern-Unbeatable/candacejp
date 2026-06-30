import PaginationSkeleton from './PaginationSkeleton'

function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function ReservationCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <SkeletonBlock className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <SkeletonBlock className="h-5 w-40" />
            <SkeletonBlock className="h-4 w-56" />
            <div className="flex gap-3">
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-4 w-28" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <SkeletonBlock className="h-6 w-20 rounded-full" />
          <SkeletonBlock className="h-10 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default function PendingReservationsPageSkeleton() {
  return (
    <div className="mx-auto space-y-8">
      <div className="space-y-2">
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-5 w-80 max-w-full" />
      </div>

      <SkeletonBlock className="h-16 w-full rounded-xl" />

      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <ReservationCardSkeleton key={index} />
        ))}
      </div>

      <PaginationSkeleton />
    </div>
  )
}
