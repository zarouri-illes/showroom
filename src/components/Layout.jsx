import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MorphicNavbar from './kokonutui/MorphicNavbar'
import Footer from './Footer'
import PageLoader from './ui/PageLoader'
import { initSmoothScroll, scrollToTop, scrollTo } from '../animations/smoothScroll'

// Shared shell: navbar + routed content + footer, with smooth scroll + scroll reset.
const Layout = () => {
  const { pathname, hash } = useLocation()

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
    <div className="bg-carbon min-h-screen w-full overflow-x-clip">
      <MorphicNavbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
