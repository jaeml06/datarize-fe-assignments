import { ISODate } from '@/types'

export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  limit: number
}

export interface CustomerListResponse {
  data: Customer[]
  pagination: Pagination
}

export interface CustomerPurchase {
  date: ISODate
  quantity: number
  product: string
  price: number
  imgSrc: string
}

export type CustomerListParams = {
  sortBy?: 'asc' | 'desc' | null
  name?: string
  page?: number
  limit?: number
  startDate?: ISODate | null
  endDate?: ISODate | null
}
