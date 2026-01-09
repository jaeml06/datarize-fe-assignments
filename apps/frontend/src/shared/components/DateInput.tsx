import { ChangeEvent, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { ISODate } from '@/types'

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: ISODate | ''
  onChange: (date: ISODate | '') => void
  label?: string
}

export default function DateInput({ value, onChange, label, className, ...props }: DateInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as ISODate | '')
  }

  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      className={cn(
        'px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-shadow',
        className,
      )}
      aria-label={label}
      {...props}
    />
  )
}
