function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function FieldSkeleton() {
  return (
    <div>
      <SkeletonBlock className="mb-2 h-4 w-24" />
      <SkeletonBlock className="h-12 rounded-md" />
    </div>
  )
}

export default function MemberProfilePageSkeleton() {
  return (
    <div className="mx-auto">
      <div className="mb-6 mt-4 space-y-2">
        <SkeletonBlock className="h-10 w-56" />
        <SkeletonBlock className="h-5 w-80 max-w-full" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="px-6 pb-8 pt-6 md:px-8">
          <SkeletonBlock className="mb-6 h-6 w-44" />
          <div className="mb-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
            <FieldSkeleton />
            <FieldSkeleton />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
          </div>
          <SkeletonBlock className="h-12 w-40 rounded-lg" />
        </div>

        <div className="border-t border-gray-100 px-6 pb-8 pt-6 md:px-8">
          <SkeletonBlock className="mb-6 h-6 w-52" />
          <div className="mb-6 space-y-4">
            <SkeletonBlock className="h-12 w-full rounded-md" />
            <SkeletonBlock className="h-12 w-full rounded-md" />
            <SkeletonBlock className="h-12 w-full rounded-md" />
          </div>
          <SkeletonBlock className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
