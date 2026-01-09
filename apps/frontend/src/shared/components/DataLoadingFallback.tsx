import { cn } from '@/lib/utils'

interface DataLoadingFallbackProps {
  className?: string
  height?: string
  message?: string
}

export default function DataLoadingFallback({
  className,
  height = 'h-[400px]',
  message = '데이터를 불러오는 중입니다…',
}: DataLoadingFallbackProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-lg bg-gray-100', height, className)}
      aria-busy="true"
      aria-live="polite"
    >
      {/* shimmer background */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />

      {/* foreground content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-sm font-medium text-gray-500 animate-pulse">{message}</span>
      </div>
    </div>
  )
}
