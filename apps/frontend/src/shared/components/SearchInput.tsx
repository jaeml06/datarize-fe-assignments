import { InputHTMLAttributes, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/shared/hooks/useDebounce'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (value: string) => void
  debounceMs?: number
}

export default function SearchInput({ className, onSearch, debounceMs = 300, ...props }: SearchInputProps) {
  const [value, setValue] = useState(props.value || '')
  const debouncedValue = useDebounce(value, debounceMs)

  useEffect(() => {
    onSearch(String(debouncedValue))
  }, [debouncedValue, onSearch])

  return (
    <div className={cn('relative', className)}>
      <input
        type="text"
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </div>
  )
}
