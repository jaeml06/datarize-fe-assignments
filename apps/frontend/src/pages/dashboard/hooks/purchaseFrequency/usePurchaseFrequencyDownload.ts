import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ISODate } from '@/types'
import { purchaseFrequencyQueryOptions } from './queries'

// 데이터 다운로드를 위한 Imperative Fetching 훅 (버튼용)
export const usePurchaseFrequencyDownload = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ startDate, endDate }: { startDate?: ISODate | null; endDate?: ISODate | null }) => {
      // 캐시된 데이터가 있으면 그대로 사용하고, 없으면 새로 fetch (ensureQueryData)
      return queryClient.ensureQueryData(purchaseFrequencyQueryOptions(startDate, endDate))
    },
  })

  return {
    fetchPurchaseFrequency: (startDate?: ISODate | null, endDate?: ISODate | null) =>
      mutation.mutateAsync({ startDate, endDate }),
    isDownloading: mutation.isPending,
  }
}
