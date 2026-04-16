'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico gratuito',
    description: 'Nossa equipe entra em contato pelo WhatsApp para entender seu negócio, seus objetivos e o que está travando seu crescimento digital.',
  },
  {
    number: '02',
    title: 'Reunião de briefing',
    description: 'Mergulhamos fundo no seu mercado, público e referências. Saímos dessa reunião com tudo que precisamos para construir sua solução.',
  },
  {
    number: '03',
    title: 'Proposta e aprovação',
    description: 'Apresentamos escopo, prazo e investimento de forma clara. Sem letras miúdas, sem surpresas. Você aprova e a gente começa.',
  },
  {
    number: '04',
    title: 'Desenvolvimento',
    description: 'Construímos com agilidade e você acompanha cada etapa em tempo real. Revisões incluídas até você estar 100% satisfeito.',
  },
  {
    number: '05',
    title: 'Entrega e lançamento',
    description: 'Publicamos, configuramos tudo e treinamos sua equipe. Do briefing ao ar em média 2 semanas. Suporte contínuo após o lançamento.',
  },
]

const SPRING_STEP = { stiffness: 80, damping: 25, restDelta: 0.001 } as const
const SPRING_LINE = { stiffness: 100, damping: 28, restDelta: 0.001 } as const

function StepItem({
  step,
  index,
  stepRef,
  sectionProgress,
}: {
  step: typeof steps[0]
  index: number
  stepRef: React.RefObject<HTMLDivElement | null>
  sectionProgress: MotionValue<number>
}) {
  const n = steps.length

  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ['start 90%', 'center 55%'],
  })

  const smoothProgress = useSpring(scrollYProgress, SPRING_STEP)

  const lineRaw = useTransform(
    sectionProgress,
    [index / n, (index + 1) / n],
    [0, 1]
  )
  const smoothLine = useSpring(lineRaw, SPRING_LINE)
  const lineHeight = useTransform(smoothLine, [0, 1], ['0%', '100%'])

  const opacity = useTransform(smoothProgress, [0, 0.4, 1], [0.2, 0.6, 1])
  const circleColor = useTransform(smoothProgress, [0, 0.5, 1], ['rgba(255,255,255,0.05)', 'rgba(40,100,70,0.6)', '#40916C'])
  const borderColor = useTransform(smoothProgress, [0, 0.5, 1], ['rgba(255,255,255,0.15)', 'rgba(64,145,108,0.5)', '#40916C'])
  const circleGlow = useTransform(smoothProgress, [0, 0.5, 1], [
    '0 0 0px rgba(64,145,108,0)',
    '0 0 12px rgba(64,145,108,0.3)',
    '0 0 20px rgba(64,145,108,0.5), 0 0 40px rgba(64,145,108,0.15)',
  ])
  const numberScale = useTransform(smoothProgress, [0, 1], [0.7, 1])
  const contentX = useTransform(smoothProgress, [0, 1], [16, 0])
  const labelOpacity = useTransform(smoothProgress, [0.3, 1], [0, 1])
  const labelX = useTransform(smoothProgress, [0.3, 1], [-16, 0])
  const descriptionOpacity = useTransform(smoothProgress, [0, 0.6, 1], [0.1, 0.3, 0.6])

  return (
    <div ref={stepRef} className="relative grid grid-cols-[80px_1fr] lg:grid-cols-[1fr_80px_1fr] gap-0 min-h-[160px] lg:min-h-[200px]">

      {/* Left — label desktop */}
      <div className="hidden lg:flex items-start justify-end pr-10 pt-1">
        <motion.span
          style={{ opacity: labelOpacity, x: labelX }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-white/25 mt-2"
        >
          Etapa {step.number}
        </motion.span>
      </div>

      {/* Center — linha + número */}
      <div className="flex flex-col items-center relative">
        {index > 0 ? (
          <div className="w-px flex-none h-8 bg-white/10" />
        ) : (
          <div className="h-8" />
        )}

        {/* Círculo */}
        <motion.div
          style={{ backgroundColor: circleColor, borderColor: borderColor, boxShadow: circleGlow }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 z-10"
        >
          <motion.span
            style={{ opacity, scale: numberScale }}
            className="font-mono text-xs font-bold text-white"
          >
            {step.number}
          </motion.span>
        </motion.div>

        {/* Linha abaixo — preenche conforme scroll do próximo step */}
        {index < steps.length - 1 && (
          <div className="relative w-px flex-1 min-h-[120px]">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[5px] rounded-full bg-[#40916C]/30 blur-[3px]"
            />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#40916C] to-[#2D6A4F]"
            />
          </div>
        )}
      </div>

      {/* Right — conteúdo */}
      <div className="pl-8 pb-10 lg:pb-16 pt-1">
        <motion.div style={{ opacity, x: contentX }}>
          <motion.h3
            className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight text-white"
          >
            {step.title}
          </motion.h3>
          <motion.p
            style={{ opacity: descriptionOpacity }}
            className="mt-3 text-sm lg:text-base leading-relaxed max-w-md text-white"
          >
            {step.description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default function Processo() {
  const stepRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
    steps.map(() => React.createRef<HTMLDivElement>())
  )
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 30%'],
  })

  return (
    <section ref={sectionRef} id="processo" className="relative bg-[#0A1A0F] px-6 py-24 lg:px-16 lg:py-32 overflow-hidden">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#1B4332]/30 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Header — sticky style */}
        <div className="mb-12 lg:mb-20 lg:grid lg:grid-cols-[1fr_80px_1fr] lg:gap-0">
          <div className="lg:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/30 mb-4 block">
                CONHEÇA AS ETAPAS DO PROCESSO
              </span>
              <h2 className="font-display font-black text-white text-3xl lg:text-5xl leading-[0.95] tracking-tight uppercase">
                Após solicitar seu{' '}
                <span className="text-[#40916C]">diagnóstico gratuito</span>
              </h2>
            </motion.div>
          </div>
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => (
            <StepItem
              key={step.number}
              step={step}
              index={i}
              stepRef={stepRefs.current[i]}
              sectionProgress={sectionProgress}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
