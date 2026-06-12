import { apiSlice } from '../../app/apiSlice'

export const memberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => '/member/overview',
      providesTags: ['Member'],
    }),
    getTravelPlans: builder.query({
      query: () => '/member/travel',
      providesTags: ['Member'],
    }),
    getReservations: builder.query({
      query: () => '/member/reservations',
      providesTags: ['Member'],
    }),
    getTrips: builder.query({
      query: () => '/member/trips',
      providesTags: ['Member'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/member/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Member'],
    }),
  }),
})

export const {
  useGetOverviewQuery,
  useGetTravelPlansQuery,
  useGetReservationsQuery,
  useGetTripsQuery,
  useUpdateProfileMutation,
} = memberApiSlice
