import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import MorphicNavbar from './kokonutui/MorphicNavbar'
import Footer from './Footer'
import PageLoader from './ui/PageLoader'
import { useTheme } from '../context/ThemeContext'
import { initSmoothScroll, scrollToTop, scrollTo } from '../animations/smoothScroll'

// Shared shell: navbar + routed content + footer, with smooth scroll + scroll reset.
const Layout = () => {
  const { pathname, hash } = useLocation()
  const { theme } = useTheme()

  useEffect(() => {
    const cleanScroll = initSmoothScroll()
    return () => cleanScroll?.()
  }, [])

  useEffect(() => {
    if (hash) {
      // Wait a frame so the routed content is painted, then glide to the section.
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (el) scrollTo(el, { offset: -80 })
      })
    } else {
      scrollToTop()
    }
  }, [pathname, hash])

  return (
    <div className={`bg-carbon min-h-screen w-full overflow-x-clip ${theme === 'light' ? 'light' : ''}`}>
      <MorphicNavbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/213540099959"
        target="_blank"
        rel="noreferrer"
        aria-label="Discuter sur WhatsApp"
        className="btn-glow fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  )
}

export default Layout
