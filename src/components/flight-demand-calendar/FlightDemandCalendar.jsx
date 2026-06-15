import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Square, CheckSquare } from 'lucide-react';

// June 2026 dummy data
const DAYS_IN_MONTH = 30;
const START_DAY = 1; // 0 = Sun, 1 = Mon (June 1, 2026 is a Monday)

const EVENTS = {
  8: { type: 'high', interested: 5, route: 'Mixed Demand' },
  12: { type: 'medium', interested: 3, route: 'Mixed Demand' },
  15: { type: 'high', interested: 8, route: 'Mixed Demand' },
  18: { type: 'low', interested: 1, route: 'NYC → Tamp' },
};

export default function FlightDemandCalendar() {
  const cells = [];
  
  // Empty cells for days before the 1st
  for (let i = 0; i < START_DAY; i++) {
    cells.push(<div key={`empty-${i}`} className="hidden md:block"></div>);
  }

  // Days of the month
  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    const event = EVENTS[d];
    
    let borderClass = 'border-gray-100 hover:border-gray-200';
    let dotClass = '';
    let bgClass = 'bg-white';

    if (event) {
      if (event.type === 'high') {
        borderClass = 'border-green-400';
        bgClass = 'bg-green-50/30';
        dotClass = 'bg-green-500';
      } else if (event.type === 'medium') {
        borderClass = 'border-yellow-400';
        bgClass = 'bg-yellow-50/30';
      } else if (event.type === 'low') {
        borderClass = 'border-gray-200';
      }
    }

    // Special case for June 6th in the mockup (bold black border for "Selected" date)
    if (d === 6) {
      borderClass = 'border-gray-900 border-[1.5px] shadow-sm';
    }

    cells.push(
      <div 
        key={d} 
        className={`min-h-[100px] md:min-h-[120px] rounded-xl border p-3 flex flex-col transition-colors cursor-pointer ${bgClass} ${borderClass}`}
      >
        <div className="flex justify-between items-start">
          <span className="text-sm md:text-base font-bold text-gray-900">{d}</span>
          {dotClass && <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${dotClass}`}></span>}
        </div>
        
        {event && (
          <div className="mt-auto pb-1">
            <p className="text-[10px] md:text-sm font-bold text-gray-900">
              ✈️ {event.interested} Interested
            </p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">
              → {event.route}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
            June 2026
          </h2>
          <p className="text-xs md:text-base text-gray-500 mt-1">
            Flight demand calendar
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors ml-2">
            <CalendarIcon size={16} className="text-gray-500" />
            Jun 5 - Jul 4, 2026
            <ChevronRight size={16} className="text-gray-400 rotate-90 ml-1" />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 mb-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-[10px] md:text-sm font-semibold text-gray-400 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 md:gap-4 mb-8">
        {cells}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-[3px] border border-yellow-400 bg-yellow-50/30"></div>
          <span className="text-[11px] md:text-sm font-medium text-gray-500">Medium Demand (2-4)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-[3px] border border-green-400 bg-green-50/30"></div>
          <span className="text-[11px] md:text-sm font-medium text-gray-500">High Demand (5+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-[3px] border border-gray-200 bg-white"></div>
          <span className="text-[11px] md:text-sm font-medium text-gray-500">Low Demand (1-2)</span>
        </div>
      </div>
    </div>
  );
}
