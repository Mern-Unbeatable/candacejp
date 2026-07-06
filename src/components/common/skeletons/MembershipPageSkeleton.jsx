function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export default function MembershipPageSkeleton() {
  return (
    <section className="w-full">
      {/* Membership Journey */}
      <div className="w-full bg-[#E9F2FF]">
        <div className="container mx-auto w-full px-4 py-8 md:px-6 md:py-16 lg:px-6 lg:py-24">
          <SkeletonBlock className="mb-4 h-7 w-28 rounded-full" />
          <SkeletonBlock className="mb-6 h-10 w-72 max-w-full" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="min-h-[220px] rounded-2xl bg-white p-6 shadow-sm">
                <SkeletonBlock className="mb-6 h-10 w-12" />
                <SkeletonBlock className="mb-3 h-6 w-32" />
                <SkeletonBlock className="h-3 w-full" />
                <SkeletonBlock className="mt-2 h-3 w-5/6" />
                <SkeletonBlock className="mt-2 h-3 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flight Pricing */}
      <div className="bg-white">
        <div className="container mx-auto px-4 pt-8 md:px-6 md:pt-16 lg:px-6 lg:pt-24">
          <SkeletonBlock className="mb-3 h-3 w-40" />
          <SkeletonBlock className="mb-4 h-9 w-80 max-w-full" />
          <SkeletonBlock className="mb-8 h-4 w-full max-w-xl" />
          <SkeletonBlock className="mb-2 h-4 w-5/6 max-w-lg" />

          <div className="grid grid-cols-2 gap-4 pb-8 lg:grid-cols-12 lg:gap-6">
            <SkeletonBlock className="col-span-1 min-h-[220px] rounded-2xl lg:col-span-3 lg:min-h-[260px]" />
            <SkeletonBlock className="col-span-1 min-h-[220px] rounded-2xl lg:col-span-3 lg:min-h-[260px]" />
            <SkeletonBlock className="col-span-2 min-h-[280px] rounded-2xl lg:col-span-6" />
          </div>
        </div>
      </div>

      {/* Disclosure / Operations */}
      <div className="container mx-auto w-full space-y-8 px-4 py-8 md:px-6 md:py-16 lg:px-6">
        <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 md:p-10">
          <SkeletonBlock className="mb-4 h-8 w-64 max-w-full" />
          <SkeletonBlock className="mb-2 h-4 w-full" />
          <SkeletonBlock className="mb-2 h-4 w-full" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonBlock className="h-48 rounded-2xl" />
          <SkeletonBlock className="h-48 rounded-2xl" />
        </div>
      </div>

      {/* What You Receive */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-16 lg:px-6 lg:py-24">
          <SkeletonBlock className="mb-3 h-7 w-32 rounded-full" />
          <SkeletonBlock className="mb-10 h-9 w-56 max-w-full" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-5">
                <SkeletonBlock className="mb-4 h-10 w-10 rounded-full" />
                <SkeletonBlock className="mb-3 h-5 w-3/4" />
                <SkeletonBlock className="h-3 w-full" />
                <SkeletonBlock className="mt-2 h-3 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Banner */}
      <div className="bg-[#0F172A] py-12 md:py-16">
        <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-6 lg:px-6">
          <SkeletonBlock className="mb-4 h-8 w-72 max-w-full bg-white/20" />
          <SkeletonBlock className="mb-6 h-4 w-80 max-w-full bg-white/15" />
          <SkeletonBlock className="h-11 w-44 rounded-full bg-white/25" />
        </div>
      </div>
    </section>
  )
}
