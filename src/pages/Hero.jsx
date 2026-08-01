import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import lambo from '../assets/Side-View-Lamborghini-Car-PNG-Photos.png'
import location from '../assets/location.png'
import { gsap, prefersReducedMotion } from '../animations'
import { parallax, mouseTilt } from '../animations/gsap'
import SplitText from '../components/reactbits/SplitText'
import ShinyText from '../components/reactbits/ShinyText'
import SmartImage from '../components/ui/SmartImage'

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    // Hero entrance: staggered fade/slide for the car + captions.
    // (Title + subtitle are handled by the react-bits SplitText components.)
    if (!prefersReducedMotion()) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo(
          '.car-main',
          { x: window.innerWidth, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power2.inOut' },
        )
        .fromTo(
          '.hero-caption',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          '-=0.6'
        )
    }

    // Subtle scroll parallax on the hero car image (cheap: transform only).
    const cleanParallax = parallax({
      target: '.car-main',
      trigger: heroRef.current,
      yPercent: 8,
    })

    // 3D mouse tilt on the hero car.
    const cleanTilt = mouseTilt({ target: '.car-main', rotateMax: 7, scaleOnHover: 1.04 })

    return () => {
      cleanParallax()
      cleanTilt()
    }
  }, [])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden bg-carbon">
      {/* Static aurora background — CSS-only, zero animation cost (keeps 60fps scroll) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 15% 10%, rgba(255,214,10,0.10), transparent 42%), radial-gradient(circle at 90% 25%, rgba(96,165,250,0.10), transparent 45%), radial-gradient(circle at 50% 95%, rgba(255,255,255,0.06), transparent 40%)',
        }}
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 pb-24 pt-32 sm:px-6">
        {/* TITLE — react-bits SplitText chars + ShinyText accent */}
        <h1 className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1">
          <SplitText
            tag="span"
            text="Trouvez votre"
            splitType="chars"
            delay={60}
            duration={0.9}
            className="hero-title text-4xl leading-tight text-white sm:text-6xl lg:text-7xl"
          />
          <ShinyText
            text="Voiture de rêve"
            color="#ffd60a"
            shineColor="#ffffff"
            speed={3}
            className="hero-title text-4xl leading-tight sm:text-6xl lg:text-7xl"
          />
        </h1>

        {/* SUBTITLE — react-bits SplitText words */}
        <SplitText
          tag="p"
          text="Des véhicules de luxe et de performance soigneusement sélectionnés, avec des prix transparents et un réseau d'assistance national."
          splitType="words"
          delay={80}
          duration={0.7}
          from={{ opacity: 0, y: 24 }}
          className="hero-sub max-w-xl text-sm text-white/70 sm:text-base"
        />

        {/* CAR IMAGE */}
        <div className="flex w-[85%] justify-center overflow-hidden sm:w-[75%] lg:w-[65%]">
          <SmartImage
            src={lambo}
            alt="Lamborghini Urus"
            className="car-main h-auto w-full"
            imgClassName="object-contain"
          />
        </div>

        {/* LEFT CAPTION */}
        <div className="hero-caption absolute bottom-16 left-8 hidden w-[280px] flex-wrap text-white/80 lg:block">
          <p className="text-sm leading-relaxed">
            Chez frereauto10, nous nous engageons à vous offrir une expérience
            exceptionnelle qui répond à vos besoins uniques.
          </p>
        </div>

        {/* MAP CARD */}
        <div className="hero-caption absolute bottom-16 right-8 hidden w-[280px] rounded-2xl border border-white/10 bg-white/5 p-4 lg:block">
          <div className="flex items-center justify-center gap-2">
            <img src={location} alt="logo de localisation" className="h-6" />
            <Link to="/contact" className="text-sm underline">
              voir sur la carte
            </Link>
          </div>
          <p className="mt-2 border-t border-white/10 pt-2 text-sm text-white/60">
            12, Avenue des Champs-Élysées, 75008 Paris, France
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
