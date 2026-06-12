import { apiSlice } from '../../app/apiSlice'

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => '/admin/dashboard',
      providesTags: ['Admin'],
    }),
    getMembers: builder.query({
      query: () => '/admin/members',
      providesTags: ['Admin'],
    }),
    getStaff: builder.query({
      query: () => '/admin/staff',
      providesTags: ['Admin'],
    }),
    getSettings: builder.query({
      query: () => '/admin/settings',
      providesTags: ['Admin'],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: '/admin/settings',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const {
  useGetDashboardQuery,
  useGetMembersQuery,
  useGetStaffQuery,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = adminApiSlice
