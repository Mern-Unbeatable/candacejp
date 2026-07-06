function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export default function FAQPageSkeleton() {
  return (
    <section className="w-full">
      {/* Hero Banner */}
      <div className="relative flex min-h-[440px] w-full items-center overflow-hidden bg-[#0f172a] md:min-h-[500px]">
        <SkeletonBlock className="absolute inset-0 rounded-none bg-slate-700/50" />
        <div className="container relative z-10 mx-auto w-full px-6 pb-20 pt-12 md:px-12">
          <div className="max-w-xl space-y-4">
            <SkeletonBlock className="h-12 w-80 max-w-full bg-white/20" />
            <SkeletonBlock className="h-12 w-64 max-w-full bg-white/15" />
            <SkeletonBlock className="h-4 w-full max-w-md bg-white/10" />
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="min-h-[50vh] w-full bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <SkeletonBlock className="mx-auto h-10 w-72 max-w-full" />
          </div>

          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={`rounded-xl border p-5 ${
                  index === 0
                    ? 'border-[#b4d2ff] bg-[#eef4ff]'
                    : 'border-transparent bg-[#fafafa]'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <SkeletonBlock className="h-5 w-3/4 max-w-md" />
                  <SkeletonBlock className="h-4 w-4 shrink-0 rounded-full" />
                </div>
                {index === 0 && (
                  <div className="mt-4 space-y-2">
                    <SkeletonBlock className="h-3 w-full" />
                    <SkeletonBlock className="h-3 w-5/6" />
                    <SkeletonBlock className="h-3 w-4/5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Banner */}
      <div className="bg-[#0F172A] py-12 md:py-16">
        <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-6 lg:px-6">
          <SkeletonBlock className="mb-4 h-8 w-56 max-w-full bg-white/20" />
          <SkeletonBlock className="mb-6 h-4 w-80 max-w-full bg-white/15" />
          <SkeletonBlock className="h-11 w-36 rounded-full bg-white/25" />
        </div>
      </div>
    </section>
  )
}
