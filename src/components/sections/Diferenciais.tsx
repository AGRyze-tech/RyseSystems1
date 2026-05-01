'use client'

import { motion } from 'framer-motion'
import { HeartPulse, Timer, Paintbrush, Layers, Target, Handshake, ArrowRight } from 'lucide-react'
import TiltCard from '@/components/ui/TiltCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { fadeUp, stagger08, smoothTransition } from '@/lib/animations'
import { scrollTo } from '@/lib/scrollTo'

const items = [
  { icon: HeartPulse, title: 'Especialistas em saúde', description: 'Conhecemos as particularidades do setor — linguagem, regulação e jornada do paciente.' },
  { icon: Timer, title: 'Entrega rápida', description: 'Processos ágeis que colocam seu projeto no ar em semanas, sem abrir mão da qualidade.' },
  { icon: Paintbrush, title: 'Design de alto nível', description: 'Interfaces elegantes e funcionais que transmitem credibilidade e profissionalismo.' },
  { icon: Layers, title: 'Stack moderna', description: 'Tecnologias de ponta que garantem velocidade, segurança e fácil manutenção.' },
  { icon: Target, title: 'Foco em conversão', description: 'Cada elemento é pensado para transformar visitantes em pacientes ou leads qualificados.' },
  { icon: Handshake, title: 'Parceria contínua', description: 'Não desaparecemos após a entrega — suporte, evolução e acompanhamento constante.' },
]

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="cv-auto relative px-6 py-28 lg:px-8 lg:py-36">
      <motion.div
        layout={false}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger08}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <motion.div
          variants={fadeUp}
          transition={smoothTransition}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-ryze-muted">
            Diferenciais
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-ryze-text md:text-5xl lg:text-6xl">
            Feitos para a{' '}
            <span className="bg-gradient-to-r from-ryze-accent to-ryze-cta bg-clip-text text-transparent">
              saúde digital.
            </span>
          </h2>
        </motion.div>

        <motion.div variants={stagger08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={smoothTransition}
            >
              <TiltCard className="group flex flex-col rounded-2xl border border-ryze-border bg-white p-8 transition-all duration-500 hover:border-ryze-cta/30 hover:shadow-xl hover:shadow-ryze-cta/[0.05] md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ryze-border bg-ryze-surface text-[#111111] transition-all duration-500 group-hover:border-ryze-cta/30 group-hover:bg-[#F3F4F6]">
                  <item.icon size={22} />
                </div>

                <h3 className="mt-6 font-display text-lg font-bold text-ryze-text">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ryze-muted">
                  {item.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Section CTA */}
        <motion.div
          variants={fadeUp}
          transition={smoothTransition}
          className="mt-16 flex flex-col items-center gap-5 text-center"
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
      </motion.div>
    </section>
  )
}
