import { useSuspenseQuery } from '@tanstack/react-query'
import { customerPurchasesQueryOptions, UseCustomerPurchasesParams } from './queries'

export const useCustomerPurchases = (params: UseCustomerPurchasesParams) => {
  return useSuspenseQuery(customerPurchasesQueryOptions(params))
}
