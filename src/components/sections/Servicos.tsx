'use client'

import { useEffect, useRef } from 'react'
import { Globe, LayoutDashboard, Cog, ArrowRight, TrendingUp, Clock, Shield } from 'lucide-react'
import { scrollTo } from '@/lib/scrollTo'

const advantages = [
  { icon: Globe,          title: 'Presença que converte',       description: 'Sites e SmartPages desenhados para transformar visitantes em pacientes — não só para existir na internet.' },
  { icon: LayoutDashboard,title: 'Tudo integrado',              description: 'Agendamento, captação e automações no mesmo lugar. Chega de ferramentas soltas que não conversam entre si.' },
  { icon: TrendingUp,     title: 'Mais pacientes, menos esforço',description: 'Sua SmartPage qualifica e agenda automaticamente. Você foca no que sabe fazer — cuidar de pessoas.' },
  { icon: Clock,          title: 'Entrega em ~2 semanas',       description: 'Do briefing ao lançamento sem meses de espera. Processo ágil, revisões incluídas, prazo cumprido.' },
  { icon: Shield,         title: 'Especialistas em saúde',      description: 'Não atendemos qualquer nicho. Conhecemos profundamente o mercado de saúde e o que funciona nele.' },
  { icon: Cog,            title: 'Suporte contínuo',            description: 'Não sumimos após a entrega. Ficamos do seu lado para ajustes, dúvidas e evoluções do seu projeto.' },
]

// Lightweight IntersectionObserver hook para CSS reveal
function useReveal(selector: string) {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [selector])
}

export default function Servicos() {
  useReveal('.servicos-reveal')

  return (
    <section id="servicos" className="relative bg-ryze-dark px-6 py-16 lg:px-16 lg:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-ryze-forest/40 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="reveal servicos-reveal text-center mb-10 lg:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-4 block">
            POR QUE ESCOLHER A RYZE
          </span>
          <h2 className="font-display font-black text-white text-3xl lg:text-6xl leading-[0.95] tracking-tight uppercase">
            Com a nossa ajuda,<br />
            <span className="text-[#40916C]">destacar-se<br />será inevitável.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages.map((item, i) => (
            <div
              key={item.title}
              className="reveal servicos-reveal group relative rounded-2xl border border-white/8 bg-white/[0.04] p-5 sm:p-7 hover:border-ryze-green/40 hover:bg-white/[0.07] transition-all duration-300 cursor-default"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ryze-green/30 bg-ryze-green/10 text-ryze-green group-hover:bg-ryze-green/20 group-hover:border-ryze-green/50 transition-all duration-300">
                <item.icon size={20} />
              </div>
              <h3 className="font-display font-black text-white text-lg uppercase tracking-tight mb-2 group-hover:text-ryze-green transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                {item.description}
              </p>
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-ryze-green/0 to-transparent group-hover:via-ryze-green/40 transition-all duration-500" />
            </div>
          ))}
        </div>

        <div className="reveal servicos-reveal mt-16 text-center" style={{ animationDelay: '200ms' }}>
          <button
            type="button"
            onClick={() => scrollTo('#contato')}
            className="group inline-flex items-center gap-2 rounded-full border border-ryze-green/40 bg-ryze-green/10 px-8 py-4 text-sm font-semibold text-ryze-green transition-all duration-300 hover:bg-ryze-green hover:text-white hover:border-ryze-green hover:shadow-[0_0_30px_rgba(64,145,108,0.3)]"
          >
            Quero crescer com inteligência
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
