import { useSuspenseQuery } from '@tanstack/react-query'
import { purchaseApi } from '@/api/purchase/api'
import { ISODate } from '@/types'

export const usePurchaseFrequency = (startDate?: ISODate | null, endDate?: ISODate | null) => {
  return useSuspenseQuery({
    queryKey: ['purchase-frequency', startDate, endDate],
    queryFn: () =>
      purchaseApi.getFrequency({
        from: startDate ?? undefined,
        to: endDate ?? undefined,
      }),
  })
}
