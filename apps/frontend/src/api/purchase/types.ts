import { ISODate } from '@/types'

export interface PurchaseFrequency {
  range: string
  count: number
}

export interface Purchase {
  date: ISODate
  customerName: string
  productName: string
  price: number
  quantity: number
}

export type PurchaseFilterParams = {
  from?: ISODate
  to?: ISODate
}
