import AsyncBoundary from '@/shared/components/AsyncBoundary'
import { useCustomerList } from './hooks/customerList'
import CustomerTable from './components/CustomerTable'
import { ChartLoading } from '../dashboard/components/ChartLoading'
import { ChartError } from '../dashboard/components/ChartError'

function CustomerListContainer() {
  const page = 1 // 추후 페이지네이션 구현 시 state로 변경
  const limit = 20

  // 데이터 조회
  const { data } = useCustomerList({
    page,
    limit,
    sortBy: 'desc', // 기본 정렬
  })

  return (
    <div className="space-y-6">
      {/* 필터 영역은 다음 단계에서 구현 */}

      <CustomerTable customers={data.data} />

      {/* 페이지네이션 영역은 다음 단계에서 구현 */}
    </div>
  )
}

export default function CustomerPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">고객 목록</h1>
      <AsyncBoundary pendingFallback={<ChartLoading />} rejectedFallback={ChartError}>
        <CustomerListContainer />
      </AsyncBoundary>
    </div>
  )
}
