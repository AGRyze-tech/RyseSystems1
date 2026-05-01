'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger12, smoothTransition } from '@/lib/animations'
import { useCountUp } from '@/lib/hooks/useCountUp'

const stats = [
  { value: 50, suffix: '+', label: 'projetos entregues' },
  { value: 12, suffix: '+', label: 'clientes atendidos' },
  { value: 3, suffix: '', label: 'produtos ativos' },
  { value: 20, suffix: '+', label: 'anos de experiência' },
]

function StatRow({ stat, isLast }: { stat: typeof stats[number]; isLast: boolean }) {
  const { count, elRef } = useCountUp(stat.value)
  return (
    <div className={`group flex items-end justify-between border-t border-ryze-border/40 py-5 lg:py-7 transition-colors duration-500 hover:border-ryze-accent/20 ${isLast ? 'border-b border-ryze-border/40' : ''}`}>
      <span className="font-mono text-xs uppercase tracking-widest text-ryze-muted/50">{stat.label}</span>
      <span className="font-display text-4xl font-extrabold leading-none text-[#40916C] transition-colors duration-300 group-hover:text-[#2D6A4F] md:text-6xl">
        <span ref={elRef}>{count}{stat.suffix}</span>
      </span>
    </div>
  )
}

export default function Sobre() {
  return (
    <section id="sobre" className="bg-white border-t border-ryze-border/30 relative px-6 py-16 lg:px-8 lg:py-36">

      <motion.div
        layout={false}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger12}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">

          {/* Left — text */}
          <motion.div variants={fadeUp} transition={smoothTransition} className="lg:pt-4">
            <span className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-ryze-cta/30" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-ryze-muted/50">
                Nossa missão
              </span>
            </span>

            <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#0A0A0A] md:text-5xl lg:text-[3.5rem]">
              Construímos{' '}
              <span className="bg-gradient-to-r from-ryze-accent to-ryze-cta bg-clip-text text-transparent">
                o futuro
              </span>
              {' '}da saúde digital.
            </h2>

            <p className="mt-9 text-base lg:text-[17px] leading-relaxed text-ryze-muted">
              Somos uma agência digital especializada no setor de saúde. Nascemos
              da convicção de que clínicas, consultórios e profissionais da saúde
              merecem tecnologia tão precisa quanto o trabalho que realizam.
            </p>

            <p className="mt-5 text-base lg:text-[17px] leading-relaxed text-ryze-muted">
              Combinamos design de alto nível, desenvolvimento ágil e um
              entendimento profundo do mercado para criar soluções que realmente
              fazem diferença.
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 h-px w-24 origin-left bg-gradient-to-r from-ryze-cta/40 to-transparent"
            />
          </motion.div>

          {/* Right — editorial stats */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="flex flex-col gap-0">
              {stats.map((stat, i) => (
                <StatRow key={stat.label} stat={stat} isLast={i === stats.length - 1} />
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
