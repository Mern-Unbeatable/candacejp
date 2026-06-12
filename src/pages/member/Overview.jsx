export default function Overview() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-500">Overview</h1>
      <p className="mt-2 text-ink-300">Dummy page — member dashboard overview and stats.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Upcoming Trips', 'Reservations', 'Travel Plans', 'Notifications'].map((item) => (
          <div key={item} className="rounded-xl border border-ink-50 bg-white p-5 shadow-sm">
            <p className="text-sm text-ink-300">{item}</p>
            <p className="mt-2 text-2xl font-semibold text-ink-500">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
