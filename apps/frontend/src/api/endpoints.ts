export const API_ENDPOINTS = {
  PURCHASE: {
    FREQUENCY: '/api/purchase-frequency',
    LIST: '/api/purchases',
  },
  CUSTOMERS: {
    LIST: '/api/customers',
    PURCHASES: (id: number) => `/api/customers/${id}/purchases`,
  },
} as const
