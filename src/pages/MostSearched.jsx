import { useEffect, useRef, useState } from 'react'
import { CATEGORIES, CARS } from '../data/cars'
import CarCard from '../components/CarCard'
import SlideTextButton from '../components/kokonutui/SlideTextButton'
import SplitText from '../components/reactbits/SplitText'
import Magnet from '../components/reactbits/Magnet'
import { cn } from '../lib/utils'
import { gsap } from '../animations'
import { revealStagger } from '../animations/gsap'
import { initButtonEffects } from '../animations/microInteractions'

const FILTERS = CATEGORIES

const MostSearched = () => {
  const sectionRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('new')

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    // Car cards: staggered fade/slide-in (0.1s apart) as the grid scrolls in.
    const cleanCards = revealStagger({
      targets: '.cards',
      trigger: sectionRef.current,
      y: 70,
      stagger: 0.1,
      start: 'top 80%',
    })

    const cleanBtns = initButtonEffects(sectionRef.current)

    return () => {
      cleanCards()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  const cars = CARS.filter((car) => car.category === activeFilter)
  const fallback = cars.length ? cars : CARS.slice(0, 3)
  const shown = fallback.slice(0, 3)

  return (
    <section ref={sectionRef} id="inventory" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            02 — Inventaire
          </p>
          <SplitText
            tag="h2"
            text="Les voitures les plus recherchées"
            splitType="words"
            delay={40}
            duration={0.7}
            textAlign="left"
            className="title text-3xl text-white sm:text-5xl"
          />
        </div>
        <Magnet magnetStrength={6}>
          <SlideTextButton
            text="Voir tout"
            hoverText="Parcourir →"
            to="/listing"
            className="bg-accent text-black hover:bg-accent-hover"
          />
        </Magnet>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              'btn-glow rounded-xl border px-4 py-2 text-sm',
              activeFilter === filter.value
                ? 'border-accent bg-accent font-semibold text-black'
                : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Car grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  )
}

export default MostSearched
