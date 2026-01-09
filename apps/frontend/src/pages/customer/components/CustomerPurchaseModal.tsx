import { ISODate } from '@/types'
import Modal from '@/shared/components/Modal'
import AsyncBoundary from '@/shared/components/AsyncBoundary'
import CustomerPurchaseHistory from './CustomerPurchaseHistory'

interface CustomerPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  customerId: number | null
  customerName?: string
  from?: ISODate | null
  to?: ISODate | null
}

export default function CustomerPurchaseModal({
  isOpen,
  onClose,
  customerId,
  customerName,
  from,
  to,
}: CustomerPurchaseModalProps) {
  if (!customerId) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${customerName ? `${customerName}님의 ` : ''}상세 구매 내역`}
      className="max-w-4xl"
    >
      <div className="p-6">
        <AsyncBoundary
          pendingFallback={<div className="h-64 flex items-center justify-center">로딩중...</div>}
          rejectedFallback={() => <div>에러가 발생했습니다.</div>}
        >
          <CustomerPurchaseHistory customerId={customerId} from={from} to={to} />
        </AsyncBoundary>
      </div>
    </Modal>
  )
}
