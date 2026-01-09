import { useMemo, useCallback } from 'react'

interface UsePaginationProps {
  page: number
  totalPages: number
  maxVisiblePages?: number
  onPageChange: (page: number) => void
}

export const usePagination = ({ page, totalPages, maxVisiblePages = 5, onPageChange }: UsePaginationProps) => {
  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (newPage: number) => {
      // 유효성 검사
      if (newPage < 1) return
      // totalPages가 있을 때만 상한 체크
      if (newPage > totalPages) return

      onPageChange(newPage)
    },
    [onPageChange, totalPages],
  )

  const resetPage = useCallback(() => {
    onPageChange(1)
  }, [onPageChange])

  // 페이지 블록 계산 로직
  const { pages, startPage, endPage, currentBlock } = useMemo(() => {
    // totalPages가 없거나 유효하지 않으면 계산하지 않음
    if (totalPages <= 0) {
      return { pages: [], startPage: 0, endPage: 0, currentBlock: 0 }
    }

    // page prop이 undefined일 경우 1페이지로 간주
    const safeCurrentPage = Math.min(Math.max(1, page), totalPages)
    const currentBlock = Math.ceil(safeCurrentPage / maxVisiblePages)
    const startPage = (currentBlock - 1) * maxVisiblePages + 1
    const endPage = Math.min(totalPages, currentBlock * maxVisiblePages)

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

    return { pages, startPage, endPage, currentBlock }
  }, [page, totalPages, maxVisiblePages])

  // 네비게이션 핸들러
  const goFirst = useCallback(() => handlePageChange(1), [handlePageChange])
  const goLast = useCallback(() => {
    handlePageChange(totalPages)
  }, [handlePageChange, totalPages])
  // 현재 페이지가 없으면 1로 가정
  const currentPage = page
  const goNext = useCallback(() => handlePageChange(currentPage + 1), [handlePageChange, currentPage])
  const goPrev = useCallback(() => handlePageChange(currentPage - 1), [handlePageChange, currentPage])

  // 상태 플래그
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  return {
    page: currentPage,
    setPage: handlePageChange,
    resetPage,
    // 계산된 값들
    pages,
    startPage,
    endPage,
    currentBlock,
    // 네비게이션 함수들
    goFirst,
    goLast,
    goNext,
    goPrev,
    // 상태 플래그
    isFirstPage,
    isLastPage,
  }
}

export type UsePaginationReturn = ReturnType<typeof usePagination>
