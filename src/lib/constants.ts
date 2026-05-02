export const CONTACT_EMAIL = 'agenciaaryze@gmail.com'
const WHATSAPP_NUMBER = '5521988093948'
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vim pelo site da RyzeSystems e gostaria de saber mais.')}`

export const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Processo', href: '#processo' },
  { label: 'Contato', href: '#contato' },
] as const

export const footerLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Processo', href: '#processo' },
  { label: 'Contato', href: '#contato' },
] as const

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/ryze.systems/' },
  { label: 'WhatsApp', href: WHATSAPP_HREF },
] as const
