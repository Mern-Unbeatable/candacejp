export function formatMoney(value) {
  if (value == null || value === '') return null;

  const amount = Number(String(value).replace(/[^0-9.-]/g, ''));
  if (Number.isNaN(amount)) return String(value);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTime(value) {
  if (!value) return { date: '—', time: null };

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { date: String(value), time: null };
  }

  return {
    date: date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  };
}

function normalizePassengers(passengers = []) {
  return passengers.map((passenger) => ({
    name:
      passenger.fullName ||
      passenger.name ||
      [passenger.firstName, passenger.lastName].filter(Boolean).join(' ').trim() ||
      '—',
    address: passenger.address || '—',
    email: passenger.email || '—',
    phone: passenger.phone || '—',
  }));
}

function formatStatus(status) {
  if (!status) return 'Confirmed';
  if (status === 'CONFIRMED') return 'Confirmed';
  return status;
}

const TRIP_SOURCE_LABELS = {
  TRAVEL_PREFERENCE: 'Travel Preferences',
  RESERVATION: 'Opportunities',
  CUSTOM_TRAVEL: 'Custom Travel',
};

export function formatTripSourceLabel(source) {
  return TRIP_SOURCE_LABELS[source] ?? source;
}

export function getTripTypeLabel({ source, type }) {
  if (source === 'TRAVEL_PREFERENCE' && type) {
    return `${formatTripSourceLabel(source)} · ${type}`;
  }
  return type ?? null;
}

export function mapUpcomingTripListItem(trip) {
  let departureDate = trip.departureDate;
  let departureTime = trip.departureTime ?? null;

  if (trip.source === 'RESERVATION') {
    const formatted = formatDateTime(trip.departureDate);
    departureDate = formatted.date;
    departureTime = formatted.time;
  }

  return {
    id: trip.id,
    source: trip.source,
    route: trip.route,
    type: trip.type,
    typeLabel: getTripTypeLabel(trip),
    departureDate,
    departureTime,
    costFormatted: formatMoney(trip.costFormatted ?? trip.estimatedPrice),
    passengerCount: trip.passengerCount,
    status: formatStatus(trip.status),
  };
}

export function mapTripDetailsForModal(data) {
  if (!data) return null;

  const passengers = normalizePassengers(data.passengers);
  let departureDate = data.departureDate;
  let departureTime = data.departureTime ?? null;
  let departureText = data.departureText ?? null;

  if (data.source === 'RESERVATION') {
    const formatted = formatDateTime(data.departureDate);
    departureDate = formatted.date;
    departureTime = formatted.time;
  }

  if (data.source === 'TRAVEL_PREFERENCE' && data.departureText) {
    departureText = data.departureText;
  }

  return {
    source: data.source,
    type: data.type,
    typeLabel: getTripTypeLabel(data),
    route: data.route,
    routes: data.routes ?? null,
    departureDate,
    departureTime,
    departureText,
    passengers,
    costFormatted: formatMoney(data.costFormatted ?? data.estimatedPrice),
    status: formatStatus(data.status),
  };
}
