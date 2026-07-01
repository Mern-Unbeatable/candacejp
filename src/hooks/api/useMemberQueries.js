import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { memberApi } from '../../api/member.api'
import { queryKeys } from '../../lib/query/queryKeys'

export function useMemberDashboardOverviewQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.member.overview(),
    queryFn: () => memberApi.getDashboardOverview(),
    ...options,
  })
}

export function useMemberOpportunitiesQuery(
  { page = 1, limit = 10 } = {},
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.member.opportunities(page, limit),
    queryFn: () => memberApi.getOpportunities({ page, limit }),
    ...options,
  })
}

export function usePlaceMemberReservationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (opportunityId) => memberApi.placeReservation(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.member.all, 'opportunities'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.overview() })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.reservations() })
    },
  })
}

export function useMemberPendingReservationsQuery(
  { page = 1, limit = 3 } = {},
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.member.pendingReservations(page, limit),
    queryFn: () => memberApi.getPendingReservations({ page, limit }),
    ...options,
  })
}

export function useCancelMemberReservationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reservationId) => memberApi.cancelReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.member.all, 'pending-reservations'] })
      queryClient.invalidateQueries({ queryKey: [...queryKeys.member.all, 'upcoming-trips'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.reservations() })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.overview() })
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}

export function useMemberUpcomingTripsQuery(
  { page = 1, limit = 4 } = {},
  options = {},
) {
  return useQuery({
    queryKey: queryKeys.member.upcomingTrips(page, limit),
    queryFn: () => memberApi.getUpcomingTrips({ page, limit }),
    ...options,
  })
}

export function useMemberUpcomingTripDetailsQuery(trip, options = {}) {
  return useQuery({
    queryKey: queryKeys.member.upcomingTripDetails(trip?.source, trip?.id),
    queryFn: async () => {
      if (trip.source === 'RESERVATION') {
        return memberApi.getReservationDetails(trip.id)
      }
      if (trip.source === 'TRAVEL_PREFERENCE') {
        return memberApi.getTravelPreferenceDetails(trip.id)
      }
      if (trip.source === 'CUSTOM_TRAVEL') {
        return memberApi.getCustomTravelDetails(trip.id)
      }
      throw new Error('Unknown trip source')
    },
    enabled: Boolean(trip?.id && trip?.source),
    ...options,
  })
}

export function useMemberTravelPreferencesQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.member.travelPreferences(),
    queryFn: () => memberApi.getTravelPreferences(),
    ...options,
  })
}

export function useCreateMemberTravelPreferenceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => memberApi.createTravelPreference(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.member.travelPreferences() })
      queryClient.invalidateQueries({ queryKey: [...queryKeys.member.all, 'upcoming-trips'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.overview() })
    },
  })
}

export function useDeleteMemberTravelPreferenceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (preferenceId) => memberApi.deleteTravelPreference(preferenceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.member.travelPreferences() })
      queryClient.invalidateQueries({ queryKey: [...queryKeys.member.all, 'upcoming-trips'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.member.overview() })
    },
  })
}
