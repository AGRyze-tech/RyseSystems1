'use client'

import { useEffect } from 'react'
import { Quote, Star } from 'lucide-react'

const STARS = Array.from({ length: 5 }, (_, i) => (
  <Star key={i} size={13} className="fill-ryze-cta text-ryze-cta" />
))

const testimonials = [
  {
    quote: 'A RyzeSystems entendeu exatamente o que precisávamos. O site ficou impecável e nosso fluxo de agendamentos triplicou no primeiro mês.',
    name: 'Dra. Carolina Mendes',
    role: 'Dermatologista',
    initials: 'CM',
  },
  {
    quote: 'Parceria incrível do início ao fim. A equipe é ágil, o design surpreendeu, e o suporte pós-entrega é excepcional.',
    name: 'Dr. Rafael Torres',
    role: 'Ortopedista — Clínica Vitalis',
    initials: 'RT',
  },
  {
    quote: 'Nosso sistema de gestão transformou completamente a operação da clínica. Reduzimos tempo administrativo em 60%.',
    name: 'Ana Beatriz Souza',
    role: 'Gestora — Rede Equilíbrio',
    initials: 'AS',
  },
]

export default function Depoimentos() {
  useEffect(() => {
    const els = document.querySelectorAll('.dep-reveal')
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="depoimentos" className="cv-auto section-mint relative px-6 py-28 lg:px-8 lg:py-36">
      <div className="relative z-10 mx-auto max-w-6xl">

        <div className="reveal dep-reveal mb-14">
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-ryze-muted">
            Depoimentos
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-ryze-text md:text-5xl">
            O que nossos{' '}
            <span className="bg-gradient-to-r from-ryze-accent to-ryze-cta bg-clip-text text-transparent">
              clientes dizem
            </span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="reveal dep-reveal flex flex-col rounded-3xl border border-ryze-border/60 bg-white/80 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-ryze-accent/[0.06] hover:border-ryze-cta/30"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-5 flex gap-1">{STARS}</div>
              <Quote size={22} className="mb-4 text-ryze-cta/25" />
              <p className="flex-1 text-[15px] leading-relaxed text-ryze-text">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-ryze-border/40 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ryze-cta/10 font-display text-xs font-bold text-ryze-accent border border-ryze-border/60">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-ryze-text">{t.name}</p>
                  <p className="text-xs text-ryze-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
