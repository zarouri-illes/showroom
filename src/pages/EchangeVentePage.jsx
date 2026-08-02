import { useEffect, useRef, useState } from 'react'
import { RefreshCcw, Banknote, ClipboardList, Phone, ArrowRight, Check, BadgeCheck, FileCheck, Handshake, Car, Milestone, CalendarDays, Fuel, Settings2, Cog, Palette, Armchair } from 'lucide-react'
import BackButton from '../components/BackButton'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import Spinner from '../components/ui/Spinner'
import { useAdmin } from '../context/AdminContext'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initInputFocus, initButtonEffects } from '../animations/microInteractions'

const CAR_BRANDS = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Porsche', 'Toyota', 'Nissan',
  'Hyundai', 'Kia', 'Peugeot', 'Renault', 'Citroën', 'Land Rover', 'Range Rover',
  'Jeep', 'GMC', 'Chevrolet', 'Ford', 'Fiat', 'Opel', 'Dacia', 'Seat', 'Skoda',
  'Honda', 'Mazda', 'Suzuki', 'Mitsubishi', 'Lexus', 'Jetour', 'Chery', 'MG',
]

const FUEL_OPTIONS = ['Essence', 'Diesel', 'Hybride', 'Électrique', 'GPL']
const TRANSMISSION_OPTIONS = ['Automatique', 'Manuelle', 'Semi-automatique']
const CATEGORY_OPTIONS = ["D'occasion", 'Neuve', 'Importée']

const STEPS = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Envoyez votre dossier',
    text: 'Remplissez le formulaire avec les informations de votre véhicule et vos coordonnées. Quelques minutes suffisent.',
  },
  {
    number: '02',
    icon: BadgeCheck,
    title: 'Expertise & estimation',
    text: 'Nos experts examinent votre véhicule (état, kilométrage, entretien) et vous font une offre personnalisée.',
  },
  {
    number: '03',
    icon: Handshake,
    title: 'Reprenez ou vendez',
    text: 'Validez l\'offre : nous récupérons votre voiture et vous remettons son prix, ou nous la déduisons de votre prochain achat.',
  },
]

