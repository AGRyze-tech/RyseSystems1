'use client'

import { useRef, useEffect, useState } from 'react'

// Rule js-cache-function-results: uses requestAnimationFrame instead of
// setInterval — synced to display refresh rate (60fps), no drift, and
// includes ease-out curve for a natural deceleration feel.
export function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const elRef = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (target === 0) return
    const el = elRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const startTime = performance.now()

          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Cubic ease-out: decelerates as it approaches the target
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate)
            } else {
              setCount(target)
              rafRef.current = null
            }
          }

          rafRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return { count, elRef }
}
