import SearchInput from '@/shared/components/SearchInput'
import { Select } from '@/shared/components/Select'

interface CustomerFiltersProps {
  onSearch: (value: string) => void
  onSortChange: (value: 'asc' | 'desc' | '') => void
  sortBy?: 'asc' | 'desc' | ''
}

const SORT_OPTIONS = [
  { value: '', label: 'ID 순 (기본)' },
  { value: 'asc', label: '구매 금액 적은순' },
  { value: 'desc', label: '구매 금액 많은순' },
]

export default function CustomerFilters({ onSearch, sortBy, onSortChange }: CustomerFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="w-full md:w-64">
        <span className="text-sm font-medium text-gray-700 mb-2 block">이름 검색</span>
        <SearchInput placeholder="고객 이름 검색..." onSearch={onSearch} />
      </div>

      <div className="w-full md:w-48">
        <span className="text-sm font-medium text-gray-700 mb-2 block">정렬</span>
        <Select
          options={SORT_OPTIONS}
          value={sortBy || ''}
          onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc' | '')}
        />
      </div>
    </div>
  )
}
