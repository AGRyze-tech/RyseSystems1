'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const featured = {
  number: '01',
  title: 'Clarissa Cunha',
  category: 'Landing Page',
  tags: 'UI DESIGN | SEO | NUTRIÇÃO',
  result: '+180%',
  resultLabel: 'leads orgânicos em 60 dias',
  description: 'Landing page para nutricionista com foco em captação e agendamento.',
  bg: 'from-[#0D2818] via-[#1B4332] to-[#0A1A0F]',
  url: 'https://clarissacunhanutricionista.com.br',
}

const others = [
  {
    number: '02',
    title: 'Mayara Della Costa',
    category: 'Landing Page',
    tags: 'UI DESIGN | CONVERSÃO',
    result: '3x',
    resultLabel: 'agendamentos no 1º mês',
    bg: 'from-[#0A1A0F] via-[#162219] to-[#0D2818]',
    url: 'https://mayaradellacosta.com.br',
  },
  {
    number: '03',
    title: 'Simone Ramaldes',
    category: 'Landing Page',
    tags: 'UI DESIGN | NUTRIÇÃO',
    result: '60%',
    resultLabel: 'redução no tempo administrativo',
    bg: 'from-[#162219] via-[#0A1A0F] to-[#1B4332]',
    url: 'https://simoneramaldesnutri.com.br',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-[#0A1A0F] px-6 py-24 lg:px-16 lg:py-32 overflow-hidden">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-[#40916C]/10 blur-[130px]" />
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
          <h2 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.8rem,6vw,6rem)] text-white">
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
            className="group relative overflow-hidden rounded-2xl mb-4 h-[280px] sm:h-[380px] lg:h-[480px]"
          >
            {/* Iframe preview */}
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src={featured.url}
                className="w-[200%] h-[200%] border-0 pointer-events-none scale-50 origin-top-left"
                loading="lazy"
                title={featured.title}
                sandbox="allow-scripts allow-same-origin"
              />
              {/* Overlay escuro sobre o iframe */}
              <div className="absolute inset-0 bg-[#0A1A0F]/50 group-hover:bg-[#0A1A0F]/30 transition-all duration-500" />
            </div>

            {/* Glow hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-[#40916C]/20 blur-[100px]" />
            </div>

            {/* Tags — topo esquerdo */}
            <div className="absolute top-7 left-7 z-10">
              <span className="inline-flex items-center gap-2 bg-black/30 border border-white/10 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#40916C]" />
                {featured.tags}
              </span>
            </div>

            {/* Botão seta — topo direito */}
            <div className="absolute top-7 right-7 z-10">
              <div title="Visitar site" className="h-11 w-11 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center group-hover:bg-[#40916C] group-hover:border-[#40916C] transition-all duration-300">
                <ArrowUpRight size={18} className="text-white/60 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>

            {/* Resultado em destaque — centro direito */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right hidden sm:block">
              <p className="font-display font-black text-[#40916C] text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight">
                {featured.result}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mt-2 max-w-[180px] ml-auto leading-relaxed">
                {featured.resultLabel}
              </p>
            </div>

            {/* Info — parte inferior esquerda */}
            <div className="absolute bottom-7 left-7 z-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2">
                Projeto
              </span>
              <h3 className="font-display font-black uppercase text-xl sm:text-3xl lg:text-5xl text-white tracking-tight leading-tight">
                {featured.title}
                <span className="text-[#40916C] ml-3 text-2xl lg:text-3xl">— {featured.category}</span>
              </h3>
            </div>

            {/* Resultado mobile — só visível em mobile */}
            <div className="absolute bottom-7 right-7 z-10 sm:hidden text-right">
              <p className="font-display font-black text-[#40916C] text-3xl leading-none tracking-tight">{featured.result}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mt-1">{featured.resultLabel}</p>
            </div>
          </motion.div>
        </a>

        {/* Label outros projetos */}
        <div className="mb-4 mt-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
            Outros projetos
          </span>
        </div>

        {/* Grid 2 colunas */}
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
                {/* Iframe preview */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <iframe
                    src={project.url}
                    className="w-full h-full border-0 pointer-events-none"
                    style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }}
                    loading="lazy"
                    title={project.title}
                    sandbox="allow-scripts allow-same-origin"
                  />
                  <div className="absolute inset-0 bg-[#0A1A0F]/50 group-hover:bg-[#0A1A0F]/30 transition-all duration-500" />
                </div>

                {/* Glow hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[300px] rounded-full bg-[#40916C]/20 blur-[80px]" />
                </div>

                {/* Tags */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="inline-flex items-center gap-2 bg-black/30 border border-white/10 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-sm">
                    <span className="h-1 w-1 rounded-full bg-[#40916C]" />
                    {project.tags}
                  </span>
                </div>

                {/* Botão seta */}
                <div className="absolute top-5 right-5 z-10">
                  <div title="Visitar site" className="h-9 w-9 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center group-hover:bg-[#40916C] group-hover:border-[#40916C] transition-all duration-300">
                    <ArrowUpRight size={15} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Resultado */}
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-right hidden sm:block">
                  <p className="font-display font-black text-[#40916C] text-4xl lg:text-5xl leading-none tracking-tight">
                    {project.result}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/35 mt-1.5 max-w-[140px] ml-auto leading-relaxed">
                    {project.resultLabel}
                  </p>
                </div>

                {/* Info inferior */}
                <div className="absolute bottom-5 left-5 z-10">
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/25 block mb-1">
                    Projeto
                  </span>
                  <h3 className="font-display font-black uppercase text-xl lg:text-2xl text-white tracking-tight leading-tight group-hover:text-[#40916C] transition-colors duration-300">
                    {project.title}
                    <span className="text-[#40916C]/70 group-hover:text-white/70 text-base ml-2 transition-colors duration-300">— {project.category}</span>
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
