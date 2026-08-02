import { useEffect, useRef } from 'react'
import { Car, RefreshCcw, ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initButtonEffects } from '../animations/microInteractions'

const SERVICES = [
  {
    icon: Car,
    title: 'Location de voiture',
    text: 'Une flotte récente, disponible à la journée, à la semaine ou au mois. Assurance incluse, kilométrage flexible et livraison à votre adresse.',
  },
  {
    icon: RefreshCcw,
    title: 'Échange & Vente',
    text: 'Vendez votre voiture au meilleur prix ou échangez-la contre un autre véhicule. Estimation gratuite, offre ferme et paiement rapide.',
  },
]

const ServicesSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanReveal = revealStagger({
      targets: '.services-left, .services-right',
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
    <section ref={sectionRef} id="services" className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy */}
        <div className="services-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <DecryptedText text="03 — Nos services" animateOn="view" speed={40} />
          </p>
          <SplitText
            tag="h2"
            text="Location & échange pour votre véhicule"
            splitType="words"
            delay={40}
            duration={0.7}
            textAlign="left"
            className="title text-3xl text-white sm:text-5xl"
          />
          <p className="my-8 max-w-lg text-white/60">
            Louez le véhicule qui vous convient ou échangez/vendez votre voiture en toute
            simplicité. Deux services, une seule exigence :
            la qualité.
          </p>

          <div className="mb-10 space-y-5">
            {SERVICES.map((service) => (
              <div key={service.title} className="group flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <service.icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{service.title}</h3>
                  <p className="mt-1 text-sm text-white/50">{service.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/services"
              className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black hover:bg-accent-hover"
            >
              <ArrowRight size={15} /> Découvrir nos services
            </Link>
          </div>
        </div>

        {/* Right: visual */}
        <div className="services-right relative">
          <div className="grid gap-5 sm:grid-cols-2">
            <SpotlightCard className="h-full" accent="#e11d2e">
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30">
                  <Car size={30} />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Location</p>
                <p className="mt-2 text-sm font-semibold text-white">Journée · Semaine · Mois</p>
              </div>
            </SpotlightCard>
            <SpotlightCard className="h-full" accent="#e11d2e">
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30">
                  <RefreshCcw size={30} />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Échange & vente</p>
                <p className="mt-2 text-sm font-semibold text-white">Reprise · Cash · Formalités</p>
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

export default ServicesSection
