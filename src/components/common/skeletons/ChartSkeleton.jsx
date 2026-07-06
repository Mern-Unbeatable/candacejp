import { adminChartColors } from '../../../pages/admin/dashboard-overview/chartColors'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const Y_TICK_COUNT = 5

function YAxisTicks() {
  return (
    <div className="flex w-6 flex-col justify-between py-1 pb-8">
      {Array.from({ length: Y_TICK_COUNT }).map((_, index) => (
        <div
          key={index}
          className="h-2 w-4 animate-pulse rounded bg-gray-200/80"
        />
      ))}
    </div>
  )
}

function GridLines() {
  return Array.from({ length: Y_TICK_COUNT }).map((_, index) => (
    <div
      key={index}
      className="absolute left-0 right-0 border-t border-dashed border-gray-100"
      style={{ top: `${(index / (Y_TICK_COUNT - 1)) * 100}%` }}
    />
  ))
}

function XAxisLabels() {
  return (
    <div className="mt-3 flex justify-between gap-1">
      {MONTHS.map((month) => (
        <span
          key={month}
          className="text-[10px] font-medium text-gray-300 sm:text-xs"
        >
          {month}
        </span>
      ))}
    </div>
  )
}

function ChartPlot({ children, className = 'h-[300px]' }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex h-full gap-3 pl-1">
        <YAxisTicks />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="relative flex-1 overflow-hidden">
            <GridLines />
            {children}
          </div>
          <XAxisLabels />
        </div>
      </div>
    </div>
  )
}

export function LineChartSkeleton({ className = 'h-[300px]' }) {
  return (
    <ChartPlot className={className}>
      <svg
        className="absolute inset-0 h-full w-full animate-pulse"
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,170 C90,150 150,90 220,110 C290,130 350,60 430,80 C510,100 580,140 660,70 C740,30 820,100 900,60 L1000,45"
          fill="none"
          stroke={adminChartColors.skeleton.line}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="660"
          cy="70"
          r="6"
          fill={adminChartColors.skeleton.lineActive}
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
    </ChartPlot>
  )
}

export function ComposedChartSkeleton({ className = 'h-[300px]' }) {
  const scatterDots = [
    [120, 95], [220, 130], [320, 75], [420, 110], [520, 60],
    [620, 100], [720, 45], [820, 85], [920, 70],
  ]

  return (
    <ChartPlot className={className}>
      <svg
        className="absolute inset-0 h-full w-full animate-pulse"
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,150 C100,130 180,80 280,100 C380,120 460,50 560,70 C660,90 760,130 860,55 L1000,40"
          fill="none"
          stroke={adminChartColors.skeleton.secondaryLine}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0,170 C100,155 200,120 300,135 C400,150 500,90 600,105 C700,120 800,80 900,95 L1000,75"
          fill="none"
          stroke={adminChartColors.skeleton.line}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {scatterDots.map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="5"
            fill={adminChartColors.skeleton.scatter}
            opacity="0.85"
          />
        ))}
      </svg>
    </ChartPlot>
  )
}
