import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  X,
  Plane,
  ArrowRight,
} from 'lucide-react';
import { useStaffDashboardCalendarQuery } from '../../hooks/api/useStaffQueries';
import { staffApi } from '../../api/staff.api';
import { queryKeys } from '../../lib/query/queryKeys';
import {
  formatDateKey,
  getDemandStyles,
  isTodayDate,
} from './calendarUtils';

function CalendarGridSkeleton() {
  return (
    <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-7 md:gap-4">
      {Array.from({ length: 35 }).map((_, index) => (
        <div
          key={index}
          className="min-h-[100px] animate-pulse rounded-xl border border-gray-100 bg-gray-100/70 p-3 md:min-h-[120px]"
        />
      ))}
    </div>
  );
}

export default function FlightDemandCalendar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const now = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(formatDateKey(now.getFullYear(), now.getMonth() + 1, 1));
  const [endDate, setEndDate] = useState(
    formatDateKey(now.getFullYear(), now.getMonth() + 2, 0),
  );
  const [appliedRange, setAppliedRange] = useState(null);
  const datePickerRef = useRef(null);

  const calendarParams = useMemo(() => {
    if (appliedRange) {
      return { from: appliedRange.start, to: appliedRange.end };
    }

    return {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }, [appliedRange, currentDate]);

  const { data: calendarData, isLoading } = useStaffDashboardCalendarQuery(calendarParams);

  const eventsByDate = useMemo(() => {
    const map = {};
    (calendarData?.days ?? []).forEach((day) => {
      map[day.date] = day;
    });
    return map;
  }, [calendarData?.days]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatShortDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const adjustedDate = new Date(year, month - 1, day);
    return adjustedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handlePrevMonth = () => {
    setAppliedRange(null);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setAppliedRange(null);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleApplyRange = () => {
    if (startDate && endDate) {
      setAppliedRange({ start: startDate, end: endDate });
    }
    setShowDatePicker(false);
  };

  const handleDayClick = (dateKey) => {
    const dateParams = { date: dateKey };

    queryClient.prefetchQuery({
      queryKey: queryKeys.staff.dashboardCalendar(dateParams),
      queryFn: () => staffApi.getDashboardCalendar(dateParams),
    });

    navigate(`/concierge/demand-details?date=${dateKey}`);
  };

  const renderDayCell = ({ year, month, day, displayDate }) => {
    const dateKey = formatDateKey(year, month, day);
    const event = eventsByDate[dateKey];
    const styles = event ? getDemandStyles(event.demandLevel) : getDemandStyles();
    let borderClass = event ? styles.borderClass : 'border-gray-100 hover:border-gray-200';
    const bgClass = event ? styles.bgClass : 'bg-white';
    const dotClass = styles.dotClass;

    if (isTodayDate(year, month, day)) {
      borderClass = 'border-gray-900 border-[1.5px] shadow-sm';
    }

    return (
      <div
        key={dateKey}
        onClick={() => handleDayClick(dateKey)}
        className={`flex min-h-[100px] cursor-pointer flex-col rounded-xl border p-3 transition-colors md:min-h-[120px] ${bgClass} ${borderClass}`}
      >
        <div className="flex items-start justify-between">
          <span className="text-sm font-bold text-gray-900 md:text-base">{displayDate}</span>
          {dotClass && <span className={`h-1.5 w-1.5 rounded-full md:h-2 md:w-2 ${dotClass}`} />}
        </div>

        {event && (
          <div className="mt-auto pb-1">
            <p className="flex items-center gap-1 text-xs font-bold text-gray-900 md:text-sm">
              <Plane size={14} className="text-gray-700" fill="currentColor" />
              {event.interestCount} Interested
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-900 md:text-xs">
              <ArrowRight size={12} />
              {event.routeLabel}
            </p>
          </div>
        )}
      </div>
    );
  };

  const cells = [];

  if (appliedRange) {
    const [startYear, startMonth, startDay] = appliedRange.start.split('-').map(Number);
    const [endYear, endMonth, endDay] = appliedRange.end.split('-').map(Number);
    const localStart = new Date(startYear, startMonth - 1, startDay);
    const localEnd = new Date(endYear, endMonth - 1, endDay);
    const startDayOfWeek = localStart.getDay();

    for (let i = 0; i < startDayOfWeek; i += 1) {
      cells.push(<div key={`empty-start-${i}`} className="hidden md:block" />);
    }

    const currentDateLoop = new Date(localStart);
    while (currentDateLoop <= localEnd) {
      const d = currentDateLoop.getDate();
      const m = currentDateLoop.getMonth() + 1;
      const y = currentDateLoop.getFullYear();
      const displayDate =
        d === 1
          ? currentDateLoop.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : d;

      cells.push(renderDayCell({ year: y, month: m, day: d, displayDate }));
      currentDateLoop.setDate(currentDateLoop.getDate() + 1);
    }
  } else {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    for (let i = 0; i < startDay; i += 1) {
      cells.push(<div key={`empty-${i}`} className="hidden md:block" />);
    }

    for (let d = 1; d <= daysInMonth; d += 1) {
      cells.push(
        renderDayCell({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
          day: d,
          displayDate: d,
        }),
      );
    }
  }

  const monthYearString = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const displayTitle = appliedRange
    ? `${formatShortDate(appliedRange.start)} - ${formatShortDate(appliedRange.end)}`
    : monthYearString;

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-serif text-xl font-bold tracking-tight text-gray-900 md:text-3xl">
            {displayTitle}
          </h2>
          <p className="mt-1 text-xs text-gray-500 md:text-base">Flight demand calendar</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50"
            title="Previous Month"
          >
            <ChevronLeft size={16} className="md:h-5 md:w-5" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50"
            title="Next Month"
          >
            <ChevronRight size={16} className="md:h-5 md:w-5" />
          </button>
          <div className="relative" ref={datePickerRef}>
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="ml-2 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 md:text-sm"
            >
              <CalendarIcon size={16} className="text-gray-500" />
              {appliedRange
                ? `${formatShortDate(appliedRange.start)} - ${formatShortDate(appliedRange.end)}`
                : 'Select Date Range'}

              {appliedRange ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setAppliedRange(null);
                    setShowDatePicker(false);
                  }}
                  className="ml-1 rounded-full p-0.5 transition-colors hover:bg-gray-200"
                  title="Clear Range"
                >
                  <X size={14} className="text-gray-600" />
                </div>
              ) : (
                <ChevronRight
                  size={16}
                  className={`ml-1 text-gray-400 transition-transform ${showDatePicker ? '-rotate-90' : 'rotate-90'}`}
                />
              )}
            </button>

            {showDatePicker && (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-semibold text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border border-gray-200 p-2 text-sm outline-none focus:border-[#257AFC]"
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-xs font-semibold text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md border border-gray-200 p-2 text-sm outline-none focus:border-[#257AFC]"
                  />
                </div>
                <div className="flex gap-2">
                  {appliedRange && (
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedRange(null);
                        setShowDatePicker(false);
                      }}
                      className="w-full rounded-md bg-gray-100 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleApplyRange}
                    className="w-full rounded-md bg-[#257AFC] py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2 text-center md:gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 md:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {isLoading ? (
        <CalendarGridSkeleton />
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-7 md:gap-4">
          {cells}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-[3px] border border-yellow-400 bg-yellow-50/30 md:h-4 md:w-4" />
          <span className="text-xs font-medium text-gray-500 md:text-sm">Medium Demand (2-4)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-[3px] border border-green-400 bg-green-50/30 md:h-4 md:w-4" />
          <span className="text-xs font-medium text-gray-500 md:text-sm">High Demand (5+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-[3px] border border-gray-200 bg-white md:h-4 md:w-4" />
          <span className="text-xs font-medium text-gray-500 md:text-sm">Low Demand (1-2)</span>
        </div>
      </div>
    </div>
  );
}
