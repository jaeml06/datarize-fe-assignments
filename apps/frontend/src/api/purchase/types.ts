import { ISODate } from '@/types'

import { CustomerListParams } from '@/api/customers/types'

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
  from?: ISODate | null
  to?: ISODate | null
}
