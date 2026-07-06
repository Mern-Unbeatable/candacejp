function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export default function PaginationSkeleton() {
  return (
    <div className="mt-6 flex items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:justify-between sm:px-6">
      <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <SkeletonBlock className="hidden h-4 w-52 sm:block" />
        <div className="flex w-full justify-center sm:w-auto">
          <div className="inline-flex items-center gap-0">
            <SkeletonBlock className="h-9 w-9 rounded-l-md rounded-r-none" />
            <SkeletonBlock className="h-9 w-10 rounded-none" />
            <SkeletonBlock className="h-9 w-10 rounded-none" />
            <SkeletonBlock className="h-9 w-9 rounded-l-none rounded-r-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