const EchangeVentePage = () => {
  const sectionRef = useRef(null)
  const { addRequest } = useAdmin()
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    addRequest({ ...data, service: 'echange' })
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
      e.target.reset()
    }, 1200)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanHeader = revealStagger({
      targets: '.echange-header',
      trigger: sectionRef.current,
      y: 40,
      stagger: 0.1,
      start: 'top 85%',
    })

    const cleanSteps = revealStagger({
      targets: '.echange-step',
      trigger: sectionRef.current,
      y: 50,
      stagger: 0.08,
      start: 'top 85%',
    })

    const cleanForm = revealStagger({
      targets: '.echange-form',
      trigger: sectionRef.current,
      y: 50,
      stagger: 0.08,
      start: 'top 85%',
    })

    const cleanInputs = initInputFocus(sectionRef.current)
    const cleanBtns = initButtonEffects(sectionRef.current)

    return () => {
      cleanHeader()
      cleanSteps()
      cleanForm()
      cleanInputs()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  const inputBase = "input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 [&>option]:bg-zinc-900"

  return (
    <section ref={sectionRef} id="echange-vente-page" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <BackButton />

      {/* Header */}
      <div className="echange-header mb-16 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <DecryptedText text="Échange & vente" animateOn="view" speed={40} />
        </p>
        <SplitText
          tag="h1"
          text="Vendez ou échangez votre voiture"
          splitType="words"
          delay={40}
          duration={0.7}
          textAlign="left"
          className="title text-3xl text-white sm:text-5xl"
        />
        <p className="mt-6 text-white/60">
          Reprenez une voiture en parfait état contre du cash immédiat, ou échangez-la
          contre le modèle de vos rêves. Estimation rapide, offre ferme et formalités prises en charge.
        </p>
      </div>

      {/* Process steps */}
      <div className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/30">
            <RefreshCcw size={16} />
          </div>
          <h2 className="text-xl font-bold text-white">Comment ça marche ?</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((step) => (
            <SpotlightCard key={step.number} className="echange-step" accent="#e11d2e">
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

      {/* Form + side info */}
      <div className="echange-form grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-2xl border border-accent/25 bg-accent/[0.04] p-6">
            <h3 className="text-lg font-bold text-white">Pourquoi nous confier votre voiture ?</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <FileCheck size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                Estimation gratuite et sans engagement
              </li>
              <li className="flex items-start gap-3">
                <Banknote size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                Paiement immédiat à la signature
              </li>
              <li className="flex items-start gap-3">
                <Handshake size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                Toutes les formalités administratives prises en charge
              </li>
              <li className="flex items-start gap-3">
                <Car size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                Bonus avantageux si vous reprenez un véhicule chez nous
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-lg font-bold text-white">Une question ?</h3>
            <p className="mt-3 text-white/60">
              Appelez-nous ou passez au showroom : nos experts estiment votre véhicule sur place.
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
          id="echange-form"
          className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-3"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="text-xl font-bold text-white">Proposez votre véhicule</h3>
            <p className="mt-2 text-sm text-white/50">
              Remplissez le formulaire avec un maximum d&apos;informations : plus votre dossier est complet,
              plus l&apos;estimation est rapide et précise.
            </p>
          </div>

          {/* Contact */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Nom complet *
              <input type="text" name="nom" required placeholder="Jean Dupont" className={inputBase} />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Téléphone *
              <input type="tel" name="telephone" required placeholder="05 42 13 06 23" className={inputBase} />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Email
              <input type="email" name="email" placeholder="jean@exemple.fr" className={inputBase} />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Ville
              <input type="text" name="ville" placeholder="Bouira" className={inputBase} />
            </label>
          </div>

          {/* Véhicule */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              <Car size={13} /> Votre véhicule
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Marque *
                <select name="brand" required defaultValue="" className={inputBase}>
                  <option value="" disabled>Sélectionner…</option>
                  {CAR_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Modèle *
                <input type="text" name="model" required placeholder="Ex: A6" className={inputBase} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><CalendarDays size={13} /> Année *</span>
                <input type="number" name="year" required placeholder="Ex: 2020" min="1960" max="2030" className={inputBase} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Milestone size={13} /> Kilométrage *</span>
                <input type="number" name="mileage" required placeholder="Ex: 85000" className={inputBase} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Fuel size={13} /> Carburant</span>
                <select name="fuel" defaultValue="" className={inputBase}>
                  <option value="" disabled>Sélectionner…</option>
                  {FUEL_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Settings2 size={13} /> Transmission</span>
                <select name="transmission" defaultValue="" className={inputBase}>
                  <option value="" disabled>Sélectionner…</option>
                  {TRANSMISSION_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Cog size={13} /> Moteur</span>
                <input type="text" name="engine" placeholder="Ex: 2.0 TDI, 150 ch" className={inputBase} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Palette size={13} /> Couleur</span>
                <input type="text" name="color" placeholder="Ex: Gris Nardo" className={inputBase} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Armchair size={13} /> Places</span>
                <input type="number" name="seats" placeholder="Ex: 5" min="1" max="9" className={inputBase} />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                État / catégorie
                <select name="category" defaultValue="" className={inputBase}>
                  <option value="" disabled>Sélectionner…</option>
                  {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
          </div>

          {/* Échange */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              <Handshake size={13} /> Votre demande
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Type de demande
                <select name="demandeType" defaultValue="vente" className={inputBase}>
                  <option value="vente">Vendre ma voiture</option>
                  <option value="echange">Échanger contre un autre véhicule</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Prix souhaité (DA)
                <input type="number" name="prixSouhaite" placeholder="Ex: 4500000" className={inputBase} />
              </label>
            </div>
          </div>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            Message / description de l&apos;état du véhicule
            <textarea
              name="message"
              rows={4}
              placeholder="Décrivez l'état général : carrosserie, intérieur, historique d'entretien, éventuels défauts…"
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
              Merci ! Votre dossier a bien été envoyé. Nos experts vous recontacteront très vite avec une estimation.
            </p>
          )}
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="echange-form mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-10 lg:flex-row lg:text-left">
        <div>
          <h3 className="text-2xl font-bold text-white">Besoin d&apos;un conseil avant de vendre ?</h3>
          <p className="mt-2 text-white/60">
            Passez au showroom avec votre véhicule : estimation sur place, sans rendez-vous.
          </p>
        </div>
        <a
          href="/contact"
          className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-accent-hover"
        >
          Nous contacter <ArrowRight size={16} />
        </a>
      </div>
    </section>
  )
}

export default EchangeVentePage
