import { useEffect, useRef, useState } from 'react'
import { Car, RefreshCcw, Phone, ArrowRight, Check, CalendarCheck, KeyRound, BadgeCheck, Sparkles } from 'lucide-react'
import BackButton from '../components/BackButton'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import Magnet from '../components/reactbits/Magnet'
import Spinner from '../components/ui/Spinner'
import { useAdmin } from '../context/AdminContext'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initInputFocus, initButtonEffects } from '../animations/microInteractions'

const SERVICES = [
  {
    id: 'location',
    icon: Car,
    title: 'Location de voiture',
    tagline: 'Louez le véhicule qu\'il vous faut, quand il vous faut.',
    description: 'Une flotte de véhicules récents et bien entretenus, disponibles à la journée, à la semaine ou au mois. Location simple, assurance incluse et kilométrage adapté à vos besoins.',
    features: [
      'Journée, semaine ou mois',
      'Assurance et assistance incluses',
      'Livraison au showroom ou à votre adresse',
      'Véhicules récents et révisés',
    ],
  },
  {
    id: 'echange',
    icon: RefreshCcw,
    title: 'Échange & Vente',
    tagline: 'Vendez ou échangez votre voiture au meilleur prix.',
    description: 'Estimation gratuite et sans engagement, offre ferme et paiement rapide. Échangez votre ancien véhicule contre celui de vos rêves ou repartez avec le cash.',
    features: [
      'Estimation gratuite et sans engagement',
      'Paiement immédiat à la signature',
      'Toutes les formalités administratives prises en charge',
      'Bonus avantageux à la reprise',
    ],
  },
]

const STEPS = [
  {
    number: '01',
    icon: CalendarCheck,
    title: 'Choisissez votre service',
    text: 'Location de voiture ou échange & vente : indiquez votre besoin.',
  },
  {
    number: '02',
    icon: BadgeCheck,
    title: 'Nous vous recontactons',
    text: 'Notre équipe vous confirme la disponibilité, le tarif et vous propose un créneau.',
  },
  {
    number: '03',
    icon: KeyRound,
    title: 'On s\'occupe de tout',
    text: 'Arrivez avec votre véhicule ou repartez avec le vôtre : le reste est entre nos mains.',
  },
]

const SERVICE_TYPES = [
  { value: 'location', label: 'Location de voiture' },
  { value: 'echange', label: 'Échange & Vente' },
]

const DURATION_OPTIONS = ['1 jour', '1 semaine', '1 mois', 'Sur devis']

