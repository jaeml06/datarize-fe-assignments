import { useCustomerList } from '../hooks/customerList'
import CustomerTable from './CustomerTable'

interface CustomerListResultProps {
  name?: string
  sortBy?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export default function CustomerListResult({ name, sortBy, page = 1, limit = 20 }: CustomerListResultProps) {
  const { data } = useCustomerList({
    page,
    limit,
    name,
    sortBy: sortBy || undefined,
  })

  return <CustomerTable customers={data.data} />
}
