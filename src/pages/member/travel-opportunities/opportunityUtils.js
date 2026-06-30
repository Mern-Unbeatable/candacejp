export function formatOpportunityCost(value) {
  if (value == null || value === '') return '—';

  const amount = Number(String(value).replace(/[^0-9.-]/g, ''));
  if (Number.isNaN(amount)) return String(value);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatOpportunityDeparture(departureDate) {
  if (!departureDate) {
    return { departureDate: '—', departureTime: '—' };
  }

  const date = new Date(departureDate);
  if (Number.isNaN(date.getTime())) {
    return { departureDate: String(departureDate), departureTime: '—' };
  }

  return {
    departureDate: date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    departureTime: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  };
}

export function mapMemberOpportunity(opportunity) {
  const { departureDate, departureTime } = formatOpportunityDeparture(
    opportunity.departureDate,
  );

  return {
    ...opportunity,
    departureDate,
    departureTime,
    costFormatted: formatOpportunityCost(opportunity.costFormatted ?? opportunity.estimatedPrice),
    seatsAvailable: opportunity.seatsAvailable ?? opportunity.availableSeat ?? 0,
    totalSeats: opportunity.totalSeats ?? opportunity.totalSeat ?? 0,
  };
}
