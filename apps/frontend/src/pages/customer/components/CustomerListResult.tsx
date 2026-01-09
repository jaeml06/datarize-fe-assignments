import { ISODate } from '@/types'
import { useCustomerList } from '../hooks/customerList'
import CustomerTable from './CustomerTable'

interface CustomerListResultProps {
  name?: string
  sortBy?: 'asc' | 'desc' | null
  page?: number
  limit?: number
  startDate?: ISODate | null
  endDate?: ISODate | null
}

export default function CustomerListResult({
  name,
  sortBy,
  page = 1,
  limit = 20,
  startDate,
  endDate,
}: CustomerListResultProps) {
  const { data } = useCustomerList({
    page,
    limit,
    name,
    sortBy,
    startDate,
    endDate,
  })

  return <CustomerTable customers={data.data} />
}
