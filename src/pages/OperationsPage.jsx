import { useEffect, useRef, useState } from 'react'
import {
  RefreshCw,
  Car,
  Wallet,
  BadgeCheck,
  HandCoins,
  FileText,
  CalendarCheck,
  Banknote,
  Phone,
  ArrowRight,
  Upload,
  X,
  Check,
  ShieldCheck,
} from 'lucide-react'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import Magnet from '../components/reactbits/Magnet'
import Spinner from '../components/ui/Spinner'
import { useAdmin } from '../context/AdminContext'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initInputFocus, initButtonEffects } from '../animations/microInteractions'
import { cn } from '../lib/utils'

const MAX_PHOTOS = 8
const MAX_IMG_SIZE = 1280
const IMG_QUALITY = 0.7

const fileToDataUrl = (file, maxSize = MAX_IMG_SIZE, quality = IMG_QUALITY) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = () => reject(new Error('Image invalide'))
      img.src = reader.result
    }
    reader.onerror = () => reject(new Error('Lecture impossible'))
    reader.readAsDataURL(file)
  })

const EXCHANGE_STEPS = [
  {
    number: '01',
    icon: BadgeCheck,
    title: 'Estimation de votre véhicule',
    text: "Déposez votre voiture dans notre showroom et repartez avec une estimation juste, réalisée par nos experts en quelques minutes.",
  },
  {
    number: '02',
    icon: Car,
    title: 'Choix de votre nouveau modèle',
    text: "Parcourez notre stock et sélectionnez le véhicule qui vous fait envie, neuf ou d'occasion, selon votre budget.",
  },
  {
    number: '03',
    icon: Wallet,
    title: 'La différence est à votre charge',
    text: "Nous déduisons la valeur de votre ancienne voiture du prix du nouveau modèle. Vous ne payez que la différence.",
  },
  {
    number: '04',
    icon: RefreshCw,
    title: 'Repartez au volant',
    text: "Papiers en règle, immatriculation et livraison : vous repartez le jour même avec votre nouvelle voiture.",
  },
]

const SELL_STEPS = [
  {
    number: '01',
    icon: FileText,
    title: 'Déposez votre dossier',
    text: 'Fournissez la carte grise, le certificat de cession et le contrôle technique en cours de validité.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Visite & contrôle du véhicule',
    text: 'Nos experts inspectent votre voiture, vérifient son historique et établissent son état réel.',
  },
  {
    number: '03',
    icon: HandCoins,
    title: 'Offre ferme et immédiate',
    text: 'Nous vous faisons une proposition de rachat ferme, sans négociation et sans engagement de votre part.',
  },
  {
    number: '04',
    icon: Banknote,
    title: 'Paiement comptant',
    text: 'Acceptez l\u2019offre et repartez avec votre argent le jour même. Simple, rapide et sécurisé.',
  },
]

const BENEFITS = [
  {
    title: 'Estimation instantanée',
    text: 'Votre véhicule est évalué immédiatement, sans rendez-vous et sans engagement.',
  },
  {
    title: 'Meilleure reprise du marché',
    text: 'Des conditions compétitives, basées sur les prix réels du marché algérien.',
  },
  {
    title: 'Paiement immédiat',
    text: 'Vous êtes payé comptant dès la signature, sans attendre un acheteur.',
  },
  {
    title: 'Démarches simplifiées',
    text: 'On s\u2019occupe de tout : carte grise, cession et remise des clés.',
  },
  {
    title: 'Processus sans frais',
    text: 'Estimation, contrôle et démarches administratives sont entièrement gratuits.',
  },
]

const OPERATION_TYPES = [
  { value: 'echange', label: 'Échanger ma voiture' },
  { value: 'vente', label: 'Vendre ma voiture' },
  { value: 'les-deux', label: 'Échange + Vente' },
]

const FUEL_OPTIONS = ['Essence', 'Diesel', 'Hybride', 'Électrique']
const GEARBOX_OPTIONS = ['Manuelle', 'Automatique']
const CONDITION_OPTIONS = ['Excellent', 'Très bon', 'Bon', 'Correct', 'À restaurer']

