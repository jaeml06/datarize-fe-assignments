import { ISODate } from '@/types'
import { useCustomerList } from '../hooks/customerList'
import CustomerTable from './CustomerTable'
import Pagination from '@/shared/components/Pagination'

interface CustomerListResultProps {
  name?: string
  sortBy?: 'asc' | 'desc' | null
  page?: number
  limit?: number
  from?: ISODate | null
  to?: ISODate | null
  onPageChange: (page: number) => void
}

export default function CustomerListResult({
  name,
  sortBy,
  page = 1,
  limit = 20,
  from,
  to,
  onPageChange,
}: CustomerListResultProps) {
  const { data } = useCustomerList({
    page,
    limit,
    name,
    sortBy,
    from,
    to,
  })

  return (
    <div className="space-y-6">
      <CustomerTable customers={data.data} />
      <Pagination
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
