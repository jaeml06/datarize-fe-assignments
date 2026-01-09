import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useDateRange } from './useDateRange'
import { ISODate } from '@/types'

describe('useDateRange 훅', () => {
  // Mock window.alert
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('기본값(null)으로 초기화되어야 한다', () => {
    const { result } = renderHook(() => useDateRange())
    expect(result.current.startDate).toBeNull()
    expect(result.current.endDate).toBeNull()
  })

  it('제공된 값으로 초기화되어야 한다', () => {
    const initialStart = '2023-01-01' as ISODate
    const initialEnd = '2023-01-31' as ISODate
    const { result } = renderHook(() => useDateRange({ initialStartDate: initialStart, initialEndDate: initialEnd }))

    expect(result.current.startDate).toBe(initialStart)
    expect(result.current.endDate).toBe(initialEnd)
  })

  describe('setStartDate (시작일 설정)', () => {
    it('시작일이 정상적으로 업데이트되어야 한다', () => {
      const { result } = renderHook(() => useDateRange())

      act(() => {
        result.current.setStartDate('2023-01-01' as ISODate)
      })

      expect(result.current.startDate).toBe('2023-01-01')
    })

    it('빈 문자열이 전달되면 시작일이 null로 설정되어야 한다', () => {
      const { result } = renderHook(() => useDateRange({ initialStartDate: '2023-01-01' as ISODate }))

      act(() => {
        result.current.setStartDate('')
      })

      expect(result.current.startDate).toBeNull()
    })

    it('새로운 시작일이 현재 종료일보다 늦으면 종료일도 시작일과 동일하게 조정되어야 한다', () => {
      const { result } = renderHook(() =>
        useDateRange({
          initialStartDate: '2023-01-01' as ISODate,
          initialEndDate: '2023-01-05' as ISODate,
        }),
      )

      act(() => {
        // Set start date to after end date
        result.current.setStartDate('2023-01-10' as ISODate)
      })

      expect(result.current.startDate).toBe('2023-01-10')
      expect(result.current.endDate).toBe('2023-01-10') // End date should verify to match start date
    })
  })

  describe('setEndDate (종료일 설정)', () => {
    it('종료일이 정상적으로 업데이트되어야 한다', () => {
      const { result } = renderHook(() => useDateRange({ initialStartDate: '2023-01-01' as ISODate }))

      act(() => {
        result.current.setEndDate('2023-01-05' as ISODate)
      })

      expect(result.current.endDate).toBe('2023-01-05')
    })

    it('빈 문자열이 전달되면 종료일이 null로 설정되어야 한다', () => {
      const { result } = renderHook(() => useDateRange({ initialEndDate: '2023-01-05' as ISODate }))

      act(() => {
        result.current.setEndDate('')
      })

      expect(result.current.endDate).toBeNull()
    })

    it('종료일이 시작일보다 빠르면 업데이트되지 않고 경고창을 표시해야 한다', () => {
      const { result } = renderHook(() =>
        useDateRange({
          initialStartDate: '2023-01-10' as ISODate,
          initialEndDate: '2023-01-20' as ISODate,
        }),
      )

      act(() => {
        // Try to set end date before start date
        result.current.setEndDate('2023-01-05' as ISODate)
      })

      expect(alertMock).toHaveBeenCalledWith('종료일은 시작일보다 빠를 수 없습니다.')
      expect(result.current.endDate).toBe('2023-01-20') // Should remain unchanged
    })
  })
})
