/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import { gsap } from '../animations'
import { revealStagger, countUp } from '../animations/gsap'
import { prefersReducedMotion } from '../animations'

const REVIEWS = [
  {
    name: 'Karim B.',
    car: 'Audi A6 2024',
    rating: 5,
    initials: 'KB',
    text: "Excellent service ! Le conseiller était très professionnel et m'a accompagné jusqu'à la livraison. Je recommande vivement.",
  },
  {
    name: 'Sarah M.',
    car: 'Porsche 911 Turbo S',
    rating: 5,
    initials: 'SM',
    text: "Showroom magnifique avec un large choix de véhicules. J'ai trouvé la voiture de mes rêves à un prix imbattable. Merci à toute l'équipe !",
  },
  {
    name: 'Mohamed L.',
    car: 'Jetour X70 Plus',
    rating: 4,
    initials: 'ML',
    text: "Très bonne expérience globale. Le personnel est à l'écoute et les véhicules sont de qualité. Seul petit bémol : le délai de livraison un peu long.",
  },
  {
    name: 'Fatima Z.',
    car: 'Audi Q2 2024',
    rating: 5,
    initials: 'FZ',
    text: "Un grand merci à Les Frères Auto pour leur professionnalisme. J'ai été conseillée au mieux pour choisir le véhicule adapté à mes besoins.",
  },
  {
    name: 'Amine K.',
    car: 'Porsche Macan 2024',
    rating: 5,
    initials: 'AK',
    text: 'Rapport qualité-prix excellent. Le showroom est bien agencé et l\'équipe commerciale est sympathique et sans pression.',
  },
  {
    name: 'Nadia R.',
    car: 'Range Rover Sport SVR',
    rating: 5,
    initials: 'NR',
    text: "Je suis ravie de mon achat ! Procédure simple et rapide. Je reviendrai sans hésiter pour mon prochain véhicule.",
  },
  {
    name: 'Yacine H.',
    car: 'Audi Q3 2023',
    rating: 5,
    initials: 'YH',
    text: 'De loin le meilleur concessionnaire de la région. Accueil chaleureux, véhicules impeccables et prix justes. Je recommande à 100%.',
  },
  {
    name: 'Lina B.',
    car: 'Audi A6 2024',
    rating: 4,
    initials: 'LB',
    text: 'Une équipe à l\'écoute du début à la fin. Le financement a été facilité et la remise des clés s\'est faite dans les délais.',
  },
]

const Stars = ({ count }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        className={`h-3.5 w-3.5 ${i < count ? 'text-accent' : 'text-white/15'}`}
        fill="currentColor"
      >
        <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.11l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
      </svg>
    ))}
  </div>
)

const ReviewCard = ({ review }) => (
  <article className="review-card group relative w-[300px] shrink-0 sm:w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.04]">
    <svg
      viewBox="0 0 24 24"
      className="absolute -right-3 -top-3 h-16 w-16 text-white/[0.04] transition-colors duration-300 group-hover:text-accent/10"
      fill="currentColor"
    >
      <path d="M9.6 4.8c-3.5 0-6 2.6-6 6 0 3.3 2.4 5.7 5.4 5.7.4 0 .9-.05 1.2-.1l-.4 2.6c2-.9 3.4-2.8 3.9-4.9.3-1.2.5-2.4.5-3.5 0-3.2-2.1-5.8-4.6-5.8zM18.6 4.8c-3.5 0-6 2.6-6 6 0 3.3 2.4 5.7 5.4 5.7.4 0 .9-.05 1.2-.1l-.4 2.6c2-.9 3.4-2.8 3.9-4.9.3-1.2.5-2.4.5-3.5 0-3.2-2.1-5.8-4.6-5.8z" />
    </svg>

    <div className="mb-4 flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent ring-1 ring-accent/30">
        {review.initials}
      </div>
      <Stars count={review.rating} />
    </div>

    <p className="text-sm leading-relaxed text-white/70">“{review.text}”</p>

    <div className="mt-5 border-t border-white/10 pt-4">
      <p className="text-sm font-semibold text-white">{review.name}</p>
      <p className="mt-0.5 text-xs text-white/40">A acheté une {review.car}</p>
    </div>
  </article>
)

const MarqueeRow = ({ reviews, reverse = false, speed = 32 }) => {
  const rowRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return () => {}
    const el = rowRef.current
    const tween = gsap.to(el, {
      xPercent: reverse ? 50 : -50,
      duration: speed,
      ease: 'none',
      repeat: -1,
    })
    const onEnter = () => tween.pause()
    const onLeave = () => tween.resume()
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      tween.kill()
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reverse, speed])

  const doubled = [...reviews, ...reviews]

  return (
    <div className="marquee-mask overflow-hidden">
      <div ref={rowRef} className="flex w-max gap-5 pr-5">
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}

const Reviews = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanReveal = revealStagger({
      targets: '.review-header-left, .review-badge',
      trigger: sectionRef.current,
      y: 60,
      stagger: 0.12,
      start: 'top 80%',
    })

    const cleanRows = revealStagger({
      targets: '.review-row',
      trigger: sectionRef.current,
      y: 70,
      stagger: 0.2,
      start: 'top 85%',
    })

    const cleanCount = countUp({
      target: '.review-rating-num',
      to: 4,
      duration: 1.4,
    })

    return () => {
      cleanReveal()
      cleanRows()
      cleanCount()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="reviews" className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="review-header-left max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <DecryptedText text="04 — Avis clients" animateOn="view" speed={40} />
          </p>
          <SplitText
            tag="h2"
            text="Ils nous font confiance"
            splitType="words"
            delay={40}
            duration={0.7}
            textAlign="left"
            className="title text-3xl text-white sm:text-5xl"
          />
          <p className="mt-6 text-white/60">
            Des centaines de clients satisfaits dans toute la région. Voici
            quelques-unes de leurs expériences avec Les Frères Auto.
          </p>
        </div>

        <div className="review-badge flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-4 backdrop-blur-md">
          <div>
            <p className="title text-4xl text-accent">
              <span className="review-rating-num">0</span>.9
            </p>
            <p className="text-xs text-white/40">note moyenne</p>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <Stars count={5} />
            <p className="mt-1.5 text-sm font-semibold text-white">97% de clients satisfaits</p>
          </div>
        </div>
      </div>

      <div className="review-row relative -mx-4 space-y-5 sm:-mx-6">
        <MarqueeRow reviews={REVIEWS.slice(0, 4)} speed={34} />
        <MarqueeRow reviews={REVIEWS.slice(4)} reverse speed={40} />
      </div>
    </section>
  )
}

export default Reviews
