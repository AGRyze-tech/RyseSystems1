'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false })
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false })

export default function ClientShell() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
    </>
  )
}
