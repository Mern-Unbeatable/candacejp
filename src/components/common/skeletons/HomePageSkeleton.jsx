function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export default function HomePageSkeleton() {
  return (
    <section className="w-full">
      {/* Hero */}
      <div className="mx-auto container w-full px-4 pt-4 md:px-6 md:pt-8 lg:px-6">
        <div className="relative w-full overflow-hidden rounded-2xl rounded-bl-none">
          <SkeletonBlock className="h-[250px] w-full rounded-2xl sm:h-[350px] md:h-[450px] lg:h-[650px]" />
          <div className="relative w-full bg-white pt-6 pb-6 lg:absolute lg:bottom-0 lg:left-0 lg:w-[48%] lg:rounded-tr-[28px]">
            <SkeletonBlock className="mb-3 h-10 w-64 max-w-full" />
            <SkeletonBlock className="mb-2 h-4 w-full max-w-md" />
            <SkeletonBlock className="mb-6 h-4 w-5/6 max-w-sm" />
            <SkeletonBlock className="h-11 w-40 rounded-full" />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mx-auto container w-full px-4 py-8 md:px-6 md:py-16 lg:px-6 lg:py-24">
        <SkeletonBlock className="mb-2 h-3 w-24" />
        <SkeletonBlock className="mb-6 h-9 w-56" />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-4"
            >
              <div className="mb-6 flex items-center justify-between">
                <SkeletonBlock className="h-12 w-12 rounded-full" />
                <SkeletonBlock className="h-6 w-8" />
              </div>
              <SkeletonBlock className="mb-3 h-5 w-3/4" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="mt-2 h-3 w-5/6" />
            </div>
          ))}
        </div>
      </div>

      {/* Curated Travel */}
      <div className="bg-[#FAFAFA] py-8 md:py-16">
        <div className="mx-auto container grid w-full items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:px-6">
          <SkeletonBlock className="h-64 w-full rounded-2xl md:h-80" />
          <div className="space-y-4">
            <SkeletonBlock className="h-3 w-28" />
            <SkeletonBlock className="h-9 w-64 max-w-full" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
            <SkeletonBlock className="h-11 w-36 rounded-full" />
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <div className="mx-auto container w-full space-y-8 px-4 py-8 md:px-6 md:py-16 lg:px-6">
        <div className="text-center">
          <SkeletonBlock className="mx-auto mb-3 h-3 w-32" />
          <SkeletonBlock className="mx-auto mb-8 h-9 w-72 max-w-full" />
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-40 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
