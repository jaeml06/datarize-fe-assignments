import { DateRangeParams } from '@/types'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { usePurchaseFrequency } from '../hooks/purchaseFrequency'

type PurchaseFrequencyChartProps = DateRangeParams

export default function PurchaseFrequencyChart({ from, to }: PurchaseFrequencyChartProps) {
  const { data } = usePurchaseFrequency({ from, to })

  return (
    <div className="h-[400px] w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold mb-4">가격대별 구매 빈도</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="range" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip
            formatter={(value: number | undefined) => [`${value ?? 0}회`, '구매 건수']}
            labelStyle={{ color: '#374151' }}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="구매 건수" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
