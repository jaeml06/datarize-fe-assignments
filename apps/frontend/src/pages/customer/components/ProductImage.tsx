import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductImageProps {
  src: string
  alt: string
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-gray-100">
          <div className="animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  )
}
