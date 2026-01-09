import { useState, useCallback } from 'react'
import { ISODate } from '@/types'

import { isISODate } from '@/lib/utils'

interface UseDateRangeProps {
  initialFrom?: ISODate
  initialTo?: ISODate
}

export const useDateRange = ({ initialFrom, initialTo }: UseDateRangeProps = {}) => {
  const [from, setFrom] = useState<ISODate | null>(initialFrom ?? null)
  const [to, setTo] = useState<ISODate | null>(initialTo ?? null)

  const handleFromChange = useCallback(
    (date: ISODate | '') => {
      if (date === '') {
        setFrom(null)
        return
      }

      if (!isISODate(date)) return

      const newFrom = date
      setFrom(newFrom)

      // 시작일이 변경되었을 때
      // 1. 종료일이 없으면 종료일도 시작일로 설정하여 사용자 편의 제공
      if (!to) {
        setTo(newFrom)
        return
      }

      // 2. 기존 종료일보다 늦다면 종료일을 시작일로 맞춥니다 (유효성 유지)
      if (newFrom > to) {
        setTo(newFrom)
      }
    },
    [to],
  )

  const handleToChange = useCallback(
    (date: ISODate | '') => {
      if (date === '') {
        setTo(null)
        return
      }

      if (!isISODate(date)) return

      const newTo = date

      // 종료일이 변경되었을 때
      // 1. 시작일이 없으면 시작일도 종료일로 설정하여 사용자 편의 제공
      if (!from) {
        setFrom(newTo)
        setTo(newTo) // 종료일 상태도 업데이트 필요
        return
      }

      // 2. 종료일이 시작일보다 빠를 경우 경고 (유효성 검증)
      if (newTo < from) {
        alert('종료일은 시작일보다 빠를 수 없습니다.')
        return
      }
      setTo(newTo)
    },
    [from],
  )

  return {
    from,
    to,
    setFrom: handleFromChange,
    setTo: handleToChange,
  }
}
