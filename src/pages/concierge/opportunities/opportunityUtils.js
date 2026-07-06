const DIRECTION_LABELS = {
  NYC_TAMPA: 'NYC → Tampa',
  TAMPA_NYC: 'Tampa → NYC',
}

const TRIP_TYPE_LABELS = {
  ONE_WAY: 'One Way',
  ROUND_TRIP: 'Round Trip',
}

const STATUS_LABELS = {
  DRAFT: 'Draft',
  OPEN_FOR_RESERVATION: 'Open For Reservation',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
}

export const OPPORTUNITY_TABS = [
  'All',
  'Open For Reservation',
  'Confirmed',
  'Completed',
  'Draft',
]

export const TAB_TO_API_STATUS = {
  All: 'all',
  'Open For Reservation': 'OPEN_FOR_RESERVATION',
  Confirmed: 'CONFIRMED',
  Completed: 'COMPLETED',
  Draft: 'DRAFT',
}

export function getTabFromStatusFilter(status = 'all') {
  const entry = Object.entries(TAB_TO_API_STATUS).find(([, apiStatus]) => apiStatus === status)
  return entry?.[0] ?? OPPORTUNITY_TABS[0]
}

export function getOpportunitiesListUrl(status = 'all') {
  if (!status || status === 'all') return '/concierge/opportunities'
  return `/concierge/opportunities?status=${status}`
}

export function formatOpportunityRoute(opportunity) {
  if (opportunity?.route) return opportunity.route
  if (opportunity?.direction && DIRECTION_LABELS[opportunity.direction]) {
    return DIRECTION_LABELS[opportunity.direction]
  }
  if (opportunity?.origin && opportunity?.destination) {
    return `${opportunity.origin} → ${opportunity.destination}`
  }
  return '—'
}

export function formatOpportunityTripType(tripType) {
  return TRIP_TYPE_LABELS[tripType] ?? tripType ?? '—'
}

export function formatOpportunityStatus(status) {
  return STATUS_LABELS[status] ?? status ?? '—'
}

export function formatOpportunityDeparture(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatOpportunityPrice(price) {
  const value = Number(price)
  if (Number.isNaN(value)) return '—'
  return value.toLocaleString('en-US')
}

export function mapOpportunityRow(opportunity) {
  return {
    ...opportunity,
    route: formatOpportunityRoute(opportunity),
    type: formatOpportunityTripType(opportunity.tripType),
    departure: formatOpportunityDeparture(opportunity.departureDate),
    status: formatOpportunityStatus(opportunity.status),
    statusCode: opportunity.status,
    totalSeat: opportunity.totalSeat ?? opportunity.totalCapacity,
    totalBooked: opportunity.totalBooked ?? 0,
    availableSeat: opportunity.availableSeat ?? 0,
  }
}
