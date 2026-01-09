import DateRangePicker from '@/shared/components/DateRangePicker'
import { useDateRange } from '@/shared/hooks/useDateRange'

export default function DashboardPage() {
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange()

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <DateRangePicker
          startDate={startDate ?? ''}
          endDate={endDate ?? ''}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-600 mb-2">선택된 기간:</p>
        <p className="font-mono bg-gray-50 inline-block px-3 py-1 rounded">
          {startDate || '시작일 미선택'} ~ {endDate || '종료일 미선택'}
        </p>
      </div>

      <p>대시보드 페이지입니다.</p>
    </div>
  )
}
