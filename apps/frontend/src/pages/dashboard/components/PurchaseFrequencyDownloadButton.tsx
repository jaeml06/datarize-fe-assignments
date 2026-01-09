import { ISODate } from '@/types'
import { downloadCSV } from '@/lib/file'
import Button from '@/shared/components/Button'
import { usePurchaseFrequencyDownload } from '@/pages/dashboard/hooks/purchaseFrequency'

interface PurchaseFrequencyDownloadButtonProps {
  from?: ISODate | null
  to?: ISODate | null
}

export default function PurchaseFrequencyDownloadButton({ from, to }: PurchaseFrequencyDownloadButtonProps) {
  const { fetchPurchaseFrequency, isDownloading } = usePurchaseFrequencyDownload()

  const handleDownload = async () => {
    try {
      const data = await fetchPurchaseFrequency({ from, to })

      // 데이터 변환이 필요한 경우 여기서 처리합니다.
      // 현재 data는 { range: string, count: number }[] 형태이므로 바로 사용 가능합니다.
      downloadCSV(data, `purchase_frequency_${from || 'start'}_${to || 'end'}`)
    } catch (error) {
      console.error('Failed to download CSV', error)
      alert('다운로드 중 오류가 발생했습니다.')
    }
  }

  return (
    <Button variant="outline" onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? '다운로드 중...' : 'CSV 다운로드'}
    </Button>
  )
}
