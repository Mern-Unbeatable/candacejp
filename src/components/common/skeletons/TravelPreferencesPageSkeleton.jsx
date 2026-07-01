function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function SavedPreferenceSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-[#F8FAFC] p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <SkeletonBlock className="h-4 w-40" />
        <SkeletonBlock className="h-4 w-20" />
        <SkeletonBlock className="h-4 w-20" />
      </div>
      <SkeletonBlock className="h-4 w-4 rounded-full" />
    </div>
  )
}

function FormCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <SkeletonBlock className="mb-2 h-3 w-16" />
          <div className="flex flex-col gap-3 md:flex-row">
            <SkeletonBlock className="h-12 flex-1 rounded-xl" />
            <SkeletonBlock className="h-12 flex-1 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SkeletonBlock className="h-12 rounded-xl" />
          <SkeletonBlock className="h-12 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default function TravelPreferencesPageSkeleton() {
  return (
    <div className="mx-auto space-y-12 pb-12">
      <div className="space-y-2">
        <SkeletonBlock className="h-10 w-64" />
        <SkeletonBlock className="h-5 w-96 max-w-full" />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <SkeletonBlock className="h-6 w-56" />
          <SkeletonBlock className="h-4 w-80 max-w-full" />
        </div>
        <SkeletonBlock className="h-3 w-36" />
        <div className="space-y-3">
          <SavedPreferenceSkeleton />
          <SavedPreferenceSkeleton />
        </div>
      </div>

      <div className="space-y-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <SkeletonBlock className="h-6 w-40" />
            <SkeletonBlock className="h-4 w-full max-w-2xl" />
          </div>
          <FormCardSkeleton />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <SkeletonBlock className="h-6 w-52" />
            <SkeletonBlock className="h-4 w-full max-w-2xl" />
          </div>
          <FormCardSkeleton />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <SkeletonBlock className="h-14 w-full rounded-xl" />
      </div>
    </div>
  )
}
