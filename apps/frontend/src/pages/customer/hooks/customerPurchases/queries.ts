import { customerApi } from '@/api/customers/apis'
import { DateRangeParams } from '@/types'

interface UseCustomerPurchasesParams extends DateRangeParams {
  customerId: number
}

export const customerPurchasesQueryOptions = ({ customerId, from, to }: UseCustomerPurchasesParams) => ({
  queryKey: ['customer-purchases', customerId, from, to],
  queryFn: () => customerApi.getPurchases(customerId, { from, to }),
})

export type { UseCustomerPurchasesParams }
