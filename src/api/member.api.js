import { http } from '../lib/api/http'

export const memberApi = {
  getDashboardOverview() {
    return http.get('/member/dashboard/overview')
  },
}
