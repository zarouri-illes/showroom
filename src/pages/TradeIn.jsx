import { useEffect, useRef } from 'react'
import { RefreshCw, Car, HandCoins, ShieldCheck, ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import { gsap, prefersReducedMotion } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initButtonEffects } from '../animations/microInteractions'

const FEATURES = [
  {
    icon: HandCoins,
    title: 'Rachat immédiat',
    text: 'Nous rachetons votre véhicule au meilleur prix, avec un paiement comptant et sans frais cachés.',
  },
  {
    icon: RefreshCw,
    title: 'Échange facilité',
    text: 'Repartez avec le véhicule de vos rêves en déduisant la valeur de votre ancienne voiture.',
  },
  {
    icon: ShieldCheck,
    title: 'Estimation gratuite',
    text: 'Une estimation honnête en quelques minutes, directement dans notre showroom.',
  },
]

const TradeIn = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanReveal = revealStagger({
      targets: '.tradein-left, .tradein-right',
      trigger: sectionRef.current,
      y: 60,
      stagger: 0.15,
      start: 'top 80%',
    })

    const cleanArrows = prefersReducedMotion()
      ? () => {}
      : (() => {
          const tween = gsap.to('.tradein-arrows', {
            rotate: 360,
            duration: 14,
            ease: 'none',
            repeat: -1,
          })
          return () => tween.kill()
        })()

    const cleanFloat = prefersReducedMotion()
      ? () => {}
      : (() => {
          const tween = gsap.to('.tradein-float', {
            y: -12,
            duration: 2.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
          return () => tween.kill()
        })()

    const cleanBtns = initButtonEffects(sectionRef.current)

    return () => {
      cleanReveal()
      cleanArrows()
      cleanFloat()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="tradein" className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy */}
        <div className="tradein-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <DecryptedText text="03 — Troc & Rachat" animateOn="view" speed={40} />
          </p>
          <SplitText
            tag="h2"
            text="Vendez ou échangez votre voiture chez nous"
            splitType="words"
            delay={40}
            duration={0.7}
            textAlign="left"
            className="title text-3xl text-white sm:text-5xl"
          />
          <p className="my-8 max-w-lg text-white/60">
            Vous avez un véhicule à vendre ou envie d&apos;en changer ? Notre showroom
            rachète votre voiture et l&apos;accepte en échange d&apos;un nouveau modèle.
            Un processus simple, transparent et rapide.
          </p>

          <div className="mb-10 space-y-5">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="group flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <feature.icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm text-white/50">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/operations"
              className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black hover:bg-accent-hover"
            >
              <RefreshCw size={15} /> Échanger ma voiture
            </Link>
            <Link
              to="/operations"
              className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              <HandCoins size={15} /> Vendre ma voiture
            </Link>
          </div>
        </div>

        {/* Right: swap visual */}
        <div className="tradein-right relative">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Old car */}
            <div className="w-full max-w-[230px]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-md transition-colors duration-300 hover:border-white/25">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/70">
                  <Car size={30} />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Votre voiture</p>
                <p className="mt-2 text-sm font-semibold text-white">On vous la rachète</p>
              </div>
            </div>

            {/* Rotating arrows */}
            <div className="relative flex flex-shrink-0 items-center justify-center">
              <div className="tradein-arrows flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent shadow-[0_0_30px_-8px_rgba(59,130,246,0.4)]">
                <RefreshCw size={26} />
              </div>
              <span className="tradein-float absolute -bottom-9 whitespace-nowrap rounded-full border border-accent/40 bg-accent px-3 py-1.5 text-xs font-bold text-black shadow-[0_8px_24px_-6px_rgba(59,130,246,0.5)]">
                Paiement immédiat
              </span>
            </div>

            {/* New car */}
            <div className="w-full max-w-[230px]">
              <div className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center backdrop-blur-md transition-colors duration-300 hover:border-accent/60 hover:bg-accent/10">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-black">
                  <Car size={30} />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Nouveau modèle</p>
                <p className="mt-2 text-sm font-semibold text-white">Repartez au volant</p>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md sm:p-6">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-9 w-9 flex-shrink-0 text-accent" />
              <div>
                <p className="font-semibold text-white">Estimation juste et sans engagement</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-white/50">
                  Devis en 24h
                  <ArrowRight size={12} className="text-accent" />
                  Aucun achat obligatoire
                  <ArrowRight size={12} className="text-accent" />
                  Reprise garantie
                </p>
              </div>
            </div>
          </div>

          <a href="tel:0540099959" className="btn-anime btn-glow mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 hover:border-white/30 hover:bg-white/5 hover:text-white">
            <Phone size={16} /> 05 40 09 99 59
          </a>
        </div>
      </div>
    </section>
  )
}

export default TradeIn
