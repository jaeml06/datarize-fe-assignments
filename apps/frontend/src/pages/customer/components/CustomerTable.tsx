import { Customer } from '@/api/customers/types'
import { Table } from '@/shared/components/Table'

interface CustomerTableProps {
  customers: Customer[]
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-200">
        데이터가 없습니다.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-[80px] border-r border-gray-200 text-center">No.</Table.Head>
            <Table.Head className="w-[100px] pl-6">ID</Table.Head>
            <Table.Head>이름</Table.Head>
            <Table.Head className="text-right">총 구매 횟수</Table.Head>
            <Table.Head className="text-right">총 구매 금액</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customers.map((customer, index) => (
            <Table.Row key={customer.id}>
              <Table.Cell className="font-medium border-r border-gray-200 text-center text-gray-500">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-500 pl-6">{customer.id}</Table.Cell>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell className="text-right">{customer.count}회</Table.Cell>
              <Table.Cell className="text-right">{customer.totalAmount.toLocaleString()}원</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
