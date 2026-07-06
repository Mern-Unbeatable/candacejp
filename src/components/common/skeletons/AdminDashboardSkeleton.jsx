import { ComposedChartSkeleton, LineChartSkeleton } from './ChartSkeleton'

function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <SkeletonBlock className="h-10 w-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-7 w-16" />
        </div>
      </div>
    </div>
  )
}

function ChartCardSkeleton({ variant = 'line' }) {
  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-6 w-48" />
          <SkeletonBlock className="h-4 w-64" />
        </div>
        <SkeletonBlock className="h-8 w-24 rounded-md" />
      </div>
      {variant === 'composed' ? <ComposedChartSkeleton /> : <LineChartSkeleton />}
    </div>
  )
}

export default function AdminDashboardSkeleton() {
  return (
    <div className="mx-auto pb-10">
      <div className="mb-6 mt-4 space-y-2">
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-5 w-96 max-w-full" />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>

      <ChartCardSkeleton variant="line" />
      <ChartCardSkeleton variant="composed" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 space-y-2">
            <SkeletonBlock className="h-6 w-40" />
            <SkeletonBlock className="h-4 w-56" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <SkeletonBlock className="h-4 w-8" />
                <SkeletonBlock className="h-2 flex-1 rounded-full" />
                <SkeletonBlock className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SkeletonBlock className="mb-8 h-6 w-36" />
          <div className="space-y-8">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <div className="mb-3 flex justify-between">
                  <SkeletonBlock className="h-4 w-28" />
                  <SkeletonBlock className="h-4 w-10" />
                </div>
                <SkeletonBlock className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
