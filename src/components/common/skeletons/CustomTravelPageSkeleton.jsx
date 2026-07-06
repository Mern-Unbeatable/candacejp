function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export default function CustomTravelPageSkeleton() {
  return (
    <div className="mx-auto pb-12">
      <div className="mb-8 space-y-2">
        <SkeletonBlock className="h-10 w-56" />
        <SkeletonBlock className="h-5 w-96 max-w-full" />
      </div>

      <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <SkeletonBlock className="mb-6 h-5 w-32" />
        <SkeletonBlock className="mb-6 h-10 w-48 rounded-full" />

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SkeletonBlock className="h-12 rounded-xl" />
          <SkeletonBlock className="h-12 rounded-xl" />
        </div>

        <SkeletonBlock className="mb-8 h-12 w-full max-w-md rounded-xl" />

        <div className="mb-8 flex items-center justify-center gap-10">
          <SkeletonBlock className="h-10 w-10 rounded-xl" />
          <SkeletonBlock className="h-16 w-20" />
          <SkeletonBlock className="h-10 w-10 rounded-xl" />
        </div>

        <div className="border-t border-gray-100 pt-8">
          <SkeletonBlock className="mb-6 h-5 w-44" />
          <SkeletonBlock className="mb-8 h-24 w-full rounded-xl" />
          <SkeletonBlock className="mb-6 h-24 w-full rounded-xl" />
          <SkeletonBlock className="mb-6 h-20 w-full rounded-xl" />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SkeletonBlock className="mb-4 h-5 w-40" />
        <div className="space-y-3">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-5/6" />
          <SkeletonBlock className="h-4 w-4/6" />
        </div>
      </div>
    </div>
  )
}
