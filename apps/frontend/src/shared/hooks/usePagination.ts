import { useState, useCallback } from 'react'
interface UsePaginationProps {
  initialPage?: number
}

export const usePagination = ({ initialPage = 1 }: UsePaginationProps = {}) => {
  const [page, setPage] = useState(initialPage)

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage < 1) return
    setPage(newPage)
  }, [])

  const resetPage = useCallback(() => {
    setPage(1)
  }, [])

  return {
    page,
    setPage: handlePageChange,
    resetPage,
  }
}
