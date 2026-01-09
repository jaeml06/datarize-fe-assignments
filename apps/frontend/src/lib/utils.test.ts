import { describe, it, expect } from 'vitest'
import { cn, isISODate } from './utils'

describe('utils (유틸리티)', () => {
  describe('cn (클래스 병합)', () => {
    it('클래스 이름이 올바르게 병합되어야 한다', () => {
      expect(cn('p-4', 'bg-red-500')).toBe('p-4 bg-red-500')
    })

    it('조건부 클래스를 처리해야 한다', () => {
      const isRed = true
      const isWhite = false
      expect(cn('p-4', isRed && 'bg-red-500', isWhite && 'text-white')).toBe('p-4 bg-red-500')
    })

    it('undefined 또는 null 값을 처리해야 한다', () => {
      expect(cn('p-4', undefined, null)).toBe('p-4')
    })

    it('Tailwind 클래스를 올바르게 병합(덮어쓰기)해야 한다', () => {
      expect(cn('p-4 p-8')).toBe('p-8')
      expect(cn('text-red-500 text-blue-500')).toBe('text-blue-500')
    })
  })

  describe('isISODate (ISO 날짜 검증)', () => {
    it('유효한 YYYY-MM-DD 형식에 대해 true를 반환해야 한다', () => {
      expect(isISODate('2023-01-01')).toBe(true)
      expect(isISODate('1999-12-31')).toBe(true)
    })

    it('잘못된 형식에 대해 false를 반환해야 한다', () => {
      expect(isISODate('20230101')).toBe(false)
      expect(isISODate('2023/01/01')).toBe(false)
      expect(isISODate('01-01-2023')).toBe(false)
      expect(isISODate('2023-1-1')).toBe(false) // Must be 2 digits
    })

    it('날짜가 아닌 문자열에 대해 false를 반환해야 한다', () => {
      expect(isISODate('hello')).toBe(false)
      expect(isISODate('')).toBe(false)
      expect(isISODate('   ')).toBe(false)
    })
  })
})
