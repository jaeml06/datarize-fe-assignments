import { ISODate } from '@/types'
import { useCustomerPurchases } from '../hooks/useCustomerPurchases'
import { Table } from '@/shared/components/Table'
import { formatNumber } from '@/lib/utils'

interface CustomerPurchaseHistoryProps {
  customerId: number
  from?: ISODate | null
  to?: ISODate | null
}

export default function CustomerPurchaseHistory({ customerId, from, to }: CustomerPurchaseHistoryProps) {
  const { data } = useCustomerPurchases({ customerId, from, to })

  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500">구매 내역이 없습니다.</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Header>
          <Table.Row className="bg-gray-50">
            <Table.Head className="px-4 py-3">상품</Table.Head>
            <Table.Head className="px-4 py-3 whitespace-nowrap">구매 날짜</Table.Head>
            <Table.Head className="px-4 py-3 text-right whitespace-nowrap">가격</Table.Head>
            <Table.Head className="px-4 py-3 text-right whitespace-nowrap">수량</Table.Head>
            <Table.Head className="px-4 py-3 text-right whitespace-nowrap">총액</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((purchase, index) => (
            <Table.Row key={`${purchase.date}-${purchase.product}-${index}`} className="hover:bg-gray-50">
              <Table.Cell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={purchase.imgSrc}
                      alt={purchase.product}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-medium text-gray-900">{purchase.product}</span>
                </div>
              </Table.Cell>
              <Table.Cell className="px-4 py-3 whitespace-nowrap">{purchase.date}</Table.Cell>
              <Table.Cell className="px-4 py-3 text-right whitespace-nowrap">
                {formatNumber(purchase.price)}원
              </Table.Cell>
              <Table.Cell className="px-4 py-3 text-right whitespace-nowrap">
                {formatNumber(purchase.quantity)}개
              </Table.Cell>
              <Table.Cell className="px-4 py-3 text-right font-medium whitespace-nowrap">
                {formatNumber(purchase.price * purchase.quantity)}원
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
