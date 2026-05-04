import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Diferenciais from '@/components/sections/Diferenciais'
import Processo from '@/components/sections/Processo'
import Portfolio from '@/components/sections/Portfolio'
import Sobre from '@/components/sections/Sobre'
import Contato from '@/components/sections/Contato'
import Footer from '@/components/layout/Footer'
import StickyCtaBar from '@/components/ui/StickyCtaBar'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function Home() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-xl focus:bg-ryze-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <Hero />
      <Marquee />
      <Diferenciais />
      <Processo />
      <Portfolio />
      <Sobre />
      <Contato />
      <Footer />
      <StickyCtaBar />
      <WhatsAppButton />
    </>
  )
}
