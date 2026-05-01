'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { scrollTo } from '@/lib/scrollTo'
import { useScrollVisible } from '@/lib/useScrollVisible'

export default function StickyCtaBar() {
  const visible = useScrollVisible(0.85)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="flex items-center justify-between gap-3 border-t border-ryze-border bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-ryze-muted">
                Pronto para crescer?
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-ryze-muted/60 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-ryze-cta animate-pulse" />
                Apenas 3 vagas este mês
              </span>
            </div>
            <button
              onClick={() => scrollTo('#contato')}
              aria-label="Solicitar proposta gratuita"
              className="inline-flex items-center gap-2 bg-ryze-cta text-white px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-ryze-cta/90 active:scale-95 shrink-0"
            >
              Solicitar proposta
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
