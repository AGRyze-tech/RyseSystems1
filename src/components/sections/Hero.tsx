'use client'

import { useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { scrollTo } from '@/lib/scrollTo'
import { stagger12 } from '@/lib/animations'

// ── Particles data (hardcoded positions) ──────────────────────────────────────

const particles = [
  { top: '14%', left:  '7%', size: 4, color: 'bg-ryze-cta/20', delay: '0s',    dur: '6s'   },
  { top: '22%', left: '19%', size: 3, color: 'bg-ryze-cta/30', delay: '1.2s',  dur: '5s'   },
  { top:  '9%', left: '36%', size: 5, color: 'bg-ryze-cta/25', delay: '0.5s',  dur: '7s'   },
  { top: '18%', left: '71%', size: 3, color: 'bg-ryze-cta/40', delay: '2s',    dur: '4.5s' },
  { top: '11%', left: '87%', size: 4, color: 'bg-ryze-cta/20', delay: '0.8s',  dur: '6.5s' },
  { top: '42%', left:  '4%', size: 6, color: 'bg-ryze-cta/20', delay: '1.5s',  dur: '5.5s' },
]

// ── Animation variants ────────────────────────────────────────────────────────

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    sectionRef.current?.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    sectionRef.current?.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-ryze-dark pt-24 pb-12 px-5 sm:px-8 lg:px-16 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* DNA GIF — fundo completo */}
        <Image
          src="/DNA.gif"
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          className="dna-gif object-cover mix-blend-screen opacity-[0.18]"
        />

        {/* Corner glow — top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-ryze-forest/40 blur-[120px]" />

        {/* Dot grid */}
        <div className="hero-dots absolute inset-0 opacity-[0.035]" />

        {/* Mouse-interactive spotlight */}
        <div className="hero-spotlight pointer-events-none absolute inset-0 transition-opacity duration-300" />

        {/* Floating particles — CSS custom props require inline style; no alternative */}
        {particles.map((p, i) => (
          // eslint-disable-next-line react/forbid-dom-props
          <div
            key={i}
            className={`hero-particle ${p.color}`}
            style={{
              '--p-top': p.top,
              '--p-left': p.left,
              '--p-size': `${p.size}px`,
              '--p-delay': p.delay,
              '--p-dur': p.dur,
            } as React.CSSProperties}
          />
        ))}

        {/* Noise texture overlay */}
        <div className="hero-noise absolute inset-0 opacity-[0.03]" />
      </div>

      {/* Headline — top left */}
      <div className="relative z-10 mt-8 max-w-3xl">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={stagger12}
          className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.2rem,6vw,7rem)]"
        >
          <motion.span className="block text-white" variants={lineVariants}>Tecnologia</motion.span>
          <motion.span className="block text-white" variants={lineVariants}>que transforma</motion.span>
          <motion.span className="block text-ryze-green" variants={lineVariants}>
            como a saúde opera.
          </motion.span>
        </motion.h1>
      </div>

      {/* Bottom row — stats + subtext/CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-10 flex flex-col gap-6 mt-8"
      >
        <div className="flex gap-3 w-full max-w-[420px]">
          {[
            { value: '50+', label: 'projetos entregues', cta: 'Ver portfólio', href: '#portfolio' },
            { value: '~2sem', label: 'do briefing ao lançamento. sem enrolação.', cta: 'Saiba como', href: '#processo' },
          ].map((s) => (
            <div
              key={s.label}
              role="button"
              tabIndex={0}
              aria-label={`${s.value} ${s.label} — ${s.cta}`}
              className="group relative bg-[#111F14] rounded-2xl p-4 sm:p-6 flex-1 min-w-0 flex flex-col justify-between overflow-hidden cursor-pointer hover:bg-[#162219] transition-colors duration-300"
              onClick={() => scrollTo(s.href)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollTo(s.href) } }}
            >
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#40916C]/10 blur-2xl pointer-events-none" />

              {/* Value */}
              <p className="font-display font-black text-[#40916C] text-[clamp(1.6rem,5vw,3rem)] leading-none tracking-tight">
                {s.value}
              </p>

              {/* Label */}
              <p className="text-white/40 text-xs font-mono uppercase tracking-wider mt-3 leading-relaxed max-w-[180px]">
                {s.label}
              </p>

              {/* Bottom row — CTA + arrow */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
                <span className="text-white/30 text-xs font-mono uppercase tracking-widest group-hover:text-white/60 transition-colors duration-300">
                  {s.cta}
                </span>
                <div className="h-8 w-8 rounded-full bg-[#40916C]/15 flex items-center justify-center group-hover:bg-[#40916C]/30 group-hover:scale-110 transition-all duration-300">
                  <ArrowRight size={13} className="text-[#40916C]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 max-w-full text-left">
          <p className="text-white/65 text-sm leading-relaxed">
            Criamos sites, sistemas e SmartPages para clínicas e profissionais de saúde que querem crescer com inteligência.
          </p>
          <button
            type="button"
            onClick={() => scrollTo('#contato')}
            className="group relative overflow-hidden bg-ryze-green text-white px-7 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-ryze-forest-hover hover:shadow-[0_0_30px_rgba(64,145,108,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
            Solicitar diagnóstico
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="h-8 w-px bg-gradient-to-b from-transparent to-white/10" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
      </motion.div>
    </section>
  )
}
