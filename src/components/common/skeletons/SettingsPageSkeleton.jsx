function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function FieldSkeleton() {
  return (
    <div>
      <SkeletonBlock className="mb-2 h-4 w-24" />
      <SkeletonBlock className="h-12 rounded-lg" />
    </div>
  )
}

function PasswordFieldSkeleton() {
  return <SkeletonBlock className="h-12 w-full rounded-lg" />
}

export function SettingsContentSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-10">
        <SkeletonBlock className="mb-6 h-6 w-44" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FieldSkeleton />
          <FieldSkeleton />
        </div>
        <SkeletonBlock className="h-10 w-36 rounded-md" />
      </div>

      <SkeletonBlock className="mb-8 h-px w-full" />

      <div>
        <SkeletonBlock className="mb-6 h-6 w-52" />
        <div className="space-y-4 mb-8">
          <PasswordFieldSkeleton />
          <PasswordFieldSkeleton />
          <PasswordFieldSkeleton />
        </div>
        <SkeletonBlock className="h-12 w-full rounded-md" />
      </div>
    </div>
  )
}

export default function SettingsPageSkeleton() {
  return (
    <div className="mx-auto pb-10">
      <div className="mb-6 mt-4 space-y-2">
        <SkeletonBlock className="h-9 w-56" />
        <SkeletonBlock className="h-4 w-80 max-w-full" />
      </div>
      <SettingsContentSkeleton />
    </div>
  )
}
