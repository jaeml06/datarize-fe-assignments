import { render, screen } from '@testing-library/react'
import PurchaseFrequencyChart from './PurchaseFrequencyChart'
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest'
import { usePurchaseFrequency } from '../hooks/purchaseFrequency'

// usePurchaseFrequency 모킹
vi.mock('../hooks/purchaseFrequency', () => ({
  usePurchaseFrequency: vi.fn(),
}))

// Recharts 컴포넌트 모킹 (ResizeObserver 및 DOM 레이아웃 의존성 문제 해결)
vi.mock('recharts', () => {
  const OriginalRecharts = vi.importActual('recharts')
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container" style={{ width: 500, height: 400 }}>
        {children}
      </div>
    ),
    BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Bar: () => <div data-testid="bar" />,
  }
})

describe('PurchaseFrequencyChart 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('타이틀과 함께 차트를 렌더링한다', () => {
    ;(usePurchaseFrequency as Mock).mockReturnValue({
      data: [
        { range: '1000-2000', count: 10 },
        { range: '2000-3000', count: 5 },
      ],
    })

    render(<PurchaseFrequencyChart />)

    expect(screen.getByText('가격대별 구매 빈도')).toBeInTheDocument()
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()

    // 내부 차트 컴포넌트 렌더링 확인
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument()
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    expect(screen.getByTestId('bar')).toBeInTheDocument()
  })

  it('데이터가 비어있어도 올바르게 렌더링한다', () => {
    ;(usePurchaseFrequency as Mock).mockReturnValue({
      data: [],
    })

    render(<PurchaseFrequencyChart />)

    expect(screen.getByText('가격대별 구매 빈도')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })
})
