import useAuth from '../../hooks/useAuth'
import { Calendar, Plane, MapPin, Settings, FileText, ArrowRight, TrendingUp, CalendarDays } from 'lucide-react'

export default function Overview() {
  const { user } = useAuth()
  
  // Get first name from full name
  const firstName = user?.name ? user.name.split(' ')[0] : 'Member'

  return (
    <div className="mx-auto  space-y-8">
      {/* Header section */}
      <div className='mt-4'>
        <h1 className="font-serif text-4xl font-bold text-gray-900 tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="mt-2 text-[15px] text-gray-500">
          Here's what's happening with your private travel
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Card 1 */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#FFFFFF] p-8 border border-gray-100 shadow-sm">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#ECEEF2] text-gray-700">
            <Calendar size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900 leading-none">3</p>
            <p className="mt-1 text-sm md:text=base text-gray-500">Travel Opportunities</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#FFFFFF] p-8 border border-gray-100 shadow-sm">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#ECEEF2] text-gray-700">
            <Plane size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900 leading-none">2</p>
            <p className="mt-1 text-sm md:text=base text-gray-500">Pending Reservations</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#FFFFFF] p-8 border border-gray-100 shadow-sm">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#ECEEF2] text-gray-700">
            <MapPin size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900 leading-none">2</p>
            <p className="mt-1 text-sm md:text=base text-gray-500">Upcoming Trips</p>
          </div>
        </div>
      </div>

      {/* Action Cards Container */}
      <div className="rounded-2xl bg-[#FFFFFF] p-6 flex flex-col md:flex-row gap-4 shadow-sm">
        {/* Blue Card */}
        <div className="flex flex-1 items-center justify-between rounded-xl bg-[#257AFC] p-5 cursor-pointer hover:bg-blue-600 transition-colors">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/30 text-white">
              <Settings size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-base md:text-lg font-semibold text-white">Adjust Travel Preferences</p>
              <p className="mt-0.5 text-sm text-white">Update your dates, destinations & preferences</p>
            </div>
          </div>
          <ArrowRight className="text-white" size={20} />
        </div>

        {/* Gray Card */}
        <div className="flex flex-1 items-center justify-between rounded-xl bg-[#ECEEF2] p-5 cursor-pointer hover:bg-gray-200 transition-colors">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#257AFC] shadow-sm">
              <FileText size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-base md:text-lg font-semibold text-[#257AFC]">Submit Custom Travel Request</p>
              <p className="mt-0.5 text-sm text-gray-500">Request a specific trip for concierge review</p>
            </div>
          </div>
          <ArrowRight className="text-[#257AFC]" size={20} />
        </div>
      </div>

      {/* Demand Insights */}
      <div className="rounded-2xl border border-gray-100 bg-[#FFFFFF] p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-6">
          <TrendingUp className="text-[#257AFC] mt-1" size={20} strokeWidth={2} />
          <div>
            <h2 className="font-serif text-xl font-semibold text-gray-900 tracking-tight">Demand Insights</h2>
            <p className="text-sm md:text-base text-gray-500 mt-1">Members with similar travel intent are being grouped for curated flight opportunities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* High-Demand Routes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-[#257AFC]" size={16} strokeWidth={2} />
              <h3 className="text-sm font-semibold text-gray-900">High-Demand Routes</h3>
            </div>
            <div className="space-y-2">
              {[
                { route: 'NYC → Tampa', time: 'Monday Evenings', stat: '+12%' },
                { route: 'Tampa → NYC', time: 'Tuesday Evenings', stat: '+8%' },
                { route: 'NYC → Tampa', time: 'Thursday Mornings', stat: '+15%' },
                { route: 'Tampa → NYC', time: 'Friday Evenings', stat: '+5%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-[#F1F5F980] p-4 border border-transparent hover:border-gray-200 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">{item.route}</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">{item.time}</p>
                  </div>
                  <span className="text-sm md:text-base font-semibold text-green-600">{item.stat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Travel Dates */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="text-[#257AFC]" size={16} strokeWidth={2} />
              <h3 className="text-sm font-semibold text-gray-900">Popular Travel Dates</h3>
            </div>
            <div className="space-y-2">
              {[
                { date: 'Jun 15, 2026', details: '8 routes · 42 members' },
                { date: 'Jun 22, 2026', details: '6 routes · 35 members' },
                { date: 'Jul 4, 2026', details: '12 routes · 68 members' },
                { date: 'Jul 10, 2028', details: '5 routes · 28 members' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col justify-center rounded-lg bg-[#F1F5F980] p-4 border border-transparent hover:border-gray-200 transition-colors cursor-pointer">
                  <p className="text-sm md:text-base font-semibold text-gray-900">{item.date}</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="rounded-2xl border border-gray-100 bg-[#FFFFFF] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-semibold text-gray-900 tracking-tight">Upcoming Trips</h2>
          <button className="flex items-center gap-1 text-sm md:text-base font-medium text-[#257AFC] hover:text-blue-700">
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { route: 'Tampa → New York', time: 'Mondays, Morning', type: 'Recurring' },
            { route: 'New York → Tampa', time: 'Fridays, Evening', type: 'Recurring' },
            { route: 'Miami → Los Angeles', time: 'Jul 15, 2026, Afternoon', type: 'One-Time' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-[#F1F5F980] p-4 border border-transparent hover:border-gray-200 transition-colors cursor-pointer">
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-900">{item.route}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">{item.time}</p>
              </div>
              <span className="rounded-md bg-white border border-gray-100 px-2.5 py-1 text-xs md:text-sm font-medium text-gray-600 shadow-sm">
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
