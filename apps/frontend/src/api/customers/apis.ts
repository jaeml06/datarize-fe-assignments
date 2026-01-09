import { http } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import { CustomerListParams, CustomerListResponse, CustomerPurchase } from './types'

export const customerApi = {
  getList: (params?: CustomerListParams) => {
    return http.get<CustomerListResponse>(API_ENDPOINTS.CUSTOMERS.LIST, {
      params,
    })
  },

  getPurchases: (id: number) => {
    return http.get<CustomerPurchase[]>(API_ENDPOINTS.CUSTOMERS.PURCHASES(id))
  },
}
