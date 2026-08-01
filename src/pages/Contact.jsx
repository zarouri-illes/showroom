import { useEffect, useRef } from 'react'
import { Mail, Phone } from 'lucide-react'
import SlideTextButton from '../components/kokonutui/SlideTextButton'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initButtonEffects } from '../animations/microInteractions'

const Contact = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanReveal = revealStagger({
      targets: '.contact-left, .contact-right',
      trigger: sectionRef.current,
      y: 60,
      stagger: 0.1,
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
    <section ref={sectionRef} id="contact" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <DecryptedText text="03 — Contactez-nous" animateOn="view" speed={40} />
          </p>
          <SplitText
            tag="h2"
            text="Commencez votre aventure avec nous dès aujourd'hui."
            splitType="words"
            delay={40}
            duration={0.7}
            textAlign="left"
            className="title text-3xl text-white sm:text-5xl"
          />
          <p className="contact-left my-8 max-w-lg text-white/60">
            Visitez notre showroom pour découvrir notre large sélection de
            véhicules et un service client irréprochable. Vous préférez acheter
            en ligne ? Parcourez notre inventaire, planifiez un essai routier ou
            obtenez une pré-approbation de financement sans quitter votre salon.
          </p>

          <div className="contact-left mb-10">
            <SlideTextButton
              text="Nous contacter"
              hoverText="Réserver un essai →"
              to="/contact"
              className="bg-accent text-black hover:bg-white"
            />
          </div>

          <div className="contact-left w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <p className="border-b border-white/10 pb-4 font-semibold text-white">Horaires d&apos;ouverture</p>
            <div className="flex justify-between pt-4 text-sm">
              <div>
                <p className="text-white/40">SEMAINE</p>
                <p className="mt-1 text-white">8 h 30 - 21 h 30</p>
              </div>
              <div>
                <p className="text-white/40">WEEK-END</p>
                <p className="mt-1 text-white">9 h 00 - 20 h 00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="contact-right overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
            <iframe
              title="Localisation du showroom"
              src="https://www.google.com/maps?q=12%20Avenue%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris%2C%20France&output=embed"
              className="h-[55vh] w-full rounded-xl"
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) hue-rotate(180deg)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="contact-right flex flex-wrap gap-3">
            <a href="mailto:contact@dealership.fr" className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 hover:border-white/30 hover:bg-white/5 hover:text-white">
              <Mail size={16} /> contact@dealership.fr
            </a>
            <a href="tel:+33123456789" className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 hover:border-white/30 hover:bg-white/5 hover:text-white">
              <Phone size={16} /> +33 1 23 45 67 89
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
