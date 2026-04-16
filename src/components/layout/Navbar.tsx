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

  return (
    <>
      {/* ── Floating navbar ──────────────────────────────── */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-4xl rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl border border-ryze-accent/10 shadow-[0_4px_24px_rgba(12,74,52,0.08)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-3">

            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
              className="flex items-center gap-2.5 shrink-0"
              aria-label="RyzeSystems — Voltar ao topo"
            >
              <Image
                src="/logotiporyse.png"
                alt="RyzeSystems"
                width={32}
                height={32}
                priority
                className="h-8 w-8"
              />
              <span className={`font-display text-[15px] font-bold hidden sm:block transition-colors duration-500 ${scrolled ? 'text-ryze-accent' : 'text-white'}`}>
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
                        ? 'bg-ryze-accent/[0.08] text-ryze-accent font-medium'
                        : 'text-ryze-accent/55 hover:text-ryze-accent'
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
              className="hidden md:inline-flex items-center gap-2 bg-ryze-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-ryze-forest-hover hover:shadow-[0_0_20px_rgba(27,67,50,0.2)] transition-all duration-200 group shrink-0"
            >
              Começar agora
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-ryze-accent/70 hover:text-ryze-accent hover:bg-ryze-accent/[0.06] transition-colors"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ryze-dark md:hidden flex flex-col"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-ryze-border/40">
              <div className="flex items-center gap-2.5">
                <Image src="/logotiporyse.png" alt="RyzeSystems" width={32} height={32} className="h-8 w-8" />
                <span className="font-display text-[15px] font-bold text-white">
                  Ryze<span className="text-ryze-green">.</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="h-9 w-9 rounded-lg flex items-center justify-center text-ryze-muted hover:text-ryze-accent transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-1 flex-col justify-center px-10 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between border-b border-ryze-border/40 py-5"
                >
                  <span className="font-display text-3xl font-extrabold text-white transition-colors duration-300 group-hover:text-ryze-green">
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-ryze-border">0{i + 1}</span>
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="px-10 pb-10"
            >
              <div className="section-line mb-5" />
              <button
                type="button"
                onClick={() => handleNav('#contato')}
                className="w-full bg-ryze-accent text-white py-4 rounded-xl font-semibold text-base hover:bg-[#2D6A4F] transition-colors"
              >
                Começar agora
              </button>
              <p className="font-mono text-xs text-ryze-muted/40 tracking-wider mt-4 text-center">
                {CONTACT_EMAIL}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
