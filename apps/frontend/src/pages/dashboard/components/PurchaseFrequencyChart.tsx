import { ISODate } from '@/types'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { usePurchaseFrequency } from '../hooks/usePurchaseFrequency'

interface PurchaseFrequencyChartProps {
  startDate?: ISODate | null
  endDate?: ISODate | null
}

export default function PurchaseFrequencyChart({ startDate, endDate }: PurchaseFrequencyChartProps) {
  const { data } = usePurchaseFrequency(startDate, endDate)

  return (
    <div className="h-[400px] w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    </div>
  )
}
