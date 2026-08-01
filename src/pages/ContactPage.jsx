import { useEffect, useRef, useState } from 'react'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import SplitText from '../components/reactbits/SplitText'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initInputFocus, initButtonEffects } from '../animations/microInteractions'

const CONTACT_INFO = [
  { label: 'Adresse', value: '12, Avenue des Champs-Élysées, 75008 Paris, France' },
  { label: 'Téléphone', value: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
  { label: 'Email', value: 'contact@dealership.fr', href: 'mailto:contact@dealership.fr' },
]

const ContactPage = () => {
  const sectionRef = useRef(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanReveal = revealStagger({
      targets: '.contact-card',
      trigger: sectionRef.current,
      y: 50,
      stagger: 0.08,
      start: 'top 85%',
    })

    const cleanInputs = initInputFocus(sectionRef.current)
    const cleanBtns = initButtonEffects(sectionRef.current)

    return () => {
      cleanReveal()
      cleanInputs()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="contact-page" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Contactez-nous
        </p>
        <SplitText
          tag="h1"
          text="Parlons de votre prochaine voiture"
          splitType="words"
          delay={40}
          duration={0.7}
          textAlign="left"
          className="title text-3xl text-white sm:text-5xl"
        />
        <p className="mt-6 text-white/60">
          Notre équipe vous répond sous 24 heures. Visitez notre showroom, appelez-nous
          ou envoyez-nous un message — nous serons ravis de vous accompagner.
        </p>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Info + map */}
        <div className="flex flex-col gap-5">
          <div className="contact-card grid gap-4 sm:grid-cols-1">
            {CONTACT_INFO.map((item) => (
              <SpotlightCard key={item.label} className="contact-card" accent="#ffd60a">
                <p className="text-xs uppercase tracking-widest text-white/40">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="mt-2 text-lg font-semibold text-white transition-colors hover:text-accent">
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                )}
              </SpotlightCard>
            ))}
          </div>

          <div className="contact-card overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
            <iframe
              title="Localisation du showroom"
              src="https://www.google.com/maps?q=12%20Avenue%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris%2C%20France&output=embed"
              className="h-[40vh] w-full rounded-xl"
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) hue-rotate(180deg)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Form */}
        <form
          className="contact-card flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Nom complet
              <input
                type="text"
                required
                placeholder="Jean Dupont"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Email
              <input
                type="email"
                required
                placeholder="jean@exemple.fr"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            Sujet
            <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none [&>option]:bg-zinc-900">
              <option>Demande d&apos;information</option>
              <option>Essai routier</option>
              <option>Financement</option>
              <option>Vente de mon véhicule</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            Message
            <textarea
              rows={5}
              required
              placeholder="Bonjour, je suis intéressé par..."
              className="input-anime w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
            />
          </label>

          <button
            type="submit"
            className="btn-anime mt-2 rounded-xl bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-white"
          >
            {sent ? 'Message envoyé ✓' : 'Envoyer le message'}
          </button>
          {sent && (
            <p className="text-sm text-white/70">
              Merci ! Votre message a bien été envoyé. Nous vous répondrons très vite.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default ContactPage
