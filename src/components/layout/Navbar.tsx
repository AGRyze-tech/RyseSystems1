'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { navLinks, CONTACT_EMAIL } from '@/lib/constants'
import { scrollTo as scrollToSection } from '@/lib/scrollTo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const scrolledRef = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled
        setScrolled(isScrolled)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.replace('#', ''))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false)
    scrollToSection(href)
  }, [])

  // Navbar background style — 3 states: overlay open / scrolled / transparent
  const navBg = mobileOpen
    ? 'bg-ryze-dark border border-white/[0.06]'
    : scrolled
    ? 'bg-white md:bg-white/95 md:backdrop-blur-xl border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
    : 'bg-transparent border border-transparent'

  // Logo text color
  const logoColor = mobileOpen || !scrolled ? 'text-white' : 'text-[#0A0A0A]'

  // Hamburger button style
  const btnColor = mobileOpen
    ? 'text-white/70 hover:text-white hover:bg-white/[0.06]'
    : scrolled
    ? 'text-[#111111]/70 hover:text-[#111111] hover:bg-black/[0.04]'
    : 'text-white/80 hover:text-white hover:bg-white/[0.08]'

  return (
    <>
      {/* ── Floating navbar ──────────────────────────────── */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-4xl rounded-2xl transition-all duration-300 ${navBg}`}
        >
          <div className="flex items-center justify-between px-5 py-3">

            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
              className="flex items-center gap-2.5 shrink-0"
              aria-label="RyzeSystems — Voltar ao topo"
            >
              {/* Logo SVG inline — sem dependência de arquivo externo */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 220 220"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="RyzeSystems logo"
                className="h-8 w-8 shrink-0"
              >
                <defs>
                  <mask id="wm">
                    <rect width="220" height="220" fill="white"/>
                    <path d="M-5,68 C20,60 45,58 55,72 C68,90 80,105 100,100 C120,95 132,80 148,72 C158,66 178,64 225,68 L225,82 C178,78 158,80 148,88 C132,98 120,112 100,114 C80,116 68,100 55,88 C45,76 20,74 -5,82Z" fill="black"/>
                    <path d="M-5,120 C20,112 45,110 55,124 C68,142 80,157 100,152 C120,147 132,132 148,124 C158,118 178,116 225,120 L225,134 C178,130 158,132 148,140 C132,150 120,164 100,166 C80,168 68,152 55,140 C45,128 20,126 -5,130Z" fill="black"/>
                  </mask>
                </defs>
                <g fill="#40916C" mask="url(#wm)">
                  <path d="M55,10 C72,10 88,18 94,32 C100,44 100,52 100,55 C100,58 100,66 94,78 C88,92 72,100 55,100 C38,100 22,92 16,78 C10,66 10,58 10,55 C10,52 10,44 16,32 C22,18 38,10 55,10Z"/>
                  <path d="M165,10 C182,10 198,18 204,32 C210,44 210,52 210,55 C210,58 210,66 204,78 C198,92 182,100 165,100 C148,100 132,92 126,78 C120,66 120,58 120,55 C120,52 120,44 126,32 C132,18 148,10 165,10Z"/>
                  <path d="M55,120 C72,120 88,128 94,142 C100,154 100,162 100,165 C100,168 100,176 94,188 C88,202 72,210 55,210 C38,210 22,202 16,188 C10,176 10,168 10,165 C10,162 10,154 16,142 C22,128 38,120 55,120Z"/>
                  <path d="M165,120 C182,120 198,128 204,142 C210,154 210,162 210,165 C210,168 210,176 204,188 C198,202 182,210 165,210 C148,210 132,202 126,188 C120,176 120,168 120,165 C120,162 120,154 126,142 C132,128 148,120 165,120Z"/>
                </g>
              </svg>
              <span className={`font-display text-[15px] font-bold hidden sm:block transition-colors duration-300 ${logoColor}`}>
                Ryze<span className="text-ryze-green">.</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                  className={`relative px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    scrolled
                      ? activeSection === link.href
                        ? 'bg-black/[0.06] text-[#0A0A0A] font-medium'
                        : 'text-[#111111]/55 hover:text-[#0A0A0A]'
                      : activeSection === link.href
                        ? 'bg-white/[0.08] text-white font-medium'
                        : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <button
              type="button"
              onClick={() => handleNav('#contato')}
              className="hidden md:inline-flex items-center gap-2 bg-ryze-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#333333] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all duration-200 group shrink-0"
            >
              Começar agora
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile hamburger / close */}
            <button
              type="button"
              onClick={() => setMobileOpen(prev => !prev)}
              className={`md:hidden flex items-center justify-center h-10 w-10 rounded-lg transition-colors duration-200 ${btnColor}`}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen ? 'true' : 'false'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex"
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex"
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile fullscreen overlay ─────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ryze-dark md:hidden flex flex-col"
          >
            {/* Espaço reservado para o navbar (aprox. top-4 + altura do nav) */}
            <div className="h-20 shrink-0" />

            {/* Nav links */}
            <div className="flex flex-1 flex-col justify-center px-10 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between border-b border-white/[0.06] py-5"
                >
                  <span className="font-display text-3xl font-extrabold text-white transition-colors duration-300 group-hover:text-ryze-green">
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-white/20">0{i + 1}</span>
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-10 pb-10"
            >
              <div className="h-px bg-white/[0.06] mb-5" />
              <button
                type="button"
                onClick={() => handleNav('#contato')}
                className="w-full bg-ryze-green text-white py-4 rounded-xl font-semibold text-base hover:bg-ryze-forest-hover transition-colors active:scale-[0.98]"
              >
                Começar agora
              </button>
              <p className="font-mono text-xs text-white/20 tracking-wider mt-4 text-center">
                {CONTACT_EMAIL}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
