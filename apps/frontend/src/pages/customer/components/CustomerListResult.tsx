import { useState } from 'react'
import { ISODate } from '@/types'
import { useCustomerList } from '../hooks/customerList'
import CustomerTable from './CustomerTable'
import CustomerPurchaseModal from './CustomerPurchaseModal'
import Pagination from '@/shared/components/Pagination'
import { useModal } from '@/shared/hooks/useModal'

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

  const { isOpen, open, close } = useModal()
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)
  const [selectedCustomerName, setSelectedCustomerName] = useState('')

  const handleRowClick = (customer: { id: number; name: string }) => {
    setSelectedCustomerId(customer.id)
    setSelectedCustomerName(customer.name)
    open()
  }

  const handleClose = () => {
    close()
    setSelectedCustomerId(null)
  }

  return (
    <div className="space-y-6">
      <CustomerTable customers={data.data} onRowClick={handleRowClick} />
      <Pagination
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange}
      />

      {isOpen && selectedCustomerId && (
        <CustomerPurchaseModal
          isOpen={isOpen}
          onClose={handleClose}
          customerId={selectedCustomerId}
          customerName={selectedCustomerName}
          from={from}
          to={to}
        />
      )}
    </div>
  )
}
