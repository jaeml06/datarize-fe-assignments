import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useModal } from './useModal'

describe('useModal 훅', () => {
  it('초기 상태는 닫혀있어야(false) 한다', () => {
    const { result } = renderHook(() => useModal())
    expect(result.current.isOpen).toBe(false)
  })

  it('open 호출 시 상태가 true로 변경되어야 한다', () => {
    const { result } = renderHook(() => useModal())

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)
  })

  it('close 호출 시 상태가 false로 변경되어야 한다', () => {
    const { result } = renderHook(() => useModal())

    // 먼저 open
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)

    // close 호출
    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })
})
