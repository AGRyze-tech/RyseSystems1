import { useEffect, useRef, useState } from 'react'

/**
 * Returns true once the user scrolls past (thresholdRatio * viewport height).
 * Caches innerHeight in a ref so scroll handler never forces layout.
 */
export function useScrollVisible(thresholdRatio: number): boolean {
  const [visible, setVisible] = useState(false)
  const threshold = useRef(0)

  useEffect(() => {
    const updateThreshold = () => {
      threshold.current = window.innerHeight * thresholdRatio
    }
    updateThreshold()

    const onScroll = () => {
      const next = window.scrollY > threshold.current
      setVisible(prev => (prev === next ? prev : next))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateThreshold, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateThreshold)
    }
  }, [thresholdRatio])

  return visible
}
