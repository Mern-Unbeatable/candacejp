function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export default function ContactPageSkeleton() {
  return (
    <section className="w-full">
      {/* Hero Banner */}
      <div className="relative flex min-h-[440px] w-full items-center overflow-hidden bg-[#0a0f1d] md:min-h-[520px]">
        <SkeletonBlock className="absolute inset-0 rounded-none bg-slate-800/50" />
        <div className="container relative z-10 mx-auto w-full px-6 pb-24 pt-16 md:px-12">
          <div className="max-w-xl space-y-4">
            <SkeletonBlock className="h-12 w-64 max-w-full bg-white/20" />
            <SkeletonBlock className="h-4 w-full max-w-sm bg-white/10" />
            <SkeletonBlock className="h-4 w-5/6 max-w-md bg-white/10" />
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full bg-white">
        <div className="container mx-auto grid grid-cols-1 items-start gap-12 px-4 py-8 md:px-6 md:py-16 lg:grid-cols-12 lg:gap-16 lg:px-6 lg:py-24">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-5">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-9 w-56 max-w-full" />
            <SkeletonBlock className="h-4 w-full max-w-md" />
            <SkeletonBlock className="h-4 w-5/6 max-w-sm" />
            <div className="flex items-center gap-4 pt-2">
              <SkeletonBlock className="h-12 w-12 shrink-0 rounded-lg" />
              <div className="space-y-2">
                <SkeletonBlock className="h-3 w-16" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
            </div>
          </div>

          {/* Right column - form */}
          <div className="space-y-5 lg:col-span-7">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="h-12 w-full rounded-lg" />
              </div>
            ))}
            <SkeletonBlock className="h-12 w-full rounded-lg" />
            <SkeletonBlock className="h-12 w-36 rounded-full" />
          </div>
        </div>
      </div>

      {/* Experience Banner */}
      <div className="bg-[#0F172A] py-12 md:py-16">
        <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-6 lg:px-6">
          <SkeletonBlock className="mb-4 h-8 w-64 max-w-full bg-white/20" />
          <SkeletonBlock className="mb-6 h-4 w-80 max-w-full bg-white/15" />
          <SkeletonBlock className="h-11 w-44 rounded-full bg-white/25" />
        </div>
      </div>
    </section>
  )
}
