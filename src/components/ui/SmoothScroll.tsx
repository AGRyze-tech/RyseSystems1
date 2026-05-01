'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    // Touch devices have superior native scroll (momentum, rubber-banding) — keep it
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let frameId: number

    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    // Expose lenis on window so scrollTo utility can use it
    ;(window as unknown as Record<string, unknown>).__lenis = lenis

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      delete (window as unknown as Record<string, unknown>).__lenis
    }
  }, [])

  return null
}
