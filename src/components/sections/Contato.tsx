'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import { fadeUp, stagger10, smoothTransition } from '@/lib/animations'

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#40916C]/60 focus:bg-white/[0.08] focus:shadow-md focus:shadow-[#40916C]/[0.04]'

export default function Contato() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    const data = {
      name: fd.get('name'),
      whatsapp: fd.get('whatsapp'),
      revenue: fd.get('revenue'),
      patientsPerMonth: fd.get('patientsPerMonth'),
      hasSite: fd.get('hasSite'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="bg-[#0A0A0A] relative px-6 py-16 lg:px-8 lg:py-36">

      <motion.div
        layout={false}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger10}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left — info */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="lg:pt-10"
          >
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              Vamos conversar
            </span>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Solicite seu{' '}
              <span className="text-[#40916C]">diagnóstico gratuito.</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/50">
              Em minutos preenchemos seu perfil. Você recebe uma proposta personalizada — sem compromisso, sem letras miúdas.
            </p>

            {/* Urgency badge */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#40916C]/30 bg-[#40916C]/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#40916C] animate-pulse" />
              <span className="text-sm font-medium text-[#40916C]">
                Apenas <strong>3 vagas abertas</strong> este mês
              </span>
            </div>

          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-8 md:p-10"
          >
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 py-16 text-center">
                <CheckCircle size={48} className="text-ryze-cta" />
                <h3 className="font-display text-2xl font-bold text-white">Tudo certo!</h3>
                <p className="text-white/60">Entraremos em contato via WhatsApp nas próximas horas.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm font-medium text-ryze-cta hover:text-ryze-accent transition-colors">
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/60">Nome completo *</label>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Seu nome completo" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-white/60">WhatsApp *</label>
                  <input id="whatsapp" name="whatsapp" type="tel" required autoComplete="tel" inputMode="tel" placeholder="(00) 00000-0000" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="revenue" className="mb-2 block text-sm font-medium text-white/60">Faturamento mensal aproximado *</label>
                  <input id="revenue" name="revenue" type="text" required inputMode="text" placeholder="Ex: R$10.000 / mês" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="patientsPerMonth" className="mb-2 block text-sm font-medium text-white/60">Clientes / pacientes por mês *</label>
                  <input id="patientsPerMonth" name="patientsPerMonth" type="text" required inputMode="numeric" placeholder="Ex: 40 pacientes por mês" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="hasSite" className="mb-2 block text-sm font-medium text-white/60">Já tem ou já teve um site? *</label>
                  <select
                    id="hasSite"
                    name="hasSite"
                    required
                    defaultValue=""
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="Sim, tenho site ativo">Sim, tenho site ativo</option>
                    <option value="Tive, mas está fora do ar">Tive, mas está fora do ar</option>
                    <option value="Nunca tive um site">Nunca tive um site</option>
                  </select>
                </div>

                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={16} /> Erro ao enviar. Tente novamente.
                  </motion.div>
                )}

                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={status === 'loading'}
                  className="group mt-2 w-full inline-flex items-center justify-center gap-2 bg-ryze-cta text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-ryze-cta/90 hover:shadow-xl hover:shadow-ryze-cta/10 hover:scale-[1.01] disabled:opacity-60 disabled:pointer-events-none"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                  ) : (
                    <>Quero meu diagnóstico gratuito <Send size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" /></>
                  )}
                </MagneticButton>

                <p className="text-center text-xs text-white/30">Resposta garantida em até 24h úteis</p>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
