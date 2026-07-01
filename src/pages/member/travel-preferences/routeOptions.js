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
