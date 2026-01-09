import { DateRangeParams } from '@/types'
import { useCustomerPurchases } from '../hooks/customerPurchases'
import { Table } from '@/shared/components/Table'
import { formatNumber } from '@/lib/utils'
import ProductImage from './ProductImage'

interface CustomerPurchaseHistoryProps extends DateRangeParams {
  customerId: number
}

export default function CustomerPurchaseHistory({ customerId, from, to }: CustomerPurchaseHistoryProps) {
  const { data } = useCustomerPurchases({ customerId, from, to })

  if (!data || data.length === 0) {
    return <div className="py-8 text-center text-gray-500">구매 내역이 없습니다.</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Header>
          <Table.Row className="bg-gray-50">
            <Table.Head className="px-4 py-3">상품</Table.Head>
            <Table.Head className="whitespace-nowrap px-4 py-3">구매 날짜</Table.Head>
            <Table.Head className="whitespace-nowrap px-4 py-3 text-right">가격</Table.Head>
            <Table.Head className="whitespace-nowrap px-4 py-3 text-right">수량</Table.Head>
            <Table.Head className="whitespace-nowrap px-4 py-3 text-right">총액</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((purchase, index) => (
            <Table.Row key={`${purchase.date}-${purchase.product}-${index}`} className="hover:bg-gray-50">
              <Table.Cell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <ProductImage src={purchase.imgSrc} alt={purchase.product} />
                  <span className="font-medium text-gray-900">{purchase.product}</span>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-4 py-3">{purchase.date}</Table.Cell>
              <Table.Cell className="whitespace-nowrap px-4 py-3 text-right">
                {formatNumber(purchase.price)}원
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-4 py-3 text-right">
                {formatNumber(purchase.quantity)}개
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-4 py-3 text-right font-medium">
                {formatNumber(purchase.price * purchase.quantity)}원
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
