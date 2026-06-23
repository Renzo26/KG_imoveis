import type { ReactNode } from 'react'

/** Wrapper das páginas. Sem animação de troca — a animação fica só no carregamento inicial (IntroLoader). */
export default function PageTransition({ children }: { children: ReactNode }) {
  return <main>{children}</main>
}
