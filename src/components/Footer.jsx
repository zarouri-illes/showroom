import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initButtonEffects } from '../animations/microInteractions'
import { XIcon, FacebookIcon } from './SocialIcons'
const MENU_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Offres', to: '/#offers' },
  { label: 'Inventaire', to: '/#inventory' },
  { label: 'Échange / Vente', to: '/echange-vente' },
  { label: 'Contact', to: '/contact' },
]

const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, footerRef)

    const cleanReveal = revealStagger({
      targets: '.footer-col',
      trigger: footerRef.current,
      y: 40,
      stagger: 0.08,
      start: 'top 92%',
    })

    const cleanBtns = initButtonEffects(footerRef.current)

    return () => {
      cleanReveal()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-white/10 bg-white/[0.02]"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="footer-col">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="logo text-2xl font-extrabold tracking-wider text-white">
              fr<span className="text-accent">_auto</span>
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-white/60">
            <li>Réservez votre consultation gratuite !</li>
            <li>05 42 13 06 23</li>
            <li>0559 83 85 75</li>
            <li>En face AB park, Bouira, Algérie</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="mb-4 text-lg font-semibold text-white">Menu</h3>
          <ul className="space-y-2 text-sm text-white/60">
            {MENU_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6">
        <p>Copyright @ gts auto. Tous droits réservés.</p>
        <div className="flex gap-3">
          <a href="#" aria-label="X" className="btn-glow flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-black">
            <XIcon />
          </a>
          <a href="#" aria-label="Facebook" className="btn-glow flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-black">
            <FacebookIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