const OperationsPage = () => {
  const sectionRef = useRef(null)
  const fileInputRef = useRef(null)
  const { addRequest } = useAdmin()
  const [operation, setOperation] = useState('echange')
  const [photos, setPhotos] = useState([])
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const addPhotos = async (e) => {
    const files = Array.from(e.target.files || [])
    const remaining = MAX_PHOTOS - photos.length
    const selected = files.slice(0, remaining)
    const converted = await Promise.all(
      selected.map(async (file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        dataUrl: await fileToDataUrl(file),
        name: file.name,
      }))
    )
    setPhotos((prev) => [...prev, ...converted])
    e.target.value = ''
  }

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    addRequest({ ...data, photos: photos.map((p) => p.dataUrl) })
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
      setPhotos([])
      e.target.reset()
    }, 1200)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanHeader = revealStagger({
      targets: '.operations-header',
      trigger: sectionRef.current,
      y: 40,
      stagger: 0.1,
      start: 'top 85%',
    })

    const cleanSteps = revealStagger({
      targets: '.operations-step',
      trigger: sectionRef.current,
      y: 60,
      stagger: 0.1,
      start: 'top 80%',
    })

    const cleanBenefits = revealStagger({
      targets: '.operations-benefit',
      trigger: sectionRef.current,
      y: 50,
      stagger: 0.08,
      start: 'top 85%',
    })

    const cleanForm = revealStagger({
      targets: '.operations-form',
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
      cleanBenefits()
      cleanForm()
      cleanInputs()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  const steps = operation === 'echange' ? EXCHANGE_STEPS : SELL_STEPS

  return (
    <section ref={sectionRef} id="operations-page" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      {/* Header */}
      <div className="operations-header mb-16 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <DecryptedText text="Échange & vente de véhicule" animateOn="view" speed={40} />
        </p>
        <SplitText
          tag="h1"
          text="Reprenez la route, à votre façon"
          splitType="words"
          delay={40}
          duration={0.7}
          textAlign="left"
          className="title text-3xl text-white sm:text-5xl"
        />
        <p className="mt-6 text-white/60">
          Changez de voiture en ne payant que la différence, ou revendez-nous votre
          véhicule comptant. Estimation gratuite, offre ferme et paiement le jour même.
        </p>
      </div>

      {/* Operation selector + steps */}
      <div className="mb-16">
        <div className="operations-form mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {OPERATION_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setOperation(type.value)}
                className={cn(
                  'btn-glow rounded-xl border px-4 py-2 text-sm',
                  operation === type.value
                    ? 'border-accent bg-accent font-semibold text-black'
                    : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-white/50">
            {operation === 'echange' && 'Je reprends un véhicule en échange'}
            {operation === 'vente' && 'Je revends mon véhicule comptant'}
            {operation === 'les-deux' && 'Je veux voir toutes les procédures'}
          </p>
        </div>

        {operation === 'les-deux' ? (
          <div className="flex flex-col gap-10">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/30">
                  <RefreshCw size={16} />
                </div>
                <h2 className="text-lg font-bold text-white">Procédure d&apos;échange</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {EXCHANGE_STEPS.map((step) => (
                  <SpotlightCard key={step.number} className="operations-step" accent="#ffd60a">
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
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/30">
                  <Banknote size={16} />
                </div>
                <h2 className="text-lg font-bold text-white">Procédure de vente</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {SELL_STEPS.map((step) => (
                  <SpotlightCard key={step.number} className="operations-step" accent="#ffd60a">
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
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <SpotlightCard key={step.number} className="operations-step" accent="#ffd60a">
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
        )}
      </div>

      {/* Form */}
      <div className="operations-form mb-16 grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
        {/* Benefits */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="operations-benefit rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-accent/30"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 flex-shrink-0 text-accent" />
                <h3 className="font-semibold text-white">{benefit.title}</h3>
              </div>
              <p className="mt-2 pl-8 text-sm text-white/50">{benefit.text}</p>
            </div>
          ))}

          <div className="operations-benefit flex flex-col justify-between gap-6 rounded-2xl border border-accent/25 bg-accent/[0.04] p-6">
            <div>
              <h3 className="text-lg font-bold text-white">Combien vaut votre voiture ?</h3>
              <p className="mt-3 text-white/60">
                Passez au showroom ou appelez-nous : estimation gratuite et offre
                de reprise immédiate.
              </p>
            </div>
            <a
              href="tel:0540099959"
              className="btn-anime btn-glow inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-white"
            >
              <Phone size={16} /> 05 40 09 99 59
            </a>
          </div>
        </div>

        {/* Client form */}
        <form
          className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-3"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="text-xl font-bold text-white">Demande de reprise</h3>
            <p className="mt-2 text-sm text-white/50">
              Remplissez le formulaire et joignez des photos de votre véhicule :
              nous revenons vers vous avec une première estimation.
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
                placeholder="05 40 09 99 59"
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
              Ville
              <input
                type="text"
                name="ville"
                placeholder="Alger"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            Type d&apos;opération
            <select name="operation" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none [&>option]:bg-zinc-900">
              <option>Je souhaite échanger mon véhicule</option>
              <option>Je souhaite vendre mon véhicule</option>
              <option>Échange + vente</option>
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Marque
              <input
                type="text"
                name="marque"
                placeholder="Audi, BMW, Renault…"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Modèle
              <input
                type="text"
                name="modele"
                placeholder="A6, Q2, Clio…"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Année
              <input
                type="number"
                name="annee"
                min={1990}
                max={2026}
                placeholder="2022"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Kilométrage (km)
              <input
                type="number"
                name="kilometrage"
                min={0}
                placeholder="85 000"
                className="input-anime w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Carburant
              <select name="carburant" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none [&>option]:bg-zinc-900">
                {FUEL_OPTIONS.map((fuel) => (
                  <option key={fuel}>{fuel}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Boîte de vitesses
              <select name="boite" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none [&>option]:bg-zinc-900">
                {GEARBOX_OPTIONS.map((gearbox) => (
                  <option key={gearbox}>{gearbox}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              État général
              <select name="etat" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none [&>option]:bg-zinc-900">
                {CONDITION_OPTIONS.map((condition) => (
                  <option key={condition}>{condition}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Photo upload */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-white/70">
              Photos du véhicule ({photos.length}/{MAX_PHOTOS})
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-anime btn-glow flex min-h-32 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-white/50 transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-white/70"
            >
              <Upload size={24} className="text-accent" />
              <span className="text-sm font-medium">
                Cliquez pour ajouter des photos (intérieur, extérieur, compteur…)
              </span>
              <span className="text-xs text-white/40">
                JPG, PNG ou WEBP — jusqu&apos;à {MAX_PHOTOS} photos
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={addPhotos}
            />
            {photos.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10">
                    <img src={photo.dataUrl} alt={photo.name} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      aria-label="Retirer la photo"
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-lg bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            Message
            <textarea
              name="message"
              rows={4}
              placeholder="Précisez l'état du véhicule, les options, votre prix souhaité…"
              className="input-anime w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="btn-anime btn-glow mt-1 flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-80"
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
              Merci ! Votre demande a bien été envoyée. Notre équipe vous recontactera
              très vite avec une première estimation.
            </p>
          )}
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="operations-form flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-10 lg:flex-row lg:text-left">
        <div>
          <h3 className="text-2xl font-bold text-white">Préférez parler à un expert ?</h3>
          <p className="mt-2 text-white/60">
            Passez au showroom avec votre véhicule : estimation sur place, sans rendez-vous.
          </p>
        </div>
        <Magnet magnetStrength={6}>
          <a
            href="/contact"
            className="btn-anime btn-glow inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-white"
          >
            Prendre rendez-vous <ArrowRight size={16} />
          </a>
        </Magnet>
      </div>
    </section>
  )
}

export default OperationsPage
