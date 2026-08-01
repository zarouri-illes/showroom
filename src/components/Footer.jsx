import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initInputFocus, initButtonEffects } from '../animations/microInteractions'
import DecryptedText from './reactbits/DecryptedText'
import { InstagramIcon, XIcon, FacebookIcon } from './SocialIcons'

const MENU_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Offres', to: '/#offers' },
  { label: 'Inventaire', to: '/#inventory' },
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

    const cleanInputs = initInputFocus(footerRef.current)
    const cleanBtns = initButtonEffects(footerRef.current)

    return () => {
      cleanReveal()
      cleanInputs()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-white/10 bg-white/[0.02]"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-20">
        <div className="footer-col">
          <h3 className="logo mb-4 text-2xl font-extrabold tracking-wider text-white">
            frereauto<span className="text-accent">10</span>
          </h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>Réservez votre consultation gratuite !</li>
            <li>+33 1 23 45 67 89</li>
            <li>12, Avenue des Champs-Élysées</li>
            <li>75008 Paris, France</li>
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

        <div className="footer-col">
          <h3 className="mb-4 text-lg font-semibold text-white">Liens rapides</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link to="/contact" className="transition-colors hover:text-accent">
                Réserver
              </Link>
            </li>
            <li>Politique de confidentialité</li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-accent">
                Nous contacter
              </Link>
            </li>
            <li>Mon compte</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Abonnez-vous à notre newsletter
          </h3>
          <p className="mb-4 text-sm text-white/60">
            Restez informé de l&apos;actualité, des promotions et des offres exclusives !
          </p>

          <div className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
            <input
              type="email"
              placeholder="Email"
              className="input-anime w-full flex-1 rounded-lg bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/40"
            />
            <button className="btn-anime btn-glow shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white">
              <DecryptedText text="S'abonner" animateOn="hover" speed={60} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6">
        <p>Copyright @ frereauto10. Tous droits réservés.</p>
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="btn-glow flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-black">
            <InstagramIcon />
          </a>
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
