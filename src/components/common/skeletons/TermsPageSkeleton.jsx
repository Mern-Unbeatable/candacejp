function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function SectionSkeleton({ lines = 4 }) {
  return (
    <div className="mb-10">
      <div className="mb-4 mt-8 flex items-center md:mt-16">
        <SkeletonBlock className="h-4 w-8" />
        <SkeletonBlock className="mx-3 h-4 w-4" />
        <SkeletonBlock className="h-4 w-40" />
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <SkeletonBlock className="mb-6 h-4 w-full max-w-3xl" />
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <SkeletonBlock key={index} className="h-3 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TermsPageSkeleton() {
  return (
    <main className="w-full bg-white pb-16 md:pb-32">
      {/* Header */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <SkeletonBlock className="h-7 w-56 rounded-full" />
            <SkeletonBlock className="h-10 w-80 max-w-full" />
            <SkeletonBlock className="h-4 w-56" />
          </div>
          <SkeletonBlock className="h-3 w-40" />
        </div>
        <SkeletonBlock className="h-[300px] w-full rounded-[24px] md:aspect-[21/9] md:h-auto md:rounded-[32px]" />
      </div>

      {/* Content sections */}
      <div className="container mx-auto px-4 md:px-6 lg:px-4">
        <SectionSkeleton lines={4} />
        <SectionSkeleton lines={5} />
        <SectionSkeleton lines={4} />
        <SectionSkeleton lines={3} />
        <SectionSkeleton lines={4} />
      </div>

      {/* Experience Banner */}
      <div className="mt-8 bg-[#0F172A] py-12 md:py-16">
        <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-6 lg:px-6">
          <SkeletonBlock className="mb-4 h-8 w-72 max-w-full bg-white/20" />
          <SkeletonBlock className="mb-6 h-4 w-80 max-w-full bg-white/15" />
          <SkeletonBlock className="h-11 w-44 rounded-full bg-white/25" />
        </div>
      </div>
    </main>
  )
}
