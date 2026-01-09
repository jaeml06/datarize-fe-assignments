import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest'
import { usePaginationContext } from './PaginationContext'

// usePaginationContext 모킹
vi.mock('./PaginationContext', () => ({
  usePaginationContext: vi.fn(),
}))

describe('Pagination 컴포넌트', () => {
  const mockSetPage = vi.fn()
  const mockGoFirst = vi.fn()
  const mockGoLast = vi.fn()
  const mockGoNext = vi.fn()
  const mockGoPrev = vi.fn()

  const defaultContextValues = {
    pages: [1, 2, 3, 4, 5],
    isFirstPage: false,
    isLastPage: false,
    goFirst: mockGoFirst,
    goLast: mockGoLast,
    goNext: mockGoNext,
    goPrev: mockGoPrev,
    setPage: mockSetPage,
    page: 3,
    totalPage: 10,
    hasNextPage: true,
    hasPrevPage: true,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(usePaginationContext as Mock).mockReturnValue(defaultContextValues)
  })

  it('페이지가 비어있으면 아무것도 렌더링하지 않는다', () => {
    ;(usePaginationContext as Mock).mockReturnValue({
      ...defaultContextValues,
      pages: [],
    })

    const { container } = render(<Pagination />)
    expect(container).toBeEmptyDOMElement()
  })

  it('페이지 버튼과 네비게이션 컨트롤을 렌더링한다', () => {
    render(<Pagination />)

    // 페이지 번호가 렌더링되는지 확인
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()

    // 네비게이션 버튼 확인
    expect(screen.getByLabelText('First page')).toBeInTheDocument()
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
    expect(screen.getByLabelText('Last page')).toBeInTheDocument()
  })

  it('현재 페이지를 강조 표시한다', () => {
    render(<Pagination />)

    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    // Tailwind 관련 클래스 체크보다는 접근성을 위해 aria-current 속성 사용이 더 권장됨
  })

  it('페이지 번호를 클릭하면 setPage를 호출한다', () => {
    render(<Pagination />)

    fireEvent.click(screen.getByText('2'))
    expect(mockSetPage).toHaveBeenCalledWith(2)
  })

  it('컨트롤 버튼을 클릭하면 네비게이션 핸들러를 호출한다', () => {
    render(<Pagination />)

    fireEvent.click(screen.getByLabelText('First page'))
    expect(mockGoFirst).toHaveBeenCalled()

    fireEvent.click(screen.getByLabelText('Previous page'))
    expect(mockGoPrev).toHaveBeenCalled()

    fireEvent.click(screen.getByLabelText('Next page'))
    expect(mockGoNext).toHaveBeenCalled()

    fireEvent.click(screen.getByLabelText('Last page'))
    expect(mockGoLast).toHaveBeenCalled()
  })

  it('첫 페이지일 때 처음/이전 버튼을 비활성화한다', () => {
    ;(usePaginationContext as Mock).mockReturnValue({
      ...defaultContextValues,
      isFirstPage: true,
      page: 1,
    })

    render(<Pagination />)

    expect(screen.getByLabelText('First page')).toBeDisabled()
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
    expect(screen.getByLabelText('Next page')).not.toBeDisabled()
    expect(screen.getByLabelText('Last page')).not.toBeDisabled()
  })

  it('마지막 페이지일 때 다음/마지막 버튼을 비활성화한다', () => {
    ;(usePaginationContext as Mock).mockReturnValue({
      ...defaultContextValues,
      isLastPage: true,
      page: 10,
    })

    render(<Pagination />)

    expect(screen.getByLabelText('First page')).not.toBeDisabled()
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled()
    expect(screen.getByLabelText('Next page')).toBeDisabled()
    expect(screen.getByLabelText('Last page')).toBeDisabled()
  })
})
