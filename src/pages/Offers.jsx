import { useEffect, useRef } from 'react'
import logos from '../assets/assets'
import boxImg from '../assets/wallpaperflare.com_wallpaper.jpg'
import boxTwoImg from '../assets/Lamborghini-Urus-removebg.png'
import SpotlightCard from '../components/kokonutui/SpotlightCard'
import SlideTextButton from '../components/kokonutui/SlideTextButton'
import SplitText from '../components/reactbits/SplitText'
import DecryptedText from '../components/reactbits/DecryptedText'
import Magnet from '../components/reactbits/Magnet'
import SmartImage from '../components/ui/SmartImage'
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
  { src: logos.audiLogo, alt: 'Audi' },
  { src: logos.bmwLogo, alt: 'BMW' },
  { src: logos.mercedesLogo, alt: 'Mercedes-Benz' },
  { src: logos.vwLogo, alt: 'Volkswagen' },
  { src: logos.landRoverLogo, alt: 'Land Rover' },
  { src: logos.gmcLogo, alt: 'GMC' },
  { src: logos.jetourLogo, alt: 'Jetour' },
  { src: logos.toyotaLogo, alt: 'Toyota' },
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
        <div className="flex w-full flex-wrap items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-8 sm:px-6">
          {BRANDS.map((brand) => (
            <span key={brand.alt} className="icons flex w-1/3 justify-center px-1 py-3 sm:w-1/4 lg:w-1/5">
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-14 w-auto object-contain transition-transform duration-300 ease-out hover:scale-110 sm:h-16"
              />
            </span>
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
              className="bg-accent text-black hover:bg-accent-hover"
            />
          </Magnet>
        </div>

        {/* Right: offer cards */}
        <div className="box grid gap-4 sm:grid-cols-2">
          <SpotlightCard className="min-h-[320px]" accent="#60a5fa">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl">
              <SmartImage
                src={boxImg}
                alt="Showroom de supercars"
                className="absolute inset-0 h-full w-full"
                imgClassName="object-cover object-center opacity-80"
              />
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
            <SmartImage
              src={boxTwoImg}
              alt="Lamborghini Urus"
              className="mx-auto h-48 w-full"
              imgClassName="object-contain object-bottom"
            />
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
