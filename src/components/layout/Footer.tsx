'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import { fadeUp, stagger08 } from '@/lib/animations'
import { footerLinks, socials, CONTACT_EMAIL } from '@/lib/constants'
import { scrollTo } from '@/lib/scrollTo'

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] px-6 pt-20 pb-28 md:pb-10 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[700px] w-[700px] rounded-full bg-[#40916C]/[0.05] blur-[140px]" />
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
        variants={stagger08}
        className="mx-auto max-w-6xl"
      >
        {/* CTA banner */}
        <motion.div variants={fadeUp} className="mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/30 mb-6 block">
            Próximo passo
          </span>
          <h3 className="font-display font-black uppercase text-white leading-[0.9] tracking-tight text-[clamp(3rem,8vw,7rem)]">
            Sua agenda não vai<br />
            <span className="text-[#40916C] text-glow-pulse">
              lotar sozinha.
            </span>
          </h3>
          <p className="mt-6 text-white/40 text-lg max-w-md mx-auto leading-relaxed">
            Dê o primeiro passo para parar de depender só de indicação.
          </p>
          <MagneticButton
            as="a"
            href="#contato"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo('#contato') }}
            className="group mt-8 inline-flex items-center gap-2 bg-[#40916C] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-[#2D6A4F] hover:shadow-[0_0_30px_rgba(64,145,108,0.3)] hover:scale-[1.03] active:scale-[0.98]"
          >
            Quero minha agenda cheia
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </MagneticButton>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Grid section */}
        <motion.div variants={fadeUp} className="mt-14 grid gap-12 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
              className="group font-display text-2xl font-bold tracking-tight text-white"
              aria-label="RyzeSystems — Voltar ao topo"
            >
              Ryze<span className="text-[#40916C] transition-colors group-hover:text-white">.</span>
            </a>
            <p className="mt-4 max-w-xs leading-relaxed text-white/40 text-sm">
              Nascemos para servir quem cuida de pessoas. Design, tecnologia e estratégia no setor de saúde.
            </p>
            <div className="mt-5 inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40916C] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#40916C]" />
              </span>
              <span className="font-mono text-xs text-white/35">Aceitando projetos</span>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/60 mb-5">
              Navegação
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-px" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/60 mb-5">
              Social
            </h4>
            <ul className="flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                    <ArrowUpRight size={12} className="opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-px" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-white/25 font-mono hover:text-white/60 transition-colors duration-200"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-center md:flex-row md:justify-between">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} RyzeSystems. Todos os direitos reservados.
          </p>
          <button
            type="button"
            onClick={() => scrollTo('#hero')}
            className="group inline-flex items-center gap-1.5 text-xs text-white/25 font-mono hover:text-white/60 transition-colors duration-200"
            aria-label="Voltar ao topo"
          >
            Voltar ao topo
            <ArrowUp size={11} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </motion.div>
    </footer>
  )
}
