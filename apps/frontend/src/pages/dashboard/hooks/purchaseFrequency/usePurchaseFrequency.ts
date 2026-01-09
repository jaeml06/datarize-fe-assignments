import { useSuspenseQuery } from '@tanstack/react-query'
import { ISODate } from '@/types'
import { purchaseFrequencyQueryOptions } from './queries'

// 데이터 조회를 위한 Suspense 훅
export const usePurchaseFrequency = (startDate?: ISODate | null, endDate?: ISODate | null) => {
  return useSuspenseQuery(purchaseFrequencyQueryOptions(startDate, endDate))
}
