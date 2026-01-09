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

      // 시작일이 변경되었을 때, 기존 종료일보다 늦다면 종료일을 초기화하거나 시작일로 맞춥니다.
      if (endDate && newStart > endDate) {
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

      // 종료일이 시작일보다 빠를 경우 업데이트를 무시합니다 (논리적 검증).
      if (startDate && newEnd < startDate) {
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
