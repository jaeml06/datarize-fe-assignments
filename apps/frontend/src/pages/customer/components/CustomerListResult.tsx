import { ISODate } from '@/types'
import { useCustomerList } from '../hooks/customerList'
import CustomerTable from './CustomerTable'

interface CustomerListResultProps {
  name?: string
  sortBy?: 'asc' | 'desc' | null
  page?: number
  limit?: number
  from?: ISODate | null
  to?: ISODate | null
}

export default function CustomerListResult({ name, sortBy, page = 1, limit = 20, from, to }: CustomerListResultProps) {
  const { data } = useCustomerList({
    page,
    limit,
    name,
    sortBy,
    from,
    to,
  })

  return <CustomerTable customers={data.data} />
}
