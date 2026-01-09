import { Suspense, ReactNode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

interface AsyncBoundaryProps {
  children: ReactNode
  pendingFallback: ReactNode
  rejectedFallback: ReactNode | ((props: FallbackProps) => ReactNode)
}

export default function AsyncBoundary({ children, pendingFallback, rejectedFallback }: AsyncBoundaryProps) {
  const errorBoundaryProps =
    typeof rejectedFallback === 'function' ? { fallbackRender: rejectedFallback } : { fallback: rejectedFallback }

  return (
    <ErrorBoundary {...errorBoundaryProps}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
