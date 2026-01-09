import { render, screen, fireEvent } from '@testing-library/react'
import CustomerPurchaseModal from './CustomerPurchaseModal'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// CustomerPurchaseHistory 모킹 - 이미 별도로 테스트됨
vi.mock('./CustomerPurchaseHistory', () => ({
  default: () => <div data-testid="purchase-history">Purchase History Content</div>,
}))

// AsyncBoundary 모킹: 로딩/에러 상태를 테스트하거나 단순히 children을 렌더링하도록 설정
// Suspense/ErrorBoundary에 의존하므로 여기서는 prop 전달이나 기본 렌더링 여부를 확인
vi.mock('@/shared/components/AsyncBoundary', () => ({
  default: ({
    children,
    pendingFallback,
    rejectedFallback,
  }: {
    children: React.ReactNode
    pendingFallback: React.ReactNode
    rejectedFallback: React.ReactNode | ((props: { resetErrorBoundary: () => void }) => React.ReactNode)
  }) => {
    // 전역 상태나 컨텍스트를 통해 폴백을 트리거할 수도 있지만, 간단한 prop 확인을 위해:
    return (
      <div data-testid="async-boundary">
        {/* 폴백 존재 여부를 확인하거나 단순히 children을 렌더링 */}
        {children}
        <div data-testid="pending-fallback" style={{ display: 'none' }}>
          {pendingFallback}
        </div>
        <div data-testid="rejected-fallback" style={{ display: 'none' }}>
          {typeof rejectedFallback === 'function'
            ? rejectedFallback({ resetErrorBoundary: () => {} })
            : rejectedFallback}
        </div>
      </div>
    )
  },
}))

vi.mock('@/shared/components/DataLoadingFallback', () => ({
  default: () => <div>Loading...</div>,
}))

vi.mock('@/shared/components/DataErrorFallback', () => ({
  default: () => <div>Error occurred</div>,
}))

describe('CustomerPurchaseModal 컴포넌트', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('customerId가 없으면 null을 반환한다', () => {
    const { container } = render(<CustomerPurchaseModal isOpen={true} onClose={mockOnClose} customerId={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('모달이 열려있고 customerId가 있으면 모달을 렌더링한다', () => {
    // 모달 컴포넌트는 보통 Portal을 사용하므로 DOM 트리나 롤(role)로 쿼리해야 할 수 있음
    // 내부 컨텐츠를 모킹했으므로 텍스트 존재 여부로 확인

    render(<CustomerPurchaseModal isOpen={true} onClose={mockOnClose} customerId={123} customerName="홍길동" />)

    expect(screen.getByText('홍길동님의 상세 구매 내역')).toBeInTheDocument()
    expect(screen.getByTestId('purchase-history')).toBeInTheDocument()
  })

  it('닫기 버튼을 클릭하면 onClose를 호출한다', () => {
    // Modal이 Portal을 사용하는지, 어떻게 닫기 버튼을 렌더링하는지에 따라 테스트가 달라짐
    // 안전한 격리를 위해 아래에서 Modal을 모킹하여 테스트 진행
  })
})

// 격리된 테스트를 위해 Modal 모킹 수정
vi.mock('@/shared/components/Modal', () => ({
  default: ({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean
    onClose: () => void
    title?: string
    children?: React.ReactNode
  }) => {
    if (!isOpen) return null
    return (
      <div role="dialog">
        <h1>{title}</h1>
        <button onClick={onClose} aria-label="Close">
          Close
        </button>
        {children}
      </div>
    )
  },
}))

describe('CustomerPurchaseModal 통합', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('올바르게 렌더링된다', () => {
    render(<CustomerPurchaseModal isOpen={true} onClose={mockOnClose} customerId={123} customerName="홍길동" />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('홍길동님의 상세 구매 내역')).toBeInTheDocument()
    expect(screen.getByTestId('purchase-history')).toBeInTheDocument()
  })

  it('닫기 버튼 클릭 시 onClose가 트리거된다', () => {
    render(<CustomerPurchaseModal isOpen={true} onClose={mockOnClose} customerId={123} />)

    fireEvent.click(screen.getByLabelText('Close'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
