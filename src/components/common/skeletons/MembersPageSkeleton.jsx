function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function TableRowSkeleton() {
  return (
    <tr>
      <td className="px-6 py-5">
        <SkeletonBlock className="h-4 w-28" />
      </td>
      <td className="px-6 py-5">
        <SkeletonBlock className="h-4 w-24" />
      </td>
      <td className="px-6 py-5">
        <SkeletonBlock className="h-4 w-40" />
      </td>
      <td className="px-6 py-5">
        <SkeletonBlock className="h-4 w-56 max-w-xs" />
      </td>
      <td className="px-6 py-5">
        <SkeletonBlock className="h-4 w-12" />
      </td>
      <td className="px-6 py-5 text-right">
        <SkeletonBlock className="ml-auto h-8 w-8 rounded-lg" />
      </td>
    </tr>
  )
}

function MobileCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-5 w-32" />
          <SkeletonBlock className="h-4 w-44" />
        </div>
        <SkeletonBlock className="h-8 w-8 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SkeletonBlock className="h-10" />
        <SkeletonBlock className="h-10" />
        <SkeletonBlock className="col-span-2 h-10" />
      </div>
    </div>
  )
}

export function MembersContentSkeleton() {
  return (
    <>
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8FAFC]">
            <tr>
              {['Name', 'Phone', 'Email', 'Address', 'Payment', 'Action'].map((label) => (
                <th key={label} className="px-6 py-4">
                  <SkeletonBlock className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 8 }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <MobileCardSkeleton key={index} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-6">
        <SkeletonBlock className="hidden h-4 w-48 sm:block" />
        <SkeletonBlock className="h-9 w-56" />
      </div>
    </>
  )
}

export function TravelPreferencesContentSkeleton({ rows = 7 } = {}) {
  const columns = 5

  return (
    <>
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <SkeletonBlock className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index}>
                {Array.from({ length: columns - 1 }).map((__, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4">
                    <SkeletonBlock className="h-4 w-20" />
                  </td>
                ))}
                <td className="px-6 py-4 text-center">
                  <SkeletonBlock className="mx-auto h-8 w-8 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <MobileCardSkeleton key={index} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-6">
        <SkeletonBlock className="hidden h-4 w-48 sm:block" />
        <SkeletonBlock className="h-9 w-56" />
      </div>
    </>
  )
}

export function OpportunitiesContentSkeleton() {
  const columns = 8

  return (
    <>
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8FAFC]">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-6 py-4">
                  <SkeletonBlock className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 7 }).map((_, index) => (
              <tr key={index}>
                {Array.from({ length: columns - 1 }).map((__, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-5">
                    <SkeletonBlock className="h-4 w-20" />
                  </td>
                ))}
                <td className="px-6 py-5 text-center">
                  <SkeletonBlock className="mx-auto h-8 w-8 rounded-lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <MobileCardSkeleton key={index} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-6">
        <SkeletonBlock className="hidden h-4 w-48 sm:block" />
        <SkeletonBlock className="h-9 w-56" />
      </div>
    </>
  )
}

export default function MembersPageSkeleton() {
  return (
    <div className="mx-auto pb-10">
      <div className="mb-6 mt-4 space-y-2">
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-5 w-80 max-w-full" />
      </div>
      <MembersContentSkeleton />
    </div>
  )
}
