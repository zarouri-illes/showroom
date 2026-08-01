import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

// Renders a "go back" pill that navigates to the previous history entry,
// falling back to the homepage when there is no history.
const BackButton = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Retour"
      className="btn-glow mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
    >
      <ArrowLeft size={15} />
      Retour
    </button>
  )
}

export default BackButton
