'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const smoothX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const smoothY = useSpring(cursorY, { stiffness: 150, damping: 20 })

  const [state, setState] = useState<'default' | 'pointer' | 'text'>('default')
  const [cursorText, setCursorText] = useState('')
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const visibleRef = useRef(false)
  const [visible, setVisible] = useState(false)
  const stateRef = useRef<'default' | 'pointer' | 'text'>('default')
  const cursorTextRef = useRef('')

  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    setIsTouchDevice(!hasPointer)
    if (!hasPointer) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }
    const onEnter = () => {
      visibleRef.current = true
      setVisible(true)
    }

    const setStateGuarded = (newState: 'default' | 'pointer' | 'text', text = '') => {
      if (newState !== stateRef.current || text !== cursorTextRef.current) {
        stateRef.current = newState
        cursorTextRef.current = text
        setState(newState)
        setCursorText(text)
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest('[data-cursor]') as HTMLElement | null
      if (el) {
        const type = el.getAttribute('data-cursor')
        if (type === 'text') {
          setStateGuarded('text', el.getAttribute('data-cursor-text') || '')
        } else {
          setStateGuarded('pointer')
        }
      } else if (
        target.closest('a, button, [role="button"], input, select, textarea, label')
      ) {
        setStateGuarded('pointer')
      }
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('[data-cursor], a, button, [role="button"], input, select, textarea, label')
      ) {
        setStateGuarded('default')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [cursorX, cursorY])

  if (isTouchDevice) return null

  // Use scale instead of width/height to stay on GPU compositor
  const scale = state === 'text' ? 1 : state === 'pointer' ? 0.6 : 0.2

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        width: 80,
        height: 80,
        marginLeft: -40,
        marginTop: -40,
      }}
    >
      <motion.div
        animate={{
          scale,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="flex h-full w-full origin-center items-center justify-center rounded-full bg-white"
      >
        {state === 'text' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold uppercase tracking-wider text-black mix-blend-normal"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
