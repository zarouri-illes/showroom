import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Gauge, Rocket, Timer, Armchair, Fuel, Settings2, Milestone, Cog, Palette } from 'lucide-react'
import { CARS, getCarById, formatPrice } from '../data/cars'
import CarCard from '../components/CarCard'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import SlideTextButton from '../components/kokonutui/SlideTextButton'
import SplitText from '../components/reactbits/SplitText'
import SmartImage from '../components/ui/SmartImage'
import { revealStagger } from '../animations/gsap'
import { cn } from '../lib/utils'

const SPEC_LABELS = [
  { key: 'hp', label: 'Puissance', Icon: Gauge },
  { key: 'acceleration', label: '0 à 100 km/h', Icon: Rocket },
  { key: 'topSpeed', label: 'Vitesse max', Icon: Timer },
  { key: 'mileage', label: 'Kilométrage', Icon: Milestone },
  { key: 'seats', label: 'Places', Icon: Armchair },
  { key: 'engine', label: 'Moteur', Icon: Cog },
  { key: 'fuel', label: 'Carburant', Icon: Fuel },
  { key: 'transmission', label: 'Transmission', Icon: Settings2 },
  { key: 'color', label: 'Couleur', Icon: Palette },
]

const getSpecValue = (car, key) => {
  if (key === 'mileage') return car.mileage ? `${car.mileage.toLocaleString('fr-FR')} km` : 'Neuf'
  return car.specs[key] ?? car[key]
}

const CarDetailPage = () => {
  const { id } = useParams()
  const car = getCarById(id)
  const sectionRef = useRef(null)
  const [activeImg, setActiveImg] = useState(0)
  const [prevId, setPrevId] = useState(id)

  // Reset the active gallery image when navigating between cars.
  if (prevId !== id) {
    setPrevId(id)
    setActiveImg(0)
  }

  useEffect(() => {
    const clean = revealStagger({
      targets: '.spec-card, .detail-reveal, .cards',
      trigger: sectionRef.current,
      y: 50,
      stagger: 0.08,
      start: 'top 85%',
    })
    return clean
  }, [id])

  if (!car) return <Navigate to="/listing" replace />

  const related =
    CARS.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3).length >= 3
      ? CARS.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3)
      : CARS.filter((c) => c.id !== car.id).slice(0, 3)

  const gallery = car.gallery?.length ? car.gallery : [car.image]

  return (
    <div ref={sectionRef} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      {/* Breadcrumb */}
      <Link
        to="/listing"
        className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-accent"
      >
        ← Retour à l&apos;inventaire
      </Link>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="detail-reveal">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
            <SmartImage
              src={gallery[activeImg]}
              alt={`${car.brand} ${car.model}`}
              className="h-72 w-full rounded-xl sm:h-96"
              imgClassName="object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    'h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-all duration-300',
                    i === activeImg
                      ? 'border-accent ring-2 ring-accent/40'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {car.category === 'new'
                ? 'Voiture neuve'
                : car.category === 'stock'
                  ? 'En stock'
                  : "Voiture d'occasion"}
            </span>
            {car.badge && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black">
                {car.badge}
              </span>
            )}
          </div>
          <SplitText
            tag="h1"
            text={`${car.name}`}
            splitType="words"
            delay={40}
            duration={0.7}
            textAlign="left"
            className="title text-3xl text-white sm:text-5xl"
          />
          <p className="mt-3 text-white/60">
            {car.year} · {car.location} · {car.fuel} · {car.transmission}
          </p>

          <div className="mt-6 flex items-end gap-4">
            <p className="text-4xl font-bold text-accent">{formatPrice(car.price)}</p>
            {car.oldPrice > car.price && (
              <p className="mb-1 text-lg text-white/40 line-through">{formatPrice(car.oldPrice)}</p>
            )}
          </div>

          <SplitText
            tag="p"
            text={car.description}
            splitType="words"
            delay={25}
            duration={0.7}
            from={{ opacity: 0, y: 16 }}
            textAlign="left"
            className="mt-6 leading-relaxed text-white/70"
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SlideTextButton
              text="Nous contacter"
              hoverText="Réserver un essai →"
              to="/contact"
              className="bg-accent text-black hover:bg-accent-hover"
            />
            <a
              href={`mailto:contact@dealership.fr?subject=Demande pour ${car.name}`}
              className="btn-glow rounded-lg border border-white/10 px-6 py-2.5 text-sm text-white/80 hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              Poser une question
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Récapitulatif</p>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <p className="text-white/50">
                Kilométrage : <span className="text-white/90">{car.mileage ? `${car.mileage.toLocaleString('fr-FR')} km` : 'Neuf'}</span>
              </p>
              <p className="text-white/50">
                Année : <span className="text-white/90">{car.year}</span>
              </p>
              <p className="text-white/50">
                Marque : <span className="text-white/90">{car.brand}</span>
              </p>
              <p className="text-white/50">
                Modèle : <span className="text-white/90">{car.model}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="mt-16">
        <SplitText
          tag="h2"
          text="Caractéristiques"
          splitType="words"
          delay={40}
          duration={0.7}
          textAlign="left"
          className="title text-2xl text-white sm:text-4xl"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SPEC_LABELS.map(({ key, label, Icon }) => (
            <SpotlightCard key={key} className="spec-card relative min-h-[110px] justify-center overflow-hidden" accent="#60a5fa">
              <Icon
                size={56}
                strokeWidth={1.25}
                className="pointer-events-none absolute -right-3 -top-3 text-white opacity-10"
              />
              <p className="relative text-xs uppercase tracking-widest text-white/40">{label}</p>
              <p className="relative mt-2 text-xl font-semibold text-white">{getSpecValue(car, key)}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Related */}
      <div className="mt-20">
        <SplitText
          tag="h2"
          text="Vous aimerez aussi"
          splitType="words"
          delay={40}
          duration={0.7}
          textAlign="left"
          className="title text-2xl text-white sm:text-4xl"
        />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarDetailPage
