export function scrollTo(href: string) {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as
    | { scrollTo: (target: string) => void }
    | undefined

  if (lenis) {
    lenis.scrollTo(href)
  } else {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}
