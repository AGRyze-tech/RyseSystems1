'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useCountUp } from '@/lib/hooks/useCountUp'

function parseResult(value: string) {
  const m = value.match(/^([+]?)(\d+)([%x]*)$/)
  return { prefix: m?.[1] ?? '', number: parseInt(m?.[2] ?? '0'), suffix: m?.[3] ?? '' }
}

function ResultNumber({ value, className }: { value: string; className: string }) {
  const { prefix, number, suffix } = parseResult(value)
  const { count, elRef } = useCountUp(number, 1800)
  return <span ref={elRef} className={className}>{prefix}{count}{suffix}</span>
}

const featured = {
  number: '01',
  title: 'Clarissa Cunha',
  category: 'Landing Page',
  tags: 'UI DESIGN | SEO | NUTRIÇÃO',
  result: '+180%',
  resultLabel: 'leads orgânicos em 60 dias',
  description: 'Landing page para nutricionista com foco em captação e agendamento.',
  url: 'https://clarissacunhanutricionista.com.br',
  screenshot: '/portfolio-clarissa.webp',
}

const others = [
  {
    number: '02',
    title: 'Mayara Della Costa',
    category: 'Landing Page',
    tags: 'UI DESIGN | CONVERSÃO',
    result: '3x',
    resultLabel: 'agendamentos no 1º mês',
    url: 'https://mayaradellacosta.com.br',
    screenshot: '/portfolio-mayara.webp',
  },
  {
    number: '03',
    title: 'Simone Ramaldes',
    category: 'Landing Page',
    tags: 'UI DESIGN | NUTRIÇÃO',
    result: '60%',
    resultLabel: 'redução no tempo administrativo',
    url: 'https://simoneramaldesnutri.com.br',
    screenshot: '/portfolio-simone.webp',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-ryze-dark px-6 py-24 lg:px-16 lg:py-32 overflow-hidden">

      <div className="pointer-events-none absolute inset-0">
        <div className="hidden sm:block absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-[#40916C]/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#40916C] mb-5 block">
            <span className="h-1.5 w-1.5 rounded-full bg-[#40916C] inline-block" />
            Case em destaque
          </span>
          <h2 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2rem,7vw,6rem)] text-white">
            Transformamos<br />
            <span className="text-[#40916C]">saúde em resultados.</span>
          </h2>
        </motion.div>

        {/* Card destaque — largura total */}
        <a href={featured.url} target="_blank" rel="noopener noreferrer" className="block">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-2xl mb-4 h-[300px] sm:h-[380px] lg:h-[480px]"
          >
            {/* Background visual — screenshot WebP */}
            <div className="absolute inset-0">
              <Image
                src={featured.screenshot}
                alt={`Preview do site ${featured.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0A0A0A]/50 group-hover:bg-[#0A0A0A]/30 transition-all duration-500" />

            {/* Glow hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-[#40916C]/20 blur-[100px]" />
            </div>

            {/* Tags — topo esquerdo */}
            <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-10 max-w-[55%]">
              <span className="inline-flex items-center gap-2 bg-black/30 border border-white/10 rounded-full px-3 sm:px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 sm:backdrop-blur-sm truncate">
                <span className="h-1.5 w-1.5 rounded-full bg-[#40916C] shrink-0" />
                {featured.tags}
              </span>
            </div>

            {/* Botão seta — topo direito */}
            <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-10">
              <div
                title="Visitar site"
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-white/20 bg-white/[0.04] sm:backdrop-blur-sm flex items-center justify-center group-hover:bg-[#40916C] group-hover:border-[#40916C] transition-all duration-300"
              >
                <ArrowUpRight size={16} className="text-white/60 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>

            {/* Desktop: resultado em destaque — centro direito */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right hidden sm:block z-10">
              <p className="font-display font-black text-[#74C69D] text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight drop-shadow-[0_0_20px_rgba(116,198,157,0.4)]">
                <ResultNumber value={featured.result} className="" />
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mt-2 max-w-[180px] ml-auto leading-relaxed">
                {featured.resultLabel}
              </p>
            </div>

            {/* Barra inferior: título + resultado mobile — layout flex sem sobreposição */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-5 sm:px-7 pb-5 sm:pb-7 pt-12 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent">
              <div className="flex items-end justify-between gap-3">
                {/* Título e categoria */}
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-1.5">
                    Projeto
                  </span>
                  <h3 className="font-display font-black uppercase tracking-tight leading-tight text-white">
                    <span className="block text-base sm:text-3xl lg:text-5xl">{featured.title}</span>
                    <span className="text-[#40916C] text-xs sm:text-2xl lg:text-3xl">— {featured.category}</span>
                  </h3>
                </div>
                {/* Resultado — visível só no mobile (desktop usa centro direito acima) */}
                <div className="text-right shrink-0 sm:hidden">
                  <p className="font-display font-black text-[#74C69D] text-2xl leading-none tracking-tight drop-shadow-[0_0_12px_rgba(116,198,157,0.4)]">
                    <ResultNumber value={featured.result} className="" />
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/70 mt-1 max-w-[90px] ml-auto leading-relaxed">
                    {featured.resultLabel}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </a>

        {/* Label outros projetos */}
        <div className="mb-4 mt-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
            Outros projetos
          </span>
        </div>

        {/* Grid — 1 coluna mobile, 2 colunas desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {others.map((project, i) => (
            <a key={project.number} href={project.url} target="_blank" rel="noopener noreferrer" className="block flex-1 h-full">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl h-[220px] sm:h-[260px] lg:h-[300px]"
              >
                {/* Background visual — screenshot WebP */}
                <div className="absolute inset-0">
                  <Image
                    src={project.screenshot}
                    alt={`Preview do site ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 576px"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-[#0A0A0A]/50 group-hover:bg-[#0A0A0A]/30 transition-all duration-500" />

                {/* Glow hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[300px] rounded-full bg-[#40916C]/20 blur-[80px]" />
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 max-w-[55%]">
                  <span className="inline-flex items-center gap-1.5 bg-black/30 border border-white/10 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 sm:backdrop-blur-sm truncate">
                    <span className="h-1 w-1 rounded-full bg-[#40916C] shrink-0" />
                    {project.tags}
                  </span>
                </div>

                {/* Botão seta */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
                  <div
                    title="Visitar site"
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-white/20 bg-white/[0.04] sm:backdrop-blur-sm flex items-center justify-center group-hover:bg-[#40916C] group-hover:border-[#40916C] transition-all duration-300"
                  >
                    <ArrowUpRight size={14} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Resultado — visível em todos os tamanhos */}
                <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-right z-10">
                  <p className="font-display font-black text-[#74C69D] text-2xl sm:text-4xl lg:text-5xl leading-none tracking-tight drop-shadow-[0_0_12px_rgba(116,198,157,0.4)]">
                    <ResultNumber value={project.result} className="" />
                  </p>
                  <p className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.15em] text-white/70 mt-1.5 max-w-[90px] sm:max-w-[140px] ml-auto leading-relaxed">
                    {project.resultLabel}
                  </p>
                </div>

                {/* Info inferior — max-w-[55%] evita sobreposição com resultado */}
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 max-w-[55%]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 block mb-1">
                    Projeto
                  </span>
                  <h3 className="font-display font-black uppercase tracking-tight leading-tight text-white group-hover:text-[#40916C] transition-colors duration-300">
                    <span className="block text-sm sm:text-xl lg:text-2xl">{project.title}</span>
                    <span className="text-[#40916C]/70 group-hover:text-white/70 text-xs sm:text-base transition-colors duration-300">
                      — {project.category}
                    </span>
                  </h3>
                </div>
              </motion.div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
