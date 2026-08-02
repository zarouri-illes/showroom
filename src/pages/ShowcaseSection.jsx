import { useEffect, useRef } from 'react'
import twoCars from '../assets/2cars.png'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import SlideTextButton from '../components/kokonutui/SlideTextButton'
import SmartImage from '../components/ui/SmartImage'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initButtonEffects } from '../animations/microInteractions'

const HIGHLIGHTS = [
  'Assurance et assistance incluses',
  'Livraison à votre adresse',
  'Prix transparents, sans surprise',
]

const ShowcaseSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanReveal = revealStagger({
      targets: '.showcase-copy, .showcase-visual',
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
    <section ref={sectionRef} id="showcase" className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 lg:p-14">
        {/* Soft glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Copy */}
          <div className="showcase-copy">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              <DecryptedText text="04 — La location chez gts auto" animateOn="view" speed={40} />
            </p>
            <SplitText
              tag="h2"
              text="Louez en toute sérénité"
              splitType="words"
              delay={40}
              duration={0.7}
              textAlign="left"
              className="title text-3xl text-white sm:text-5xl"
            />
            <p className="my-8 max-w-lg text-white/60">
              Découvrez notre flotte de véhicules récents et entretenus, disponibles
              à la journée, à la semaine ou au mois. Une location simple, flexible
              et adaptée à vos besoins.
            </p>

            <ul className="mb-10 space-y-4">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                      <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>

            <SlideTextButton
              text="Voir la flotte"
              hoverText="Parcourir →"
              to="/listing"
              className="bg-accent text-black hover:bg-accent-hover"
            />
          </div>

          {/* Visual */}
          <div className="showcase-visual">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
              <SmartImage
                src={twoCars}
                alt="Deux voitures de location gts auto"
                className="h-auto w-full rounded-xl"
                imgClassName="object-contain"
              />
              <div className="absolute bottom-6 left-6 rounded-xl border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md">
                <p className="text-sm font-semibold text-white">Prêt à prendre la route ?</p>
                <p className="text-xs text-white/60">Réservez dès aujourd&apos;hui</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection
