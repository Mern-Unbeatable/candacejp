export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-500">Concierge Dashboard</h1>
      <p className="mt-2 text-ink-300">Dummy page — concierge activity overview.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {['Active Members', "Today's Tasks", 'Pending Requests'].map((item) => (
          <div key={item} className="rounded-xl border border-ink-50 bg-white p-5 shadow-sm">
            <p className="text-sm text-ink-300">{item}</p>
            <p className="mt-2 text-2xl font-semibold text-ink-500">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
