'use client'

import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  tiltStrength?: number
}

export default function TiltCard({ children, className = '', tiltStrength = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(y * -tiltStrength)
    rotateY.set(x * tiltStrength)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  // Touch devices: render plain div — zero JS overhead
  if (isTouch) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
