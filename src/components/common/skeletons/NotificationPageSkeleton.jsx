import PaginationSkeleton from './PaginationSkeleton'

function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function NotificationCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-8 w-8 rounded-lg" />
          <SkeletonBlock className="h-5 w-16 rounded-full" />
        </div>
        <SkeletonBlock className="h-6 w-24 rounded-md" />
      </div>
      <div className="mb-4 space-y-2">
        <SkeletonBlock className="h-5 w-56" />
        <SkeletonBlock className="h-4 w-full max-w-2xl" />
      </div>
      <div className="flex gap-6 border-t border-gray-50 pt-4">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-4 w-28" />
      </div>
    </div>
  )
}

export default function NotificationPageSkeleton() {
  return (
    <div className="mx-auto">
      <div className="mb-4 mt-4 space-y-2">
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-5 w-96 max-w-full" />
      </div>

      <div className="mb-8">
        <SkeletonBlock className="mb-4 h-4 w-48" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <NotificationCardSkeleton key={index} />
          ))}
        </div>
      </div>

      <PaginationSkeleton />
    </div>
  )
}
