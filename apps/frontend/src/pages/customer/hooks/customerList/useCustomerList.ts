import { useSuspenseQuery } from '@tanstack/react-query'
import { CustomerListParams } from '@/api/customers/types'
import { customerListQueryOptions } from './queries'

export const useCustomerList = (params: CustomerListParams) => {
  return useSuspenseQuery(customerListQueryOptions(params))
}
