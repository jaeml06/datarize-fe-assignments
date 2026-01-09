import { queryOptions } from '@tanstack/react-query'
import { purchaseApi } from '@/api/purchase/api'
import { PurchaseFilterParams } from '@/api/purchase/types'

// Query options 분리: 여러 훅이나 컴포넌트에서 동일한 쿼리 키와 함수를 재사용하기 위함
export const purchaseFrequencyQueryOptions = (params?: PurchaseFilterParams) =>
  queryOptions({
    queryKey: ['purchase-frequency', params],
    queryFn: () => purchaseApi.getFrequency(params),
  })
