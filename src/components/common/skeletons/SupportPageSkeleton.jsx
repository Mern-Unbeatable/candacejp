const SKELETON_ROWS = 7

const TABLE_HEADERS = [
  'Name',
  'Phone Number',
  'Email',
  'Message',
  'Status',
  'Action',
]

function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200/80 ${className}`} />
}

function ActionIconSkeleton() {
  return <SkeletonBlock className="h-[30px] w-[30px] rounded-lg" />
}

function SupportTableRowSkeleton({ showMarkSolved = true }) {
  return (
    <tr className="hover:bg-gray-50/50">
      <td className="px-6 py-5 whitespace-nowrap">
        <SkeletonBlock className="h-4 w-20" />
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <SkeletonBlock className="h-4 w-28" />
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <SkeletonBlock className="h-4 w-36" />
      </td>
      <td className="px-6 py-5 max-w-xs">
        <SkeletonBlock className="h-4 w-full min-w-[12rem] max-w-xs" />
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <SkeletonBlock className="h-6 w-14 rounded-full" />
      </td>
      <td className="px-6 py-5 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-1">
          <ActionIconSkeleton />
          {showMarkSolved && <ActionIconSkeleton />}
          <ActionIconSkeleton />
        </div>
      </td>
    </tr>
  )
}

function SupportTableSkeleton() {
  return (
    <div className="mt-6 hidden overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm lg:flex lg:flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wider text-gray-900">
            <tr>
              {TABLE_HEADERS.map((label) => (
                <th
                  key={label}
                  className={`px-6 py-4 font-semibold text-xs ${
                    label === 'Action' ? 'text-right' : ''
                  }`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
              <SupportTableRowSkeleton key={index} showMarkSolved={index % 2 === 0} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SupportPaginationSkeleton() {
  return (
    <div className="mt-6 flex items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:justify-between sm:px-6">
      <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <SkeletonBlock className="hidden h-4 w-48 sm:block" />
        <div className="flex w-full justify-center sm:w-auto">
          <div className="inline-flex items-center gap-0">
            <SkeletonBlock className="h-9 w-9 rounded-l-md rounded-r-none" />
            <SkeletonBlock className="h-9 w-10 rounded-none" />
            <SkeletonBlock className="h-9 w-9 rounded-l-none rounded-r-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SupportMobileCardSkeleton({ showMarkSolved = true }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <SkeletonBlock className="h-5 w-28" />
            <SkeletonBlock className="h-5 w-14 rounded-full" />
          </div>
          <SkeletonBlock className="h-4 w-44" />
          <SkeletonBlock className="mt-1 h-4 w-28" />
        </div>

        <div className="flex items-center gap-1">
          <ActionIconSkeleton />
          {showMarkSolved && <ActionIconSkeleton />}
          <ActionIconSkeleton />
        </div>
      </div>

      <div className="text-sm">
        <SkeletonBlock className="mb-1 h-3 w-16" />
        <SkeletonBlock className="h-4 w-full" />
      </div>
    </div>
  )
}

/** Table-only skeleton — use when header and filter tabs are already rendered. */
export function SupportContentSkeleton() {
  return (
    <>
      <SupportTableSkeleton />

      <div className="mt-6 flex flex-col gap-4 lg:hidden">
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <SupportMobileCardSkeleton key={index} showMarkSolved={index % 2 === 0} />
        ))}
      </div>

      <SupportPaginationSkeleton />
    </>
  )
}

/** Full-page fallback while the route chunk loads. */
export default function SupportPageSkeleton() {
  return (
    <div className="mx-auto pb-10">
      <div className="mb-6 mt-4 space-y-2">
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-5 w-80 max-w-full" />
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        <SkeletonBlock className="h-9 w-14 rounded-full" />
        <SkeletonBlock className="h-9 w-14 rounded-full" />
        <SkeletonBlock className="h-9 w-16 rounded-full" />
      </div>

      <SupportContentSkeleton />
    </div>
  )
}
