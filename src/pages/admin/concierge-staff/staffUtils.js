export function formatStaffName(staff) {
  return [staff?.firstName, staff?.lastName].filter(Boolean).join(' ') || staff?.email || '—'
}

export function mapStaffForDisplay(staff) {
  return {
    ...staff,
    name: formatStaffName(staff),
    phone: staff?.phone || '—',
    isActive: staff?.status === 'ACTIVE',
  }
}
