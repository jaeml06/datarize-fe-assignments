import { useState, useCallback } from 'react'
import { ISODate } from '@/types'

import { isISODate } from '@/lib/utils'

interface UseDateRangeProps {
  initialStartDate?: ISODate
  initialEndDate?: ISODate
}

export const useDateRange = ({ initialStartDate, initialEndDate }: UseDateRangeProps = {}) => {
  const [startDate, setStartDate] = useState<ISODate | null>(initialStartDate ?? null)
  const [endDate, setEndDate] = useState<ISODate | null>(initialEndDate ?? null)

  const handleStartDateChange = useCallback(
    (date: ISODate | '') => {
      if (date === '') {
        setStartDate(null)
        return
      }

      if (!isISODate(date)) return

      const newStart = date
      setStartDate(newStart)

      // 시작일이 변경되었을 때
      // 1. 종료일이 없으면 종료일도 시작일로 설정하여 사용자 편의 제공
      if (!endDate) {
        setEndDate(newStart)
        return
      }

      // 2. 기존 종료일보다 늦다면 종료일을 시작일로 맞춥니다 (유효성 유지)
      if (newStart > endDate) {
        setEndDate(newStart)
      }
    },
    [endDate],
  )

  const handleEndDateChange = useCallback(
    (date: ISODate | '') => {
      if (date === '') {
        setEndDate(null)
        return
      }

      if (!isISODate(date)) return

      const newEnd = date

      // 종료일이 변경되었을 때
      // 1. 시작일이 없으면 시작일도 종료일로 설정하여 사용자 편의 제공
      if (!startDate) {
        setStartDate(newEnd)
        setEndDate(newEnd) // 종료일 상태도 업데이트 필요
        return
      }

      // 2. 종료일이 시작일보다 빠를 경우 경고 (유효성 검증)
      if (newEnd < startDate) {
        alert('종료일은 시작일보다 빠를 수 없습니다.')
        return
      }
      setEndDate(newEnd)
    },
    [startDate],
  )

  return {
    startDate,
    endDate,
    setStartDate: handleStartDateChange,
    setEndDate: handleEndDateChange,
  }
}
