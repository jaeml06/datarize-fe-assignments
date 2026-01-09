import { FallbackProps } from 'react-error-boundary'

export function ChartError({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="h-[400px] w-full flex flex-col items-center justify-center bg-red-50 rounded-lg p-6 text-red-600 border border-red-200">
      <p className="font-medium mb-2">데이터를 불러오는 중 오류가 발생했습니다.</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-white border border-red-300 rounded hover:bg-red-50 transition-colors text-sm"
      >
        다시 시도
      </button>
    </div>
  )
}
