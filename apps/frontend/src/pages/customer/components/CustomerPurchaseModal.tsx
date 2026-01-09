import { FallbackProps } from 'react-error-boundary'
import { DateRangeParams } from '@/types'
import Modal from '@/shared/components/Modal'
import AsyncBoundary from '@/shared/components/AsyncBoundary'
import DataLoadingFallback from '@/shared/components/DataLoadingFallback'
import DataErrorFallback from '@/shared/components/DataErrorFallback'
import CustomerPurchaseHistory from './CustomerPurchaseHistory'

interface CustomerPurchaseModalProps extends DateRangeParams {
  isOpen: boolean
  onClose: () => void
  customerId: number | null
  customerName?: string
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
          pendingFallback={<DataLoadingFallback height="h-64" />}
          rejectedFallback={({ resetErrorBoundary }: FallbackProps) => (
            <DataErrorFallback height="h-64" onRetry={resetErrorBoundary} />
          )}
        >
          <CustomerPurchaseHistory customerId={customerId} from={from} to={to} />
        </AsyncBoundary>
      </div>
    </Modal>
  )
}
