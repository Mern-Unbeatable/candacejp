import { apiSlice } from '../../app/apiSlice'

export const conciergeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => '/concierge/dashboard',
      providesTags: ['Concierge'],
    }),
    getCalendar: builder.query({
      query: () => '/concierge/calendar',
      providesTags: ['Concierge'],
    }),
    getMembersInterest: builder.query({
      query: () => '/concierge/members-interest',
      providesTags: ['Concierge'],
    }),
    updateMemberInterest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/concierge/members-interest/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Concierge'],
    }),
  }),
})

export const {
  useGetDashboardQuery,
  useGetCalendarQuery,
  useGetMembersInterestQuery,
  useUpdateMemberInterestMutation,
} = conciergeApiSlice
