# RyzeSystems — Contexto do Projeto

Agência digital especializada no setor de saúde. Este é o site institucional + landing page de captação da própria RyzeSystems.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS com tema customizado
- Framer Motion para animações
- Lucide React para ícones
- Supabase para formulário de contato (tabela `leads`)

## Estrutura de Arquivos
```
app/
  layout.tsx         ← font imports, metadata global
  page.tsx           ← importa todas as seções em ordem
  api/contact/route.ts
components/
  layout/
    Navbar.tsx
    Footer.tsx
  sections/
    Hero.tsx
    Sobre.tsx
    Servicos.tsx
    Processo.tsx
    Diferenciais.tsx
    Contato.tsx
lib/
  supabase.ts
public/
  logo.svg
tailwind.config.ts
CLAUDE.md
```

## Paleta de Cores
```
--bg:      #0A0F1E   (fundo principal)
--surface: #0F1729   (cards, surfaces)
--blue:    #3B82F6   (accent primário, CTAs)
--cyan:    #06B6D4   (accent secundário, gradientes)
--border:  #1E293B   (bordas e divisores)
--text:    #F8FAFC   (texto principal)
--muted:   #94A3B8   (texto secundário)
```

No tailwind.config.ts estão mapeadas como `ryze.bg`, `ryze.surface`, `ryze.blue`, `ryze.cyan`, `ryze.border`.

## Tipografia
- **Display / Títulos:** Syne (Google Fonts) — `font-display`
- **Body / Textos:** DM Sans (Google Fonts) — `font-body`
- **Mono / Labels técnicos:** JetBrains Mono — `font-mono`

## Padrão Visual (manter consistente em todos os componentes)

### Cards
```tsx
className="bg-ryze-surface border border-ryze-border rounded-2xl
           backdrop-blur-md hover:border-ryze-blue/40
           transition-all duration-300 hover:scale-[1.02]"
```

### Glassmorphism
```tsx
className="bg-white/[0.03] border border-white/[0.08]
           backdrop-blur-md rounded-2xl"
```

### Gradiente de texto (headlines)
```tsx
className="bg-gradient-to-r from-white to-ryze-cyan
           bg-clip-text text-transparent"
```

### Botão primário (CTA)
```tsx
className="bg-ryze-blue hover:bg-blue-500 text-white
           px-6 py-3 rounded-xl font-semibold
           transition-all duration-200 hover:shadow-lg
           hover:shadow-ryze-blue/25"
```

### Botão secundário
```tsx
className="border border-ryze-border hover:border-ryze-blue/60
           text-white px-6 py-3 rounded-xl font-semibold
           transition-all duration-200"
```

## Animações (Framer Motion)

### Padrão de entrada (usar em todos os componentes)
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Wrapper da seção
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
  variants={fadeUp}
>
```

### Stagger para listas de cards
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
```

## Seções (ordem no page.tsx)
1. `<Navbar />` — sticky, blur ao scroll
2. `<Hero />` — id="hero"
3. `<Sobre />` — id="sobre"
4. `<Servicos />` — id="servicos"
5. `<Processo />` — id="processo"
6. `<Diferenciais />` — id="diferenciais"
7. `<Contato />` — id="contato"
8. `<Footer />`

## Copy de Referência

### Hero
- Headline: "Tecnologia que transforma como a saúde opera."
- Subheadline: "Criamos sites, sistemas e SmartPages para clínicas e profissionais de saúde que querem crescer com inteligência."
- CTA principal: "Começar agora" → scroll para #contato
- CTA secundário: "Ver serviços" → scroll para #servicos
- Métricas: "12+ clientes atendidos" · "3 produtos" · "Entrega em semanas"

### Serviços (3 cards)
- **Sites** — "Presença digital que converte" — Sites institucionais e landing pages com design premium, otimizados para SEO e para o fluxo do seu negócio de saúde.
- **SmartPages** — "Uma página. Um sistema completo." — Combinamos site e sistema em uma solução integrada: agendamento, captação, automações — tudo no mesmo lugar.
- **Sistemas** — "Tecnologia sob medida" — Integrações e sistemas customizados para as necessidades operacionais da sua clínica ou consultório.

### Processo (4 etapas)
1. Diagnóstico — Entendemos seu negócio, público e objetivos
2. Proposta — Solução com escopo e prazo claros
3. Desenvolvimento — Construímos com agilidade, você acompanha
4. Entrega + Suporte — Lançamos, treinamos e ficamos do seu lado

### Diferenciais (6 cards)
- Especialistas em saúde
- Entrega rápida
- Design de alto nível
- Stack moderna
- Foco em conversão
- Parceria contínua

### Contato
- Título: "Pronto para elevar seu negócio de saúde?"
- Sub: "Fale com a gente. Sem compromisso."
- Campos: Nome · E-mail · WhatsApp · Tipo de projeto (dropdown) · Mensagem

## Regras Gerais
- Todo componente com animação usa `'use client'`
- Responsivo mobile-first — breakpoints principais: `md:` e `lg:`
- Navbar mobile: hamburger com drawer animado
- Formulário: POST para `/api/contact` → salva em tabela `leads` no Supabase
- Imagens: sempre `next/image` com `lazy` loading
- Sem bibliotecas de UI (sem shadcn, sem MUI) — tudo Tailwind puro
- Acessibilidade: aria-labels nos botões, contraste adequado, focus-visible
