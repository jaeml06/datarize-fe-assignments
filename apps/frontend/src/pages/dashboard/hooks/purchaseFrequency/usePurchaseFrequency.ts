import { useSuspenseQuery } from '@tanstack/react-query'

import { PurchaseFilterParams } from '@/api/purchase/types'
import { purchaseFrequencyQueryOptions } from './queries'

// 데이터 조회를 위한 Suspense 훅
export const usePurchaseFrequency = (params?: PurchaseFilterParams) => {
  return useSuspenseQuery(purchaseFrequencyQueryOptions(params))
}
