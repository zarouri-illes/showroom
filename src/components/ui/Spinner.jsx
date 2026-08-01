/* eslint-disable react/prop-types */
import { cn } from '../../lib/utils'

// Accent-colored circular spinner (rotating ring).
const Spinner = ({ size = 24, className }) => (
  <span
    role="status"
    aria-label="Chargement"
    className={cn(
      'inline-block shrink-0 animate-spin rounded-full border-2 border-white/20 border-t-accent',
      className
    )}
    style={{ width: size, height: size }}
  />
)

export default Spinner
