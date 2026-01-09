import { render, screen } from '@testing-library/react'
import CustomerPurchaseHistory from './CustomerPurchaseHistory'
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest'
import { useCustomerPurchases } from '../hooks/customerPurchases'

// useCustomerPurchases 모킹
vi.mock('../hooks/customerPurchases', () => ({
  useCustomerPurchases: vi.fn(),
}))

// 테스트 편의성을 위해 ProductImage 컴포넌트 모킹 (이미지 로딩 이슈 방지)
vi.mock('./ProductImage', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} data-testid="product-image" />,
}))

describe('CustomerPurchaseHistory 컴포넌트', () => {
  const mockPurchases = [
    {
      date: '2024-01-01',
      imgSrc: 'http://example.com/item1.jpg',
      product: 'Test Product 1',
      price: 10000,
      quantity: 2,
    },
    {
      date: '2024-01-02',
      imgSrc: 'http://example.com/item2.jpg',
      product: 'Test Product 2',
      price: 25000,
      quantity: 1,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('데이터가 존재할 때 구매 목록을 올바르게 렌더링한다', () => {
    ;(useCustomerPurchases as Mock).mockReturnValue({
      data: mockPurchases,
    })

    render(<CustomerPurchaseHistory customerId={1} />)

    // 테이블 헤더 확인
    expect(screen.getByText('상품')).toBeInTheDocument()
    expect(screen.getByText('구매 날짜')).toBeInTheDocument()
    expect(screen.getByText('가격')).toBeInTheDocument()
    expect(screen.getByText('수량')).toBeInTheDocument()
    expect(screen.getByText('총액')).toBeInTheDocument()

    // 데이터 렌더링 확인
    expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    expect(screen.getByText('2024-01-01')).toBeInTheDocument()
    expect(screen.getByText('10,000원')).toBeInTheDocument()
    expect(screen.getByText('2개')).toBeInTheDocument()
    expect(screen.getByText('20,000원')).toBeInTheDocument() // 계산된 총액

    expect(screen.getByText('Test Product 2')).toBeInTheDocument()
    expect(screen.getByText('2024-01-02')).toBeInTheDocument()
    const prices = screen.getAllByText('25,000원')
    expect(prices).toHaveLength(2) // 수량이 1개이므로 가격과 총액이 동일
    expect(screen.getByText('1개')).toBeInTheDocument()
    // 두 번째 아이템의 총액 (25000 * 1)

    // 이미지 확인
    const images = screen.getAllByTestId('product-image')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute('src', 'http://example.com/item1.jpg')
    expect(images[0]).toHaveAttribute('alt', 'Test Product 1')
  })

  it('데이터가 비어있을 때 빈 메시지를 렌더링한다', () => {
    ;(useCustomerPurchases as Mock).mockReturnValue({
      data: [],
    })

    render(<CustomerPurchaseHistory customerId={1} />)

    expect(screen.getByText('구매 내역이 없습니다.')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('데이터가 undefined일 때 빈 메시지를 렌더링한다', () => {
    ;(useCustomerPurchases as Mock).mockReturnValue({
      data: undefined,
    })

    render(<CustomerPurchaseHistory customerId={1} />)

    expect(screen.getByText('구매 내역이 없습니다.')).toBeInTheDocument()
  })
})
