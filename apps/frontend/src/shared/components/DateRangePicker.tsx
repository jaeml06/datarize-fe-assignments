import { cn } from '@/lib/utils'
import { ISODate } from '@/types'
import DateInput from './DateInput'

interface DateRangePickerProps {
  from: ISODate | null
  to: ISODate | null
  onFromChange: (date: ISODate | '') => void
  onToChange: (date: ISODate | '') => void
  label?: string
  className?: string
}

export default function DateRangePicker({
  from,
  to,
  onFromChange,
  onToChange,
  label,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div className="flex items-center gap-2">
        <DateInput value={from ?? ''} onChange={onFromChange} label="시작일" />
        <span className="text-gray-500">~</span>
        <DateInput
          value={to ?? ''}
          onChange={onToChange}
          min={from ?? undefined} // UI 레벨에서의 최소값 제한
          label="종료일"
        />
      </div>
    </div>
  )
}
