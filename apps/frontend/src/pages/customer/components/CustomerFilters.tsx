import SearchInput from '@/shared/components/SearchInput'
// import DateRangePicker from "@/shared/components/DateRangePicker"; // 날짜 선택은 나중에 구현

interface CustomerFiltersProps {
  onSearch: (value: string) => void
  // startDate: ISODate | null;
  // endDate: ISODate | null;
  // onStartDateChange: (date: ISODate | "") => void;
  // onEndDateChange: (date: ISODate | "") => void;
  // onSortChange: (value: "asc" | "desc") => void;
  // sortBy: "asc" | "desc";
}

export default function CustomerFilters({ onSearch }: CustomerFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="w-full md:w-64">
        <span className="text-sm font-medium text-gray-700 mb-2 block">이름 검색</span>
        <SearchInput placeholder="고객 이름 검색..." onSearch={onSearch} />
      </div>
    </div>
  )
}
