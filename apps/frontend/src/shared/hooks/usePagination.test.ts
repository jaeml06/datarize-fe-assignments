import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { usePagination } from './usePagination'

describe('usePagination 훅', () => {
  it('기본값(1)으로 초기화되어야 한다', () => {
    const { result } = renderHook(() => usePagination())
    expect(result.current.page).toBe(1)
  })

  it('제공된 값으로 초기화되어야 한다', () => {
    const { result } = renderHook(() => usePagination({ initialPage: 5 }))
    expect(result.current.page).toBe(5)
  })

  describe('setPage', () => {
    it('페이지 번호를 정상적으로 변경해야 한다', () => {
      const { result } = renderHook(() => usePagination())

      act(() => {
        result.current.setPage(3)
      })

      expect(result.current.page).toBe(3)
    })

    it('1보다 작은 페이지 번호는 무시되어야 한다', () => {
      const { result } = renderHook(() => usePagination({ initialPage: 5 }))

      act(() => {
        result.current.setPage(0)
      })
      expect(result.current.page).toBe(5)

      act(() => {
        result.current.setPage(-1)
      })
      expect(result.current.page).toBe(5)
    })
  })

  describe('resetPage', () => {
    it('페이지를 1로 초기화해야 한다', () => {
      const { result } = renderHook(() => usePagination({ initialPage: 5 }))

      act(() => {
        result.current.resetPage()
      })

      expect(result.current.page).toBe(1)
    })
  })
})
