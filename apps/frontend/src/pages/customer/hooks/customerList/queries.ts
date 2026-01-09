import { queryOptions } from '@tanstack/react-query'
import { customerApi } from '@/api/customers/apis'
import { CustomerListParams } from '@/api/customers/types'

export const customerListQueryOptions = (params: CustomerListParams) =>
  queryOptions({
    queryKey: ['customers', params],
    queryFn: () => customerApi.getList(params),
  })
