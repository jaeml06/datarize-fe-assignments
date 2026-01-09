import { useState, useCallback } from 'react'
import { FallbackProps } from 'react-error-boundary'
import AsyncBoundary from '@/shared/components/AsyncBoundary'
import { useDateRange } from '@/shared/hooks/useDateRange'
import { usePagination } from '@/shared/hooks/usePagination'
import CustomerFilters from './components/CustomerFilters'
import CustomerListResult from './components/CustomerListResult'
import DataLoadingFallback from '@/shared/components/DataLoadingFallback'
import DataErrorFallback from '@/shared/components/DataErrorFallback'

export default function CustomerPage() {
  const [search, setSearch] = useState('')
  const { page, setPage, resetPage } = usePagination()
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | null>(null)
  const { from, to, setFrom, setTo } = useDateRange(undefined)

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      resetPage() // 검색 시 페이지 초기화
    },
    [resetPage],
  )

  const handleSortChange = useCallback(
    (value: 'asc' | 'desc' | null) => {
      setSortBy(value)
      resetPage()
    },
    [resetPage],
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">고객 목록</h1>

      <div className="space-y-6">
        <CustomerFilters
          onSearch={handleSearch}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
        />

        <AsyncBoundary
          pendingFallback={<DataLoadingFallback />}
          rejectedFallback={({ resetErrorBoundary }: FallbackProps) => (
            <DataErrorFallback onRetry={resetErrorBoundary} />
          )}
        >
          <CustomerListResult name={search} sortBy={sortBy} from={from} to={to} page={page} onPageChange={setPage} />
        </AsyncBoundary>
      </div>
    </div>
  )
}
