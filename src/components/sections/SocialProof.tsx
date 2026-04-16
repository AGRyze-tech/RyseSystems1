'use client'

import { motion } from 'framer-motion'
import { useCountUp } from '@/lib/hooks/useCountUp'

// ── Stats data ────────────────────────────────────────────────────────────────

const stats = [
  { type: 'count' as const, target: 50, suffix: '+', label: 'Projetos entregues' },
  { type: 'count' as const, target: 12, suffix: '+', label: 'Clientes ativos' },
  { type: 'static' as const, value: '~2sem', label: 'Entrega média' },
]

// ── Stat cell ─────────────────────────────────────────────────────────────────

function StatCell({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const { count, elRef } = useCountUp(stat.type === 'count' ? stat.target : 0)

  return (
    <motion.div
      layout={false}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col items-center text-center py-8 px-6 ${
        index === 1 ? 'md:border-x md:border-white/10' : ''
      }`}
    >
      <span
        ref={stat.type === 'count' ? elRef : undefined}
        className="font-display font-black text-white text-[clamp(2.5rem,5vw,3.5rem)] leading-none"
      >
        {stat.type === 'count' ? `${count}${stat.suffix}` : stat.value}
      </span>
      <p className="font-mono text-white/45 text-[11px] tracking-[0.22em] uppercase mt-3 leading-snug">
        {stat.label}
      </p>
    </motion.div>
  )
}

// ── Social proof bar ──────────────────────────────────────────────────────────

export default function SocialProof() {
  return (
    <section className="relative bg-ryze-accent overflow-hidden">
      {/* Dot pattern */}
      <div className="panel-dots pointer-events-none absolute inset-0 opacity-[0.055]" />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-ryze-cta/15 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 grid grid-cols-1 md:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}
