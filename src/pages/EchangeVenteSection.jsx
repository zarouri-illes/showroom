import { useEffect, useRef } from 'react'
import { RefreshCcw, Banknote, FileCheck, Handshake, ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initButtonEffects } from '../animations/microInteractions'

const BENEFITS = [
  {
    icon: Banknote,
    title: 'Paiement immédiat',
    text: 'Recevez le prix de votre voiture dès la signature, sans attendre.',
  },
  {
    icon: FileCheck,
    title: 'Formalités prises en charge',
    text: 'Nous gérons toute l\u2019administration : carte grise, changement de propriétaire…',
  },
  {
    icon: Handshake,
    title: 'Bonus à la reprise',
    text: 'Échangez votre voiture contre un véhicule de notre stock et profitez d\u2019un avantage.',
  },
]

const EchangeVenteSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanReveal = revealStagger({
      targets: '.echange-left, .echange-right',
      trigger: sectionRef.current,
      y: 60,
      stagger: 0.15,
      start: 'top 80%',
    })

    const cleanBtns = initButtonEffects(sectionRef.current)

    return () => {
      cleanReveal()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="echange-vente" className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy */}
        <div className="echange-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <DecryptedText text="Échange & vente" animateOn="view" speed={40} />
          </p>
          <SplitText
            tag="h2"
            text="Vendez ou échangez votre voiture en toute simplicité"
            splitType="words"
            delay={40}
            duration={0.7}
            textAlign="left"
            className="title text-3xl text-white sm:text-5xl"
          />
          <p className="my-8 max-w-lg text-white/60">
            Estimation gratuite et sans engagement, offre ferme et paiement rapide.
            Échangez votre ancien véhicule contre celui de vos rêves, ou repartez avec
            le cash : c&apos;est vous qui choisissez.
          </p>

          <div className="mb-10 space-y-5">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="group flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <benefit.icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-white/50">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/echange-vente"
              className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black hover:bg-accent-hover"
            >
              <ArrowRight size={15} /> Estimer ma voiture
            </Link>
          </div>
        </div>

        {/* Right: visual */}
        <div className="echange-right relative">
          <div className="grid gap-5 sm:grid-cols-2">
            <SpotlightCard className="h-full" accent="#e11d2e">
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30">
                  <Banknote size={30} />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Vente</p>
                <p className="mt-2 text-sm font-semibold text-white">Cash immédiat · Meilleure offre</p>
              </div>
            </SpotlightCard>
            <SpotlightCard className="h-full" accent="#e11d2e">
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30">
                  <RefreshCcw size={30} />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Échange</p>
                <p className="mt-2 text-sm font-semibold text-white">Reprise · Bonus · Facilités</p>
              </div>
            </SpotlightCard>
          </div>

          <a href="tel:0542130623" className="btn-anime btn-glow mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 hover:border-white/30 hover:bg-white/5 hover:text-white">
            <Phone size={16} /> 05 42 13 06 23
          </a>
        </div>
      </div>
    </section>
  )
}

export default EchangeVenteSection
