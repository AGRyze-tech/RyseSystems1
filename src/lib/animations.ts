import type { Variants, Transition } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export const stagger = (delay = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
}

// Pre-built stagger variants to avoid new-object-per-render
export const stagger08 = stagger(0.08)
export const stagger10 = stagger()
export const stagger12 = stagger(0.12)
export const stagger15 = stagger(0.15)
