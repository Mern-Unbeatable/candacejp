export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
      <p className="mt-2 text-ink-200">Dummy page — platform analytics and system overview.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Total Members', 'Active Staff', 'Revenue', 'Bookings'].map((item) => (
          <div key={item} className="rounded-xl border border-ink-700 bg-ink-800 p-5">
            <p className="text-sm text-ink-200">{item}</p>
            <p className="mt-2 text-2xl font-semibold text-white">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
