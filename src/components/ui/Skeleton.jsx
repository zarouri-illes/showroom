/* eslint-disable react/prop-types */
import { cn } from '../../lib/utils'

// Pulsing placeholder block, used for loading skeletons.
const Skeleton = ({ className }) => (
  <div className={cn('animate-pulse rounded-lg bg-white/10', className)} />
)

export default Skeleton