const ServicesPage = () => {
  const sectionRef = useRef(null)
  const { addRequest } = useAdmin()
  const [service, setService] = useState('location')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    addRequest({ ...data, service: service })
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
      e.target.reset()
    }, 1200)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanHeader = revealStagger({
      targets: '.services-header',
      trigger: sectionRef.current,
      y: 40,
      stagger: 0.1,
      start: 'top 85%',
    })

    const cleanCards = revealStagger({
      targets: '.service-card',
      trigger: sectionRef.current,
      y: 60,
      stagger: 0.12,
      start: 'top 80%',
    })

    const cleanSteps = revealStagger({
      targets: '.service-step',
      trigger: sectionRef.current,
      y: 50,
      stagger: 0.08,
      start: 'top 85%',
    })

    const cleanForm = revealStagger({
      targets: '.services-form',
      trigger: sectionRef.current,
      y: 50,
      stagger: 0.08,
      start: 'top 85%',
    })

    const cleanInputs = initInputFocus(sectionRef.current)
    const cleanBtns = initButtonEffects(sectionRef.current)

    return () => {
      cleanHeader()
      cleanCards()
      cleanSteps()
      cleanForm()
      cleanInputs()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="services-page" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <BackButton />
      {/* Header */}
      <div className="services-header mb-16 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <DecryptedText text="Nos services" animateOn="view" speed={40} />
        </p>
        <SplitText
          tag="h1"
          text="Des services pensés pour votre voiture"
          splitType="words"
          delay={40}
          duration={0.7}
          textAlign="left"
          className="title text-3xl text-white sm:text-5xl"
        />
        <p className="mt-6 text-white/60">
          Location de voiture ou échange &amp; vente : des prestations simples,
          transparentes et réalisées par des experts. Réservez en quelques clics.
        </p>
      </div>

      {/* Service cards */}
      <div className="mb-16 grid gap-6 lg:grid-cols-2">
        {SERVICES.map((s) => (
          <SpotlightCard key={s.id} className="service-card h-full" accent="#e11d2e">
            <div className="flex h-full flex-col p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30">
                  <s.icon size={26} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{s.title}</h2>
                  <p className="mt-1 text-sm text-white/50">{s.tagline}</p>
                </div>
              </div>
              <p className="text-white/60">{s.description}</p>
              <ul className="mt-6 space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setService(s.id)
                  if (s.id === 'echange') {
                    window.location.href = '/echange-vente'
                    return
                  }
                  document.getElementById('service-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-anime btn-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-accent-hover"
              >
                {s.id === 'echange' ? 'Estimer ma voiture' : 'Réserver ce service'} <ArrowRight size={15} />
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* How it works */}
      <div className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/30">
            <Sparkles size={16} />
          </div>
          <h2 className="text-xl font-bold text-white">Comment ça marche ?</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((step) => (
            <SpotlightCard key={step.number} className="service-step" accent="#e11d2e">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/30">
                  <step.icon size={18} />
                </div>
                <span className="title text-2xl text-white/15">{step.number}</span>
              </div>
              <h3 className="mt-5 font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-white/50">{step.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Booking form */}
      <div className="services-form grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-2xl border border-accent/25 bg-accent/[0.04] p-6">
            <h3 className="text-lg font-bold text-white">Besoin d&apos;un conseil ?</h3>
            <p className="mt-3 text-white/60">
              Passez au showroom ou appelez-nous : nous vous guidons vers le service
              le plus adapté à votre véhicule et à votre budget.
            </p>
            <a
              href="tel:0542130623"
              className="btn-anime btn-glow mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-accent-hover"
            >
              <Phone size={16} /> 05 42 13 06 23
            </a>
          </div>
        </div>

        <form
          id="service-form"
          className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-3"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="text-xl font-bold text-white">Demande de réservation</h3>
            <p className="mt-2 text-sm text-white/50">
              Remplissez le formulaire et nous revenons vers vous rapidement avec une
              confirmation et un devis personnalisé.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Nom complet
              <input
                type="text"
                name="nom"
                required
                placeholder="Jean Dupont"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Téléphone
              <input
                type="tel"
                name="telephone"
                required
                placeholder="05 42 13 06 23"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Email
              <input
                type="email"
                name="email"
                required
                placeholder="jean@exemple.fr"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Service
              <select
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none [&>option]:bg-zinc-900"
              >
                {SERVICE_TYPES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Durée / Prestation
              <select name="duree" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none [&>option]:bg-zinc-900">
                {DURATION_OPTIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Date souhaitée
              <input
                type="date"
                name="date"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            Message
            <textarea
              name="message"
              rows={4}
              placeholder="Précisez votre besoin : modèle souhaité, durée de location, véhicule à échanger…"
              className="input-anime w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="btn-anime btn-glow mt-1 flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-80"
          >
            {submitting ? (
              <>
                <Spinner size={18} />
                Envoi en cours…
              </>
            ) : sent ? (
              <>
                <Check size={18} />
                Demande envoyée
              </>
            ) : (
              'Envoyer ma demande'
            )}
          </button>

          {sent && (
            <p className="flex items-start gap-2 text-sm text-white/70">
              <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" />
              Merci ! Votre demande a bien été envoyée. Notre équipe vous recontactera très vite.
            </p>
          )}
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="services-form mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-10 lg:flex-row lg:text-left">
        <div>
          <h3 className="text-2xl font-bold text-white">Préférez parler à un expert ?</h3>
          <p className="mt-2 text-white/60">
            Passez au showroom avec votre véhicule : conseils sur place, sans rendez-vous.
          </p>
        </div>
        <Magnet magnetStrength={6}>
          <a
            href="/contact"
            className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            Prendre rendez-vous <ArrowRight size={16} />
          </a>
        </Magnet>
      </div>
    </section>
  )
}

export default ServicesPage
