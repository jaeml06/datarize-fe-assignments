import { useCustomerList } from '../hooks/customerList'
import CustomerTable from './CustomerTable'

interface CustomerListResultProps {
  name?: string
  page?: number
  limit?: number
}

export default function CustomerListResult({ name, page = 1, limit = 20 }: CustomerListResultProps) {
  const { data } = useCustomerList({
    page,
    limit,
    name,
  })

  return <CustomerTable customers={data.data} />
}
