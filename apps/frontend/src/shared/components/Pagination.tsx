import { cn } from '@/lib/utils'
import Button from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  maxVisiblePages?: number
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null

  // 1. 현재 페이지가 유효 범위를 벗어나지 않도록 보정
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages)

  // 2. 표시할 페이지 범위 계산
  const halfVisible = Math.floor(maxVisiblePages / 2)
  let startPage = Math.max(1, safeCurrentPage - halfVisible)
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  // 3. 범위 보정 (끝 부분이 부족할 경우 앞부분을 늘림)
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <nav className={cn('flex justify-center items-center gap-1', className)} aria-label="Pagination">
      <Button
        variant="outline"
        onClick={() => onPageChange(safeCurrentPage - 1)}
        disabled={safeCurrentPage <= 1}
        className="px-3 py-1 font-normal"
      >
        이전
      </Button>

      {startPage > 1 && (
        <>
          <Button variant="outline" onClick={() => onPageChange(1)} className="px-3 py-1 text-gray-600 font-normal">
            1
          </Button>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={safeCurrentPage === page ? 'primary' : 'outline'}
          onClick={() => onPageChange(page)}
          className={cn('px-3 py-1 min-w-[32px] font-normal', safeCurrentPage !== page && 'text-gray-600')}
          aria-current={safeCurrentPage === page ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
          <Button
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 text-gray-600 font-normal"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        onClick={() => onPageChange(safeCurrentPage + 1)}
        disabled={safeCurrentPage >= totalPages}
        className="px-3 py-1 font-normal"
      >
        다음
      </Button>
    </nav>
  )
}
