import { useState } from 'react'
import { DateRangeParams } from '@/types'
import { useCustomerList } from '../hooks/customerList'
import CustomerTable from './CustomerTable'
import CustomerPurchaseModal from './CustomerPurchaseModal'
import Pagination from '@/shared/components/Pagination'
import { useModal } from '@/shared/hooks/useModal'
import { usePagination } from '@/shared/hooks/usePagination'
import { PaginationProvider } from '@/shared/components/PaginationContext'

interface CustomerListResultProps extends DateRangeParams {
  name?: string
  sortBy?: 'asc' | 'desc' | null
  limit?: number
}

export default function CustomerListResult({ name, sortBy, limit = 20, from, to }: CustomerListResultProps) {
  // 1. 페이지네이션 상태
  const [page, setPage] = useState(1)

  // 2. 데이터 페칭
  const { data } = useCustomerList({
    page,
    limit,
    name,
    sortBy,
    from,
    to,
  })

  // 3. 페이지네이션 뷰 로직
  // fetch된 totalPages와 위에서 선언한 상태(page, setPage)를 주입하여
  // UI에 필요한 계산된 값(pages 배열 등)과 핸들러를 생성합니다.
  const pagination = usePagination({
    page,
    onPageChange: setPage,
    totalPages: data?.pagination.totalPages ?? 0,
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

      {/* Context Provider를 통해 계산된 뷰 로직을 Pagination 컴포넌트에 제공 */}
      <PaginationProvider value={pagination}>
        <Pagination />
      </PaginationProvider>

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
