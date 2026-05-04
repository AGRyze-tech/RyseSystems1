'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import { fadeUpScale, stagger08, smoothTransition } from '@/lib/animations'
import { scrollTo } from '@/lib/scrollTo'

type Variant = 'light' | 'accent' | 'dark'

const items: { number: string; title: string; description: string; variant: Variant }[] = [
  {
    number: '01',
    title: 'Especialistas em saúde',
    description: 'Conhecemos as particularidades do setor — linguagem, regulação e jornada do paciente.',
    variant: 'light',
  },
  {
    number: '02',
    title: 'Entrega rápida',
    description: 'Processos ágeis que colocam seu projeto no ar em semanas, sem abrir mão da qualidade.',
    variant: 'accent',
  },
  {
    number: '03',
    title: 'Design de alto nível',
    description: 'Interfaces elegantes e funcionais que transmitem credibilidade e profissionalismo.',
    variant: 'light',
  },
  {
    number: '04',
    title: 'Stack moderna',
    description: 'Tecnologias de ponta que garantem velocidade, segurança e fácil manutenção.',
    variant: 'dark',
  },
  {
    number: '05',
    title: 'Foco em conversão',
    description: 'Cada elemento é pensado para transformar visitantes em pacientes ou leads qualificados.',
    variant: 'light',
  },
  {
    number: '06',
    title: 'Parceria contínua',
    description: 'Não desaparecemos após a entrega — suporte, evolução e acompanhamento constante.',
    variant: 'accent',
  },
]

const cardStyles: Record<Variant, { card: string; number: string; title: string; description: string }> = {
  light: {
    card: 'bg-white border border-ryze-border',
    number: 'text-ryze-accent/20',
    title: 'text-ryze-accent',
    description: 'text-ryze-muted',
  },
  accent: {
    card: 'bg-gradient-to-br from-[#40916C] via-[#2D6A4F] to-[#1B4332]',
    number: 'text-white/20',
    title: 'text-white',
    description: 'text-white/70',
  },
  dark: {
    card: 'bg-[#0A1A0F]',
    number: 'text-white/15',
    title: 'text-white',
    description: 'text-white/55',
  },
}

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="relative bg-[#f6faf7] px-6 py-24 lg:px-8 lg:py-32">
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight size={12} className="text-ryze-muted" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-ryze-muted">
              Por que escolher a Ryze?
            </span>
          </div>
          <h2 className="font-display font-black uppercase tracking-tight text-ryze-text text-[clamp(2rem,5vw,4.5rem)] leading-[0.95]">
            Feitos para a<br />
            <span className="text-ryze-cta">saúde digital.</span>
          </h2>
        </motion.div>

        {/* Grid de cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger08}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {items.map((item) => {
            const s = cardStyles[item.variant]
            return (
              <motion.div
                key={item.number}
                variants={fadeUpScale}
                transition={smoothTransition}
                className={`relative rounded-2xl p-7 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] overflow-hidden ${s.card}`}
              >
                {/* Glow decorativo nos cards accent */}
                {item.variant === 'accent' && (
                  <div className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
                )}

                {/* Número */}
                <span className={`font-mono text-5xl sm:text-6xl font-bold leading-none select-none ${s.number}`}>
                  {item.number}
                </span>

                {/* Título + Descrição */}
                <div>
                  <h3 className={`font-display font-black uppercase text-xl sm:text-2xl tracking-tight mb-3 leading-tight ${s.title}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${s.description}`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-lg font-medium text-ryze-muted">
            Tudo isso no seu projeto.{' '}
            <span className="text-ryze-text">Sem complicação.</span>
          </p>
          <MagneticButton
            as="button"
            onClick={() => scrollTo('#contato')}
            className="group inline-flex items-center gap-2 rounded-full bg-ryze-cta px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-ryze-cta/90 hover:shadow-2xl hover:shadow-ryze-cta/20 hover:scale-[1.02]"
          >
            Falar com a Ryze agora
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </MagneticButton>
          <p className="text-xs text-ryze-muted/60 font-mono">
            Resposta em até 24h · Sem compromisso
          </p>
        </motion.div>

      </div>
    </section>
  )
}
