import { createContext, useContext, ReactNode } from 'react'
import { UsePaginationReturn } from '../hooks/usePagination'

const PaginationContext = createContext<UsePaginationReturn | null>(null)

export const usePaginationContext = () => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePaginationContext는 PaginationProvider 내부에서 사용되어야 합니다.')
  }
  return context
}

interface PaginationProviderProps {
  children: ReactNode
  value: UsePaginationReturn
}

export const PaginationProvider = ({ children, value }: PaginationProviderProps) => {
  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
}
