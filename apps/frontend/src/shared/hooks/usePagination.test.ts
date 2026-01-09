import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { usePagination } from './usePagination'

describe('usePagination 훅', () => {
  // 테스트에서 공통으로 사용할 props
  const defaultProps = {
    page: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  }

  it('Props로 전달된 초기 page 값으로 렌더링되어야 한다', () => {
    const { result } = renderHook(() => usePagination({ ...defaultProps, page: 3 }))
    expect(result.current.page).toBe(3)
  })

  it('다음 페이지로 갈 때 onPageChange가 호출되어야 한다', () => {
    const onPageChange = vi.fn()
    const { result } = renderHook(() => usePagination({ ...defaultProps, page: 1, onPageChange }))

    act(() => {
      result.current.goNext()
    })

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('이전 페이지로 갈 때 onPageChange가 호출되어야 한다', () => {
    const onPageChange = vi.fn()
    const { result } = renderHook(() => usePagination({ ...defaultProps, page: 5, onPageChange }))

    act(() => {
      result.current.goPrev()
    })

    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('첫 페이지에서 이전 버튼을 누르면 onPageChange가 호출되지 않아야 한다', () => {
    const onPageChange = vi.fn()
    const { result } = renderHook(() => usePagination({ ...defaultProps, page: 1, onPageChange }))

    act(() => {
      result.current.goPrev()
    })

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('마지막 페이지에서 다음 버튼을 누르면 onPageChange가 호출되지 않아야 한다', () => {
    const onPageChange = vi.fn()
    const { result } = renderHook(() => usePagination({ ...defaultProps, page: 10, totalPages: 10, onPageChange }))

    act(() => {
      result.current.goNext()
    })

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('goFirst는 1페이지를 호출해야 한다', () => {
    const onPageChange = vi.fn()
    const { result } = renderHook(() => usePagination({ ...defaultProps, page: 5, onPageChange }))

    act(() => {
      result.current.goFirst()
    })

    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('goLast는 마지막 페이지(totalPages)를 호출해야 한다', () => {
    const onPageChange = vi.fn()
    const { result } = renderHook(() => usePagination({ ...defaultProps, page: 5, totalPages: 15, onPageChange }))

    act(() => {
      result.current.goLast()
    })

    expect(onPageChange).toHaveBeenCalledWith(15)
  })

  it('resetPage는 1페이지를 호출해야 한다', () => {
    const onPageChange = vi.fn()
    const { result } = renderHook(() => usePagination({ ...defaultProps, page: 5, onPageChange }))

    act(() => {
      result.current.resetPage()
    })

    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  describe('페이지 블록 계산 (View Logic)', () => {
    it('1페이지일 때 첫 블록(1~5)을 정확히 계산해야 한다', () => {
      const { result } = renderHook(() =>
        usePagination({ ...defaultProps, page: 1, totalPages: 20, maxVisiblePages: 5 }),
      )
      expect(result.current.pages).toEqual([1, 2, 3, 4, 5])
    })

    it('6페이지일 때 두 번째 블록(6~10)을 정확히 계산해야 한다', () => {
      const { result } = renderHook(() =>
        usePagination({ ...defaultProps, page: 6, totalPages: 20, maxVisiblePages: 5 }),
      )
      expect(result.current.pages).toEqual([6, 7, 8, 9, 10])
    })

    it('마지막 블록이 maxVisiblePages보다 작을 때도 정확히 계산해야 한다 (11~13)', () => {
      const { result } = renderHook(() =>
        usePagination({ ...defaultProps, page: 11, totalPages: 13, maxVisiblePages: 5 }),
      )
      expect(result.current.pages).toEqual([11, 12, 13])
    })

    it('totalPages가 0이거나 음수이면 빈 배열을 반환해야 한다', () => {
      const { result } = renderHook(() => usePagination({ ...defaultProps, page: 1, totalPages: 0 }))
      expect(result.current.pages).toEqual([])
    })
  })
})
