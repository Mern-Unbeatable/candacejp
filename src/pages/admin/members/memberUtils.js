const REGISTRATION_FEE = '$199'

export function formatMemberName(member) {
  return [member?.firstName, member?.lastName].filter(Boolean).join(' ') || member?.email || '—'
}

export function formatMemberAddress(member) {
  return [member?.address, member?.city, member?.state, member?.zipCode]
    .filter(Boolean)
    .join(', ') || '—'
}

export function formatMemberPayment(member) {
  if (member?.status === 'ACTIVE' && member?.stripeCustomerId) {
    return REGISTRATION_FEE
  }

  if (member?.status === 'PENDING_PAYMENT') {
    return 'Pending'
  }

  return member?.status === 'ACTIVE' ? REGISTRATION_FEE : '—'
}

export function mapMemberForDisplay(member) {
  return {
    ...member,
    name: formatMemberName(member),
    address: formatMemberAddress(member),
    payment: formatMemberPayment(member),
    phone: member?.phone || '—',
  }
}
