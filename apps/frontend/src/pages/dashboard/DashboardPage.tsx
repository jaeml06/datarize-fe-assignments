import DateRangePicker from '@/shared/components/DateRangePicker'
import AsyncBoundary from '@/shared/components/AsyncBoundary'
import { useDateRange } from '@/shared/hooks/useDateRange'
import PurchaseFrequencyChart from './components/PurchaseFrequencyChart'
import { ChartLoading } from './components/ChartLoading'
import { ChartError } from './components/ChartError'

export default function DashboardPage() {
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange()

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <AsyncBoundary pendingFallback={<ChartLoading />} rejectedFallback={ChartError}>
        <PurchaseFrequencyChart startDate={startDate} endDate={endDate} />
      </AsyncBoundary>
    </div>
  )
}
