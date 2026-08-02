import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import logoWatsor from '../../assets/logo watsor.webp'

// ─── Navigation structure ─────────────────────────────────────────────────────

const menuStructure = [
  { label: 'Beranda', path: '/' },
  { label: 'Profil', path: '/profil' },
  {
    label: 'Informasi',
    path: '/berita', // Fallback path
    children: [
      { label: 'Direktori Lokasi', path: '/peta', id: 'peta' },
      { label: 'Direktori Kontak', path: '/kontak', id: 'kontak' },
      { label: 'Berita', path: '/berita', id: 'berita' },
      { label: 'Pengumuman', path: '/pengumuman', id: 'pengumuman' },
      { label: 'Edukasi Iklim', path: '/edukasi', id: 'edukasi' },
      { label: 'Info Cuaca', path: '/cuaca', id: 'cuaca' },
    ],
  },
  {
    label: 'Layanan',
    path: '/layanan', // Fallback path
    children: [
      { label: 'Layanan Publik', path: '/layanan', id: 'layanan' },
      { label: 'Aspirasi Warga', path: '/aspirasi', id: 'aspirasi' },
      { label: 'Tanya Jawab (FAQ)', path: '/faq', id: 'faq' },
    ],
  },
]

// ─── Mobile drawer ────────────────────────────────────────────────────────────

// ─── Mobile specific grouping ───────────────────────────────────────────────────

function MobileDrawer({ open, onClose, currentPath }) {
  const navigate = useNavigate()

  // Close drawer on route change
  useEffect(() => {
    if (open) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath])

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const handleNavClick = (path) => {
    onClose()
    setTimeout(() => navigate(path), 150)
  }

  const isActive = (path) =>
    path === '/' ? currentPath === '/' : currentPath.startsWith(path)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed top-14 left-0 right-0 bottom-0 z-50 bg-white shadow-xl overflow-hidden lg:hidden flex flex-col"
          >
            {/* Drawer header */}
            <div className="px-5 pt-4 pb-3 border-b border-surface-100 flex-shrink-0">
              <p className="text-xs font-semibold text-surface-400 uppercase tracking-wide">
                Menu Navigasi
              </p>
            </div>

            {/* Links container */}
            <nav className="p-3 flex-1 overflow-y-auto pb-20">
              <div className="flex flex-col">
                {menuStructure.map((item, i) => (
                  <div key={item.label} className={i > 0 ? "mt-2" : ""}>
                    {item.children ? (
                      <div className="mb-1">
                        <h4 className="text-[10px] font-bold text-surface-400 uppercase tracking-widest px-4 py-2 mt-2">
                          {item.label}
                        </h4>
                        <div className="flex flex-col gap-0.5">
                          {item.children.map(child => (
                            <button
                              key={child.path}
                              onClick={() => handleNavClick(child.path)}
                              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                                isActive(child.path)
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'text-surface-700 hover:bg-surface-50'
                              }`}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all duration-150 ${
                          isActive(item.path)
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-surface-700 hover:bg-surface-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Footer strip */}
            <div className="px-5 py-3 bg-surface-50/60 border-t border-surface-100">
              <p className="text-[10px] text-surface-400 font-medium text-center">
                Portal Resmi · Kelurahan Watang Soreang · Kota Parepare
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const logoUrl = logoWatsor
  const siteName = 'Watang Soreang'

  // Detect scroll for slight shadow increase
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Floating header bar ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg border-b border-surface-200 shadow-sm py-0.5'
            : 'bg-white border-b border-surface-200 py-1 md:py-2'
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between px-4 h-[60px] md:h-16 max-w-7xl md:mx-auto md:px-8">

            {/* ── Branding ─────────────────────────────────────────────────── */}
            <Link
              to="/"
              className="flex items-center gap-3 group pl-1"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                <img
                  src={logoUrl}
                  alt={`Logo ${siteName}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm md:text-base font-extrabold text-surface-900 leading-none tracking-tight mb-1">
                  Kelurahan {siteName}
                </p>
                <p className="text-[10px] text-surface-500 font-bold uppercase tracking-widest leading-none">
                  Kota Parepare
                </p>
              </div>
            </Link>

            {/* ── Desktop navigation links ─────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigasi utama">
              {menuStructure.map((link) => (
                <div
                  key={link.path}
                  className="relative group"
                >
                  {link.children ? (
                    <>
                      <button
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActive(link.path)
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-surface-600 group-hover:bg-surface-100/80 group-hover:text-surface-900'
                        }`}
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 opacity-50 transition-transform duration-200 group-hover:rotate-180`}
                        />
                      </button>
                      
                      {/* CSS Hover Dropdown (Bulletproof, no stuck state) */}
                      <div className="absolute top-full left-0 pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50 transform origin-top -translate-y-2 group-hover:translate-y-0">
                         <div className="bg-white rounded-2xl shadow-card-hover border border-surface-100 overflow-hidden">
                           {link.children.map((item) => (
                              <Link
                                key={item.id || item.path}
                                to={item.path}
                                className="block px-4 py-3 text-sm text-surface-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-150 font-medium border-b border-surface-50 last:border-b-0"
                              >
                                {item.label}
                              </Link>
                           ))}
                         </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive(link.path)
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-surface-600 hover:bg-surface-100/80 hover:text-surface-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* ── Mobile hamburger ─────────────────────────────────────────── */}
            <button
              id="mobile-menu-button"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-surface-50 hover:bg-surface-100 active:bg-surface-200 transition-colors duration-200 mr-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-4.5 h-4.5 text-surface-700" style={{ width: 18, height: 18 }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-4.5 h-4.5 text-surface-700" style={{ width: 18, height: 18 }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────────────────────── */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={location.pathname}
      />
    </>
  )
}
