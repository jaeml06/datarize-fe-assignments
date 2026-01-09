import { http } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import { Purchase, PurchaseFilterParams, PurchaseFrequency } from './types'

export const purchaseApi = {
  getFrequency: (params?: PurchaseFilterParams) => {
    return http.get<PurchaseFrequency[]>(API_ENDPOINTS.PURCHASE.FREQUENCY, {
      params,
    })
  },

  getList: (params?: PurchaseFilterParams) => {
    return http.get<Purchase[]>(API_ENDPOINTS.PURCHASE.LIST, {
      params,
    })
  },
}
