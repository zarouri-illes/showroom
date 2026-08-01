import { useEffect, useRef } from 'react'
import logos from '../assets/assets'
import boxImg from '../assets/wallpaperflare.com_wallpaper.jpg'
import boxTwoImg from '../assets/Lamborghini-Urus-removebg.png'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import SlideTextButton from '../components/kokonutui/SlideTextButton'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import Magnet from '../components/reactbits/Magnet'
import { gsap } from '../animations'
import { revealStagger, countUp } from '../animations/gsap'
import { initButtonEffects } from '../animations/microInteractions'

const OFFERS = [
  {
    number: '01',
    text: 'Le plus grand réseau du pays, avec plus de points de service dans plus d’endroits',
  },
  { number: '02', text: 'Assistance routière 24h/24 et 7j/7' },
  { number: '03', text: 'Nous réparons 4 voitures sur 5 sur place' },
]

const BRANDS = [
  { src: logos.porsLogo, alt: 'Porsche' },
  { src: logos.lamLogo, alt: 'Lamborghini' },
  { src: logos.nissanLogo, alt: 'Nissan' },
  { src: logos.ferrariLogo, alt: 'Ferrari' },
  { src: logos.cooperLogo, alt: 'MINI' },
  { src: logos.audiLogo, alt: 'Audi' },
]

const Offers = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef)

    const cleanIcons = revealStagger({
      targets: '.icons',
      trigger: sectionRef.current,
      y: 40,
      stagger: 0.1,
      start: 'top 85%',
    })

    const cleanBox = revealStagger({
      targets: '.box',
      trigger: sectionRef.current,
      y: 70,
      start: 'top 80%',
    })

    const cleanCount = countUp({
      target: '.stat-num',
      to: 500,
      suffix: ' +',
    })

    const cleanBtns = initButtonEffects(sectionRef.current)

    return () => {
      cleanIcons()
      cleanBox()
      cleanCount()
      cleanBtns()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="offers" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      {/* Brand logos */}
      <div className="mb-16">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
          Adopté par les plus grandes marques automobiles
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 sm:justify-between sm:px-10">
          {BRANDS.map((brand) => (
            <img
              key={brand.alt}
              src={brand.src}
              alt={brand.alt}
              className="icons h-10 w-auto object-contain opacity-45 grayscale transition-all duration-300 ease-out hover:scale-110 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_14px_rgba(255,214,10,0.35)] sm:h-12"
            />
          ))}
        </div>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <DecryptedText text="01 — Ce que nous offrons" animateOn="view" speed={40} />
          </p>
          <SplitText
            tag="h2"
            text="L'expérience concessionnaire complète"
            splitType="words"
            delay={40}
            duration={0.7}
            textAlign="left"
            className="title text-3xl text-white sm:text-5xl"
          />
          <p className="my-8 max-w-md text-white/60">
            Obtenez la meilleure valeur pour votre véhicule grâce à notre
            processus de vente transparent et simple.
          </p>

          <div className="mb-8">
            {OFFERS.map((item) => (
              <div
                key={item.number}
                className="flex items-start gap-5 border-b border-white/10 py-4"
              >
                <span className="text-sm font-semibold text-white/40">{item.number}</span>
                <p className="text-white/80">{item.text}</p>
              </div>
            ))}
          </div>

          <Magnet magnetStrength={6}>
            <SlideTextButton
              text="Explorer plus"
              hoverText="C'est parti →"
              to="/listing"
              className="bg-accent text-black hover:bg-white"
            />
          </Magnet>
        </div>

        {/* Right: offer cards */}
        <div className="box grid gap-4 sm:grid-cols-2">
          <SpotlightCard className="min-h-[320px]" accent="#60a5fa">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl">
              <img src={boxImg} alt="Showroom de supercars" className="h-full w-full object-cover object-center opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <h3 className="title text-2xl text-white">Supercars</h3>
                <p className="max-w-[220px] text-sm text-white/70">
                  Découvrez l&apos;univers des supercars dans notre showroom.
                </p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="min-h-[320px] justify-center" accent="#ffd60a">
            <img src={boxTwoImg} alt="Lamborghini Urus" className="mx-auto h-48 w-full object-contain object-bottom" />
            <div className="mt-2 text-center">
              <h3 className="title text-5xl text-white">
                <span className="stat-num">0</span>
              </h3>
              <p className="mt-1 text-white/70">Voitures de différentes marques en stock</p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}

export default Offers
