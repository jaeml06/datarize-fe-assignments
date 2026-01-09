import { useState } from 'react'
import AsyncBoundary from '@/shared/components/AsyncBoundary'
import CustomerFilters from './components/CustomerFilters'
import { ChartLoading } from '../dashboard/components/ChartLoading'
import { ChartError } from '../dashboard/components/ChartError'
import CustomerListResult from './components/CustomerListResult'

export default function CustomerPage() {
  const [search, setSearch] = useState('')

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">고객 목록</h1>

      <div className="space-y-6">
        <CustomerFilters onSearch={handleSearch} />

        <AsyncBoundary pendingFallback={<ChartLoading />} rejectedFallback={ChartError}>
          <CustomerListResult name={search} />
        </AsyncBoundary>

        {/* 페이지네이션 영역은 다음 단계에서 구현 */}
      </div>
    </div>
  )
}
