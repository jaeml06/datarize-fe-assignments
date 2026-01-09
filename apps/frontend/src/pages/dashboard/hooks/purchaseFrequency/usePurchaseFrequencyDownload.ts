import { useQueryClient, useMutation } from '@tanstack/react-query'
import { PurchaseFilterParams } from '@/api/purchase/types'
import { purchaseFrequencyQueryOptions } from './queries'

// 데이터 다운로드를 위한 Imperative Fetching 훅 (버튼용)
export const usePurchaseFrequencyDownload = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (params?: PurchaseFilterParams) => {
      // 캐시된 데이터가 있으면 그대로 사용하고, 없으면 새로 fetch (ensureQueryData)
      return queryClient.ensureQueryData(purchaseFrequencyQueryOptions(params))
    },
  })

  return {
    fetchPurchaseFrequency: (params?: PurchaseFilterParams) => mutation.mutateAsync(params),
    isDownloading: mutation.isPending,
  }
}
