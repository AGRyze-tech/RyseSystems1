const words = [
  'Sites',
  'SmartPages',
  'Sistemas',
  'SEO',
  'Landing Pages',
  'Agendamento',
  'Automação',
  'Design Premium',
  'Conversão',
  'Saúde Digital',
  'Performance',
  'Next.js',
]

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-12">
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="flex items-center gap-12">
          <span className="whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.28em] text-white/40 md:text-sm">
            {word}
          </span>
          <span className="h-1 w-1 rounded-full bg-ryze-cta/50" />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden bg-ryze-dark py-[18px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ryze-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ryze-dark to-transparent" />
      <div className="flex animate-marquee gap-12">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  )
}
