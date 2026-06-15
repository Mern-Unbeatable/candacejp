import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Square, CheckSquare, X } from 'lucide-react';

// Dummy events (Only show in June 2026 for demonstration)
const EVENTS = {
  8: { type: 'high', interested: 5, route: 'Mixed Demand' },
  12: { type: 'medium', interested: 3, route: 'Mixed Demand' },
  15: { type: 'high', interested: 8, route: 'Mixed Demand' },
  18: { type: 'low', interested: 1, route: 'NYC → Tamp' },
};

export default function FlightDemandCalendar() {
  // Start with June 2026 to match the design, but make it dynamic
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Month is 0-indexed (5 = June)

  // Date range picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('2026-06-05');
  const [endDate, setEndDate] = useState('2026-07-04');
  
  // Actually applied range for rendering the grid
  const [appliedRange, setAppliedRange] = useState(null);

  const formatShortDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    // Add timezone offset fix so dates don't shift backward
    const userTimezoneOffset = d.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(d.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handlePrevMonth = () => {
    setAppliedRange(null); // Clear custom range
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setAppliedRange(null); // Clear custom range
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleApplyRange = () => {
    if (startDate && endDate) {
      setAppliedRange({ start: startDate, end: endDate });
    }
    setShowDatePicker(false);
  };

  const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const cells = [];
  
  if (appliedRange) {
    // ------------------------------------------
    // RENDER CUSTOM RANGE GRID
    // ------------------------------------------
    const start = new Date(appliedRange.start);
    const userTimezoneOffsetStart = start.getTimezoneOffset() * 60000;
    const localStart = new Date(start.getTime() + userTimezoneOffsetStart);

    const end = new Date(appliedRange.end);
    const userTimezoneOffsetEnd = end.getTimezoneOffset() * 60000;
    const localEnd = new Date(end.getTime() + userTimezoneOffsetEnd);

    const startDayOfWeek = localStart.getDay();
    
    // Empty cells for the start of the first week
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(<div key={`empty-start-${i}`} className="hidden md:block"></div>);
    }
    
    // Loop through dates
    const currentDateLoop = new Date(localStart);
    while (currentDateLoop <= localEnd) {
      const d = currentDateLoop.getDate();
      const m = currentDateLoop.getMonth();
      const y = currentDateLoop.getFullYear();
      
      const isJune2026 = y === 2026 && m === 5;
      const event = isJune2026 ? EVENTS[d] : null;

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

      if (isJune2026 && d === 6) {
        borderClass = 'border-gray-900 border-[1.5px] shadow-sm';
      }

      // Show month name on the 1st of the month for clarity in a multi-month grid
      const displayDate = d === 1 ? currentDateLoop.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : d;

      cells.push(
        <div 
          key={`date-${y}-${m}-${d}`} 
          className={`min-h-[100px] md:min-h-[120px] rounded-xl border p-3 flex flex-col transition-colors cursor-pointer ${bgClass} ${borderClass}`}
        >
          <div className="flex justify-between items-start">
            <span className="text-sm md:text-base font-bold text-gray-900">{displayDate}</span>
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

      // Increment day by 1
      currentDateLoop.setDate(currentDateLoop.getDate() + 1);
    }

  } else {
    // ------------------------------------------
    // RENDER STANDARD MONTH GRID
    // ------------------------------------------
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const isJune2026 = currentDate.getFullYear() === 2026 && currentDate.getMonth() === 5;

    // Empty cells for days before the 1st
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="hidden md:block"></div>);
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const event = isJune2026 ? EVENTS[d] : null;
      
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

      if (isJune2026 && d === 6) {
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
  }

  // Header Title
  const displayTitle = appliedRange 
    ? `${formatShortDate(appliedRange.start)} - ${formatShortDate(appliedRange.end)}` 
    : monthYearString;

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="font-serif text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {displayTitle}
          </h2>
          <p className="text-xs md:text-base text-gray-500 mt-1">
            Flight demand calendar
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrevMonth}
            className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            title="Previous Month"
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            title="Next Month"
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors ml-2"
            >
              <CalendarIcon size={16} className="text-gray-500" />
              {appliedRange ? `${formatShortDate(appliedRange.start)} - ${formatShortDate(appliedRange.end)}` : 'Select Date Range'}
              
              {appliedRange ? (
                <div 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setAppliedRange(null); 
                    setShowDatePicker(false);
                  }}
                  className="hover:bg-gray-200 rounded-full p-0.5 ml-1 transition-colors"
                  title="Clear Range"
                >
                  <X size={14} className="text-gray-600" />
                </div>
              ) : (
                <ChevronRight size={16} className={`text-gray-400 ml-1 transition-transform ${showDatePicker ? '-rotate-90' : 'rotate-90'}`} />
              )}
            </button>

            {/* Date Picker Dropdown */}
            {showDatePicker && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50">
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-md p-2 outline-none focus:border-[#257AFC]"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-md p-2 outline-none focus:border-[#257AFC]"
                  />
                </div>
                <div className="flex gap-2">
                  {appliedRange && (
                    <button 
                      onClick={() => {
                        setAppliedRange(null);
                        setShowDatePicker(false);
                      }}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2 rounded-md transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button 
                    onClick={handleApplyRange}
                    className="w-full bg-[#257AFC] hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition-colors"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            )}
          </div>
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
