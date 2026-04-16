'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  as?: 'button' | 'a'
  strength?: number
  href?: string
  onClick?: (e: React.MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  strength = 0.35,
  href,
  onClick,
  type,
  disabled,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const shared = {
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    style: { x: springX, y: springY },
    className,
    onClick,
  }

  if (as === 'a') {
    return (
      <motion.a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} {...shared}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button ref={ref as React.RefObject<HTMLButtonElement>} type={type} disabled={disabled} {...shared}>
      {children}
    </motion.button>
  )
}
