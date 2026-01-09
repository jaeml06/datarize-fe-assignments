import DateRangePicker from '@/shared/components/DateRangePicker'
import AsyncBoundary from '@/shared/components/AsyncBoundary'
import { useDateRange } from '@/shared/hooks/useDateRange'
import PurchaseFrequencyChart from './components/PurchaseFrequencyChart'
import { ChartLoading } from './components/ChartLoading'
import { ChartError } from './components/ChartError'
import PurchaseFrequencyDownloadButton from './components/PurchaseFrequencyDownloadButton'

export default function DashboardPage() {
  const { from, to, setFrom, setTo } = useDateRange()

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <div className="flex items-end gap-2">
          <DateRangePicker from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
          <PurchaseFrequencyDownloadButton from={from} to={to} />
        </div>
      </div>

      <AsyncBoundary pendingFallback={<ChartLoading />} rejectedFallback={ChartError}>
        <PurchaseFrequencyChart from={from} to={to} />
      </AsyncBoundary>
    </div>
  )
}
