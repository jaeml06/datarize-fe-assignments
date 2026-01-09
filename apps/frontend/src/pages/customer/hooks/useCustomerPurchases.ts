import { useSuspenseQuery } from '@tanstack/react-query'
import { customerApi } from '@/api/customers/apis'
import { ISODate } from '@/types'

interface UseCustomerPurchasesParams {
  customerId: number
  from?: ISODate | null
  to?: ISODate | null
}

export const customerPurchasesQueryOptions = ({ customerId, from, to }: UseCustomerPurchasesParams) => ({
  queryKey: ['customer-purchases', customerId, from, to],
  queryFn: () => customerApi.getPurchases(customerId, { from, to }),
})

export const useCustomerPurchases = (params: UseCustomerPurchasesParams) => {
  return useSuspenseQuery(customerPurchasesQueryOptions(params))
}
