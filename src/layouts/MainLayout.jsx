import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.18, ease: 'easeIn' } },
}

export default function MainLayout() {
  const location = useLocation()

  // Scroll to top on route change (instant for tab switches, smooth for links)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Global floating header */}
      <Header />

      {/* Page content — offset below fixed floating header */}
      <main id="main-content" className="flex-1 pt-20" role="main" aria-label="Konten utama">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
