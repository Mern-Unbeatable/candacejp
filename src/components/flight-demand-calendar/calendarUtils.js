export function formatDateKey(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return { year, month, day }
}

export function getDemandStyles(demandLevel) {
  switch (demandLevel) {
    case 'high':
      return {
        borderClass: 'border-green-400',
        bgClass: 'bg-green-50/30',
        dotClass: 'bg-green-500',
      }
    case 'medium':
      return {
        borderClass: 'border-yellow-400',
        bgClass: 'bg-yellow-50/30',
        dotClass: '',
      }
    default:
      return {
        borderClass: 'border-gray-200',
        bgClass: 'bg-white',
        dotClass: '',
      }
  }
}

export function isTodayDate(year, month, day) {
  const today = new Date()
  return (
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day
  )
}
