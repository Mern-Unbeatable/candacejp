export const MEMBER_ROUTE_OPTIONS = [
  { value: 'NYC', label: 'New York (NYC)' },
  { value: 'TAMPA', label: 'Tampa (TAMPA)' },
];

export const OPPOSITE_MEMBER_ROUTE = {
  NYC: 'TAMPA',
  TAMPA: 'NYC',
};

export function applyOppositeRoute(field, value, current) {
  const next = { ...current, [field]: value };

  if (field === 'from' && OPPOSITE_MEMBER_ROUTE[value]) {
    next.to = OPPOSITE_MEMBER_ROUTE[value];
  }

  if (field === 'to' && OPPOSITE_MEMBER_ROUTE[value]) {
    next.from = OPPOSITE_MEMBER_ROUTE[value];
  }

  return next;
}

export function applyCustomTravelRouteChange(field, value, current) {
  const next = { ...current, [field]: value };

  if (field === 'origin' && OPPOSITE_MEMBER_ROUTE[value]) {
    next.destination = OPPOSITE_MEMBER_ROUTE[value];
  }

  if (field === 'destination' && OPPOSITE_MEMBER_ROUTE[value]) {
    next.origin = OPPOSITE_MEMBER_ROUTE[value];
  }

  if (field === 'returnOrigin' && OPPOSITE_MEMBER_ROUTE[value]) {
    next.returnDestination = OPPOSITE_MEMBER_ROUTE[value];
  }

  if (field === 'returnDestination' && OPPOSITE_MEMBER_ROUTE[value]) {
    next.returnOrigin = OPPOSITE_MEMBER_ROUTE[value];
  }

  if (
    (field === 'origin' || field === 'destination') &&
    current.tripType === 'Round trip' &&
    next.origin &&
    next.destination
  ) {
    next.returnOrigin = next.destination;
    next.returnDestination = next.origin;
  }

  return next;
}
