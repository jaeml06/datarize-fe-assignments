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

  // 2. 블록 단위 페이지 계산
  // 예: maxVisiblePages가 5일 때
  // 1~5페이지 -> startPage: 1, endPage: 5
  // 6~10페이지 -> startPage: 6, endPage: 10
  const currentBlock = Math.ceil(safeCurrentPage / maxVisiblePages)
  const startPage = (currentBlock - 1) * maxVisiblePages + 1
  const endPage = Math.min(totalPages, currentBlock * maxVisiblePages)

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <nav className={cn('flex justify-center items-center gap-1', className)} aria-label="Pagination">
      {/* 맨 처음으로 */}
      <Button
        variant="outline"
        onClick={() => onPageChange(1)}
        disabled={safeCurrentPage <= 1}
        className="px-2 py-1 font-normal"
        aria-label="First page"
      >
        {'<<'}
      </Button>

      {/* 이전 페이지 */}
      <Button
        variant="outline"
        onClick={() => onPageChange(safeCurrentPage - 1)}
        disabled={safeCurrentPage <= 1}
        className="px-2 py-1 font-normal"
        aria-label="Previous page"
      >
        {'<'}
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={safeCurrentPage === page ? 'primary' : 'outline'}
          onClick={() => onPageChange(page)}
          className={cn('px-3 py-1 min-w-8 font-normal', safeCurrentPage !== page && 'text-gray-600')}
          aria-current={safeCurrentPage === page ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      {/* 다음 페이지 */}
      <Button
        variant="outline"
        onClick={() => onPageChange(safeCurrentPage + 1)}
        disabled={safeCurrentPage >= totalPages}
        className="px-2 py-1 font-normal"
        aria-label="Next page"
      >
        {'>'}
      </Button>

      {/* 맨 끝으로 */}
      <Button
        variant="outline"
        onClick={() => onPageChange(totalPages)}
        disabled={safeCurrentPage >= totalPages}
        className="px-2 py-1 font-normal"
        aria-label="Last page"
      >
        {'>>'}
      </Button>
    </nav>
  )
}
