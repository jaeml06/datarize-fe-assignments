import { ISODate } from '@/types'

export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface Pagination {
  page: number
  totalPages: number
  total: number
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
  from?: ISODate | null
  to?: ISODate | null
}
