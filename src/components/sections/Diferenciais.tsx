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

function Card({ item }: { item: typeof items[0] }) {
  if (item.variant === 'light') {
    return (
      <div className="relative rounded-2xl p-7 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] overflow-hidden bg-[#E8F0E9]">
        <span className="font-mono text-5xl sm:text-6xl font-bold leading-none select-none text-[#0c4a34]/20">
          {item.number}
        </span>
        <div>
          <h3 className="font-display font-black uppercase text-xl sm:text-2xl tracking-tight mb-3 leading-tight text-[#0c4a34]">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-[#0c4a34]/60">
            {item.description}
          </p>
        </div>
      </div>
    )
  }

  if (item.variant === 'accent') {
    return (
      <div className="card-accent-gradient relative rounded-2xl p-7 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] overflow-hidden">
        <span className="font-mono text-5xl sm:text-6xl font-bold leading-none select-none text-white/20">
          {item.number}
        </span>
        <div>
          <h3 className="font-display font-black uppercase text-xl sm:text-2xl tracking-tight mb-3 leading-tight text-white">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/70">
            {item.description}
          </p>
        </div>
      </div>
    )
  }

  // dark
  return (
    <div className="relative rounded-2xl p-7 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] overflow-hidden bg-[#111D13]">
      <span className="font-mono text-5xl sm:text-6xl font-bold leading-none select-none text-white/15">
        {item.number}
      </span>
      <div>
        <h3 className="font-display font-black uppercase text-xl sm:text-2xl tracking-tight mb-3 leading-tight text-white">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/50">
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="relative bg-[#0A1A0F] px-6 py-24 lg:px-8 lg:py-32">
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
            <ArrowRight size={12} className="text-[#40916C]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#40916C]">
              Por que escolher a Ryze?
            </span>
          </div>
          <h2 className="font-display font-black uppercase tracking-tight text-white text-[clamp(2rem,5vw,4.5rem)] leading-[0.95]">
            Feitos para a<br />
            <span className="text-[#52B788]">saúde digital.</span>
          </h2>
          <div className="mt-6 h-px w-16 bg-[#40916C]/40" />
        </motion.div>

        {/* Grid de cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger08}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {items.map((item) => (
            <motion.div
              key={item.number}
              variants={fadeUpScale}
              transition={smoothTransition}
            >
              <Card item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-lg font-medium text-white/50">
            Tudo isso no seu projeto.{' '}
            <span className="text-white">Sem complicação.</span>
          </p>
          <MagneticButton
            as="button"
            onClick={() => scrollTo('#contato')}
            className="group inline-flex items-center gap-2 rounded-full bg-[#40916C] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#2D6A4F] hover:shadow-2xl hover:shadow-[#40916C]/20 hover:scale-[1.02]"
          >
            Falar com a Ryze agora
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </MagneticButton>
          <p className="text-xs text-white/25 font-mono">
            Resposta em até 24h · Sem compromisso
          </p>
        </motion.div>

      </div>
    </section>
  )
}
