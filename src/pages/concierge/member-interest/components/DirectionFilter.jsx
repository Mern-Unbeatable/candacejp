import React, { useEffect, useRef, useState } from "react";
import { Filter, ChevronDown } from "lucide-react";

const FILTER_OPTIONS = [
  { value: "all", label: "All Direction" },
  { value: "nyc-tampa", label: "NYC - TAMPA" },
  { value: "tampa-nyc", label: "TAMPA - NYC" },
];

export function matchesDirectionFilter(direction, filter) {
  if (filter === "all") return true;

  const normalized = direction.toUpperCase().replace(/\s*→\s*|\s*-\s*/g, "-");
  if (filter === "nyc-tampa") {
    return normalized.includes("NYC") && normalized.includes("TAMPA") && normalized.indexOf("NYC") < normalized.indexOf("TAMPA");
  }
  if (filter === "tampa-nyc") {
    return normalized.includes("TAMPA") && normalized.includes("NYC") && normalized.indexOf("TAMPA") < normalized.indexOf("NYC");
  }
  return true;
}

export default function DirectionFilter({ value, onChange, hideLabel = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const selectedLabel = FILTER_OPTIONS.find((opt) => opt.value === value)?.label ?? "All Direction";

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center ${hideLabel ? "" : "gap-3"}`}>
      {!hideLabel && (
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Filter size={16} />
          Filter:
        </span>
      )}

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex min-w-[140px] items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300"
        >
          {selectedLabel}
          <ChevronDown size={14} className="text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-20 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-xs font-semibold transition-colors ${
                  value === option.value
                    ? "bg-[#257AFC] text-white"
                    : "bg-white text-gray-900 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
