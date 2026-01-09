import Button from '@/shared/components/Button'
import { cn } from '@/lib/utils'

interface DataErrorFallbackProps {
  message?: string
  onRetry?: () => void
  className?: string
  height?: string
}

export default function DataErrorFallback({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
  onRetry,
  className,
  height = 'h-[400px]',
}: DataErrorFallbackProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center bg-red-50 rounded-lg p-6 text-red-600 border border-red-200',
        height,
        className,
      )}
    >
      <p className="font-medium mb-2">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          다시 시도
        </Button>
      )}
    </div>
  )
}
