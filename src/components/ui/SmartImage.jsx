/* eslint-disable react/prop-types */
import { useState } from 'react'
import { cn } from '../../lib/utils'

// Image that shows a pulsing skeleton until the source has loaded.
const SmartImage = ({ src, alt, className, imgClassName, skeletonClassName }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!loaded && (
        <div
          className={cn(
            'absolute inset-0 animate-pulse rounded-lg bg-white/10',
            skeletonClassName
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName
        )}
      />
    </div>
  )
}

export default SmartImage
