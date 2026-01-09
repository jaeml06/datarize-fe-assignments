import { DateRangeParams } from '@/types'
import { http } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import { CustomerListParams, CustomerListResponse, CustomerPurchase } from './types'

export const customerApi = {
  getList: (params?: CustomerListParams) => {
    return http.get<CustomerListResponse>(API_ENDPOINTS.CUSTOMERS.LIST, {
      params,
    })
  },

  getPurchases: (id: number, params?: DateRangeParams) => {
    return http.get<CustomerPurchase[]>(API_ENDPOINTS.CUSTOMERS.PURCHASES(id), {
      params: params as unknown as Record<string, string | number | boolean | null | undefined>,
    })
  },
}
