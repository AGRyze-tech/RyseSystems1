# RyzeSystems — Contexto do Projeto

Site institucional + landing page de captação da RyzeSystems.
Agência digital especializada no setor de saúde (nutricionistas, psicólogos, clínicas).

## Status atual
- ✅ Site no ar: https://ryse-systems1.vercel.app
- ✅ Deploy automático via Vercel (push na `main` = novo deploy)
- ✅ Formulário de contato funcionando via Resend (RESEND_API_KEY configurada na Vercel)
- ✅ Mobile responsivo corrigido

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 com tema customizado em globals.css (@theme)
- Framer Motion para animações
- Lucide React para ícones
- Resend para envio de email do formulário de contato
- **Sem Supabase** (o formulário envia email, não salva em banco)

## Estrutura de Arquivos
```
src/
  app/
    layout.tsx              ← fonts (Syne, DM Sans, JetBrains Mono), metadata
    page.tsx                ← importa todas as seções em ordem
    globals.css             ← @theme com paleta, keyframes, utilitários
    api/contact/route.ts    ← POST → envia email via Resend
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      Marquee.tsx
      Diferenciais.tsx      ← seção "POR QUE ESCOLHER A RYZE" (fundo branco)
      Processo.tsx          ← timeline animada com scroll
      Portfolio.tsx         ← cards com iframe preview dos clientes
      Sobre.tsx             ← stats com countUp animado
      Contato.tsx           ← formulário de diagnóstico gratuito
    ui/
      TiltCard.tsx
      MagneticButton.tsx
      ClientShell.tsx       ← cursor customizado (desktop only)
  lib/
    animations.ts           ← variants Framer Motion reutilizáveis
    scrollTo.ts
    hooks/
      useCountUp.ts         ← animação de contadores com IntersectionObserver
public/
  logotiporyze.png
  DNA.gif                   ← background animado do Hero
```

## Paleta de Cores (globals.css @theme)
```
/* Seções claras (Diferenciais, Sobre) */
--color-ryze-bg:      #FFFFFF
--color-ryze-surface: #f8fbf9
--color-ryze-mint:    #daf1de
--color-ryze-accent:  #0c4a34
--color-ryze-cta:     #4a8b71
--color-ryze-border:  #d4e5d8
--color-ryze-text:    #0c4a34
--color-ryze-muted:   #5f8872

/* Seções escuras (Hero, Processo, Portfolio, Contato, Footer) */
--color-ryze-dark:         #0A1A0F
--color-ryze-green:        #40916C
--color-ryze-forest:       #1B4332
--color-ryze-forest-hover: #2D6A4F
```

## Tipografia
- **Display / Títulos:** Syne — `font-display` — usar com `font-black uppercase tracking-tight`
- **Body / Textos:** DM Sans — `font-body`
- **Mono / Labels:** JetBrains Mono — `font-mono` — usar em badges, labels técnicos

## Seções (ordem no page.tsx)
1. `<Navbar />` — sticky, blur ao scroll, links: Serviços / Sobre / Processo / Contato
2. `<Hero />` — fundo escuro (#0A1A0F), DNA.gif, headline grande, 2 stat cards, CTA
3. `<Marquee />` — faixa verde (#0c4a34) com palavras-chave animadas
4. `<Diferenciais />` — fundo branco, grid 3 colunas, 6 cards com TiltCard
5. `<Processo />` — fundo escuro, timeline vertical animada com scroll (5 etapas)
6. `<Portfolio />` — fundo escuro, iframe preview dos 3 clientes (Clarissa, Mayara, Simone)
7. `<Sobre />` — fundo branco, texto + 4 stats com countUp (50+, 12+, 3, 20+)
8. `<Contato />` — fundo escuro, formulário de diagnóstico gratuito (5 campos)
9. `<Footer />` — fundo escuro, links, WhatsApp, Instagram

## Formulário de Contato
- Campos: Nome completo, WhatsApp, Faturamento mensal, Pacientes por mês, Já tem site?
- Endpoint: POST `/api/contact`
- Envia email via **Resend** para `agenciaaryze@gmail.com`
- Variáveis de ambiente necessárias na Vercel:
  - `RESEND_API_KEY` — chave da API do Resend
  - `CONTACT_EMAIL` — email destino (agenciaaryze@gmail.com)

## Portfólio (clientes reais)
- Clarissa Cunha — https://clarissacunhanutricionista.com.br — +180% leads orgânicos
- Mayara Della Costa — https://mayaradellacosta.com.br — 3x agendamentos
- Simone Ramaldes — https://simoneramaldesnutri.com.br — 60% redução administrativa

## Padrões de Código

### Animações (usar sempre)
```tsx
import { fadeUp, stagger08, smoothTransition } from '@/lib/animations'

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.05 }}
  variants={stagger08}
>
  <motion.div variants={fadeUp} transition={smoothTransition}>
    ...
  </motion.div>
</motion.div>
```

### Seção escura padrão
```tsx
<section className="relative bg-[#0A1A0F] px-6 py-24 lg:px-16 lg:py-32 overflow-hidden">
```

### Seção clara padrão
```tsx
<section className="relative px-6 py-28 lg:px-8 lg:py-36">
```

### Badge / label de seção
```tsx
<span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
  Label da seção
</span>
```

### Headline grande (seções escuras)
```tsx
<h2 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2rem,6vw,6rem)] text-white">
```

## Regras Gerais
- Todo componente com animação ou hook usa `'use client'`
- Mobile-first — overflow-x: hidden está em html e body (globals.css)
- Cursor customizado ativo só em desktop (`@media (pointer: fine)`) via ClientShell
- `content-visibility: auto` NÃO usar na seção Sobre (quebra o IntersectionObserver do countUp)
- Sem bibliotecas de UI externas — tudo Tailwind puro
- Imagens: sempre `next/image`
- MagneticButton e TiltCard têm efeitos mouse-only — degradam graciosamente no mobile
