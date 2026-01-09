import { ISODate } from '@/types'
import SearchInput from '@/shared/components/SearchInput'
import { Select } from '@/shared/components/Select'
import DateRangePicker from '@/shared/components/DateRangePicker'

interface CustomerFiltersProps {
  onSearch: (value: string) => void
  onSortChange: (value: 'asc' | 'desc' | null) => void
  sortBy?: 'asc' | 'desc' | null
  from: ISODate | null
  to: ISODate | null
  onFromChange: (date: ISODate | '') => void
  onToChange: (date: ISODate | '') => void
}

const SORT_OPTIONS = [
  { value: '', label: 'ID 순 (기본)' },
  { value: 'asc', label: '구매 금액 적은순' },
  { value: 'desc', label: '구매 금액 많은순' },
]

export default function CustomerFilters({
  onSearch,
  sortBy,
  onSortChange,
  from,
  to,
  onFromChange,
  onToChange,
}: CustomerFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div className="w-full md:w-64">
          <span className="text-sm font-medium text-gray-700 mb-2 block">이름 검색</span>
          <SearchInput placeholder="고객 이름 검색..." onSearch={onSearch} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div>
          <DateRangePicker from={from} to={to} onFromChange={onFromChange} onToChange={onToChange} label="구매 일자" />
        </div>
        <div className="w-full md:w-48">
          <span className="text-sm font-medium text-gray-700 mb-2 block">정렬</span>
          <Select
            options={SORT_OPTIONS}
            value={sortBy || ''}
            onChange={(e) => {
              const value = e.target.value
              onSortChange(value === '' ? null : (value as 'asc' | 'desc'))
            }}
          />
        </div>
      </div>
    </div>
  )
}
