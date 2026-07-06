function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

export default function AuthPageSkeleton({ variant = 'login' }) {
  const isRegister = variant === 'register'
  const isForgotPassword = variant === 'forgot-password'
  const isVerifyOtp = variant === 'verify-otp'
  const isResetPassword = variant === 'reset-password'

  const renderFormSkeleton = () => {
    if (isRegister) {
      return (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SkeletonBlock className="h-[74px]" />
            <SkeletonBlock className="h-[74px]" />
          </div>
          <SkeletonBlock className="h-[74px]" />
          <SkeletonBlock className="h-[74px]" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SkeletonBlock className="h-[74px]" />
            <SkeletonBlock className="h-[74px]" />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SkeletonBlock className="h-[74px]" />
            <SkeletonBlock className="h-[74px]" />
          </div>
          <SkeletonBlock className="h-[74px]" />
          <SkeletonBlock className="h-[74px]" />
          <SkeletonBlock className="h-24 rounded-xl" />
          <SkeletonBlock className="h-12 rounded-lg" />
          <SkeletonBlock className="h-14 mt-6 w-full" />
        </>
      )
    }

    if (isForgotPassword) {
      return (
        <>
          <SkeletonBlock className="h-[74px]" />
          <SkeletonBlock className="h-12 mt-2" />
        </>
      )
    }

    if (isVerifyOtp) {
      return (
        <>
          <SkeletonBlock className="mb-4 h-4 w-36" />
          <div className="flex justify-center gap-4 sm:gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-10 w-10 md:h-16 md:w-16" />
            ))}
          </div>
          <SkeletonBlock className="h-12 mt-6" />
        </>
      )
    }

    if (isResetPassword) {
      return (
        <>
          <SkeletonBlock className="h-[74px]" />
          <SkeletonBlock className="h-[74px]" />
          <SkeletonBlock className="h-12 mt-2" />
        </>
      )
    }

    return (
      <>
        <SkeletonBlock className="h-[74px]" />
        <SkeletonBlock className="h-[74px]" />
        <SkeletonBlock className="h-12 mt-2" />
      </>
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans">
      <div className="relative hidden w-1/2 lg:block">
        <SkeletonBlock className="absolute inset-0 h-full w-full rounded-none bg-gray-300/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-16 text-center">
          <SkeletonBlock className="mb-4 h-10 w-72 bg-white/30" />
          <SkeletonBlock className="h-4 w-80 max-w-full bg-white/25" />
          <SkeletonBlock className="mt-2 h-4 w-64 max-w-full bg-white/25" />
        </div>
      </div>

      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-xl px-8 py-12 mt-24 lg:mt-16">
          <SkeletonBlock className="mb-16 h-11 w-64 rounded-full" />

          <SkeletonBlock className="mb-2 h-8 w-56" />
          <SkeletonBlock className="mb-8 h-4 w-72" />

          <div className={isRegister ? 'space-y-5' : 'space-y-4'}>
            {renderFormSkeleton()}
          </div>
        </div>
      </div>
    </div>
  )
}
