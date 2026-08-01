import { useEffect, useRef, useState } from 'react'
import { CARS, CATEGORIES, CAR_BRANDS, SORT_OPTIONS } from '../data/cars'
import CarCard from '../components/CarCard'
import SplitText from '../components/reactbits/SplitText'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { cn } from '../lib/utils'

const ListingsPage = () => {
  const sectionRef = useRef(null)
  const [category, setCategory] = useState('all')
  const [brand, setBrand] = useState('all')
  const [sort, setSort] = useState('featured')

  const cars = CARS.filter(
    (car) =>
      (category === 'all' || car.category === category) &&
      (brand === 'all' || car.brand.toLowerCase() === brand)
  ).sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'newest':
        return b.year - a.year
      default:
        return Number(b.featured ?? false) - Number(a.featured ?? false)
    }
  })

  useEffect(() => {
    const clean = revealStagger({
      targets: '.cards',
      trigger: sectionRef.current,
      y: 60,
      stagger: 0.08,
      start: 'top 85%',
    })
    return clean
  }, [category, brand, sort])

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Notre inventaire
        </p>
        <SplitText
          tag="h1"
          text="Parcourez nos véhicules"
          splitType="words"
          delay={40}
          duration={0.7}
          textAlign="left"
          className="title text-3xl text-white sm:text-5xl"
        />
        <p className="mt-6 text-white/60">
          Tous nos véhicules sont inspectés, certifiés et garantis. Filtrez par
          catégorie ou triez selon vos préférences.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(category === cat.value ? 'all' : cat.value)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm transition-all duration-300',
              category === cat.value
                ? 'border-accent bg-accent font-semibold text-black'
                : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
            )}
          >
            {cat.label}
          </button>
        ))}

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white/70 outline-none [&>option]:bg-zinc-900"
        >
          <option value="all">Toutes les marques</option>
          {CAR_BRANDS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white/70 outline-none [&>option]:bg-zinc-900"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center text-white/60">
          Aucun véhicule ne correspond à votre recherche.
        </div>
      )}
    </section>
  )
}

export default ListingsPage
