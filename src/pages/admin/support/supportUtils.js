export function truncateText(text, maxLength = 60) {
  if (!text) return '—'
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

export function formatSupportStatus(status) {
  if (status === 'SOLVED') {
    return { label: 'Solved', className: 'bg-green-50 text-green-700' }
  }
  return { label: 'New', className: 'bg-blue-50 text-[#257AFC]' }
}

export function formatSupportDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function mapSupportForDisplay(request) {
  const status = formatSupportStatus(request.status)

  return {
    ...request,
    phone: request.phone || '—',
    messagePreview: truncateText(request.message),
    statusLabel: status.label,
    statusClassName: status.className,
    isNew: request.status === 'NEW',
  }
}
