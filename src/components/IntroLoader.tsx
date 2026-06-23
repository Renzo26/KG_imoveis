import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const SEEN_KEY = 'kg-intro-seen'

/**
 * Animação de entrada do site (GSAP). Cobre a tela na primeira visita,
 * revela a marca e sai com um wipe vertical. Chama `onDone` ao finalizar.
 */
export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  const [show] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SEEN_KEY) !== '1'
  })

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }

    // Trava one-shot: o StrictMode (dev) monta o efeito duas vezes; sem isto a
    // animação tocaria 2×. Garante uma única execução por sessão.
    if (started.current) return
    started.current = true

    sessionStorage.setItem(SEEN_KEY, '1')

    gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: onDone,
      })

      tl.set('.intro__word', { yPercent: 110 })
        .set('.intro__line', { scaleX: 0 })
        .to('.intro__word', { yPercent: 0, duration: 1, stagger: 0.08 }, 0.2)
        .to('.intro__line', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.5)
        .to('.intro__meta', { opacity: 1, y: 0, duration: 0.7 }, 0.9)
        .to({}, { duration: 0.5 })
        .to('.intro__content', { yPercent: -8, opacity: 0, duration: 0.7 }, '>-0.1')
        .to(
          root.current,
          { yPercent: -100, duration: 0.9, ease: 'power4.inOut' },
          '>-0.3',
        )
    }, root)
  }, [show, onDone])

  if (!show) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-paper"
      aria-hidden="true"
    >
      <div className="intro__content shell text-center">
        <div className="overflow-hidden">
          <h1 className="intro__word font-serif text-[14vw] leading-none text-paper md:text-[8vw]">
            KG Imóveis
          </h1>
        </div>
        <div className="intro__line mx-auto mt-6 h-px w-40 origin-left bg-bronze md:w-64" />
        <p className="intro__meta mt-6 translate-y-3 text-xs uppercase tracking-[0.3em] text-stone-light opacity-0">
          Santo André · desde 2004
        </p>
      </div>
    </div>
  )
}
