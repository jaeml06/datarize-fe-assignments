import { queryOptions } from '@tanstack/react-query'
import { purchaseApi } from '@/api/purchase/api'
import { ISODate } from '@/types'

// Query options 분리: 여러 훅이나 컴포넌트에서 동일한 쿼리 키와 함수를 재사용하기 위함
export const purchaseFrequencyQueryOptions = (startDate?: ISODate | null, endDate?: ISODate | null) =>
  queryOptions({
    queryKey: ['purchase-frequency', startDate, endDate],
    queryFn: () =>
      purchaseApi.getFrequency({
        from: startDate ?? undefined,
        to: endDate ?? undefined,
      }),
  })
