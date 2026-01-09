import { cn } from '@/lib/utils'
import Button from './Button'
import { usePaginationContext } from './PaginationContext'

interface PaginationProps {
  className?: string
}

export default function Pagination({ className }: PaginationProps) {
  const {
    pages,
    isFirstPage,
    isLastPage,
    goFirst,
    goLast,
    goNext,
    goPrev,
    setPage,
    page: currentPage,
  } = usePaginationContext()

  // pages가 없으면 렌더링하지 않음
  if (!pages || pages.length === 0) return null

  return (
    <nav className={cn('flex justify-center items-center gap-1', className)} aria-label="Pagination">
      {/* 맨 처음으로 */}
      <Button
        variant="outline"
        onClick={goFirst}
        disabled={isFirstPage}
        className="px-2 py-1 font-normal"
        aria-label="First page"
      >
        {'<<'}
      </Button>

      {/* 이전 페이지 */}
      <Button
        variant="outline"
        onClick={goPrev}
        disabled={isFirstPage}
        className="px-2 py-1 font-normal"
        aria-label="Previous page"
      >
        {'<'}
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'outline'}
          onClick={() => setPage(page)}
          className={cn('px-3 py-1 min-w-8 font-normal', currentPage !== page && 'text-gray-600')}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      {/* 다음 페이지 */}
      <Button
        variant="outline"
        onClick={goNext}
        disabled={isLastPage}
        className="px-2 py-1 font-normal"
        aria-label="Next page"
      >
        {'>'}
      </Button>

      {/* 맨 끝으로 */}
      <Button
        variant="outline"
        onClick={goLast}
        disabled={isLastPage}
        className="px-2 py-1 font-normal"
        aria-label="Last page"
      >
        {'>>'}
      </Button>
    </nav>
  )
}
