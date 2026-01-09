import { useState, useMemo } from 'react'
import { FallbackProps } from 'react-error-boundary'
import AsyncBoundary from '@/shared/components/AsyncBoundary'
import { useDateRange } from '@/shared/hooks/useDateRange'
import CustomerFilters from './components/CustomerFilters'
import CustomerListResult from './components/CustomerListResult'
import DataLoadingFallback from '@/shared/components/DataLoadingFallback'
import DataErrorFallback from '@/shared/components/DataErrorFallback'

export default function CustomerPage() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | null>(null)
  const { from, to, setFrom, setTo } = useDateRange(undefined)

  // 필터가 변경될 때마다 CustomerListResult를 리마운트하여 내부 Pagination 상태(1페이지)를 리셋함.
  // Pagination 상태 관리를 CustomerListResult 내부로 위임했으므로,
  // 상위에서는 상태를 초기화하는 트리거(key)만 제공하면 됨.
  const filterKey = useMemo(() => {
    return JSON.stringify({ search, sortBy, from, to })
  }, [search, sortBy, from, to])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">고객 목록</h1>

      <div className="space-y-6">
        <CustomerFilters
          onSearch={setSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
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
          <CustomerListResult key={filterKey} name={search} sortBy={sortBy} from={from} to={to} />
        </AsyncBoundary>
      </div>
    </div>
  )
}
