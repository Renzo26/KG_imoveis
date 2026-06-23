import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import SearchBar from './SearchBar'

// Three.js carregado sob demanda (code-split) para aliviar o bundle inicial.
const ParticleField = lazy(() => import('@/components/three/ParticleField'))

export default function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!start) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero__bg', { scale: 1.18, duration: 2.2, ease: 'power2.out' }, 0)
        .from('.hero__line', { yPercent: 120, duration: 1.1, stagger: 0.12 }, 0.2)
        .from('.hero__kicker', { opacity: 0, y: 20, duration: 0.8 }, 0.4)
        .from('.hero__search', { opacity: 0, y: 40, duration: 1 }, 0.9)
        .from('.hero__scroll', { opacity: 0, duration: 0.8 }, 1.2)
    }, root)
    return () => ctx.revert()
  }, [start])

  return (
    <section ref={root} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Fundo */}
      <div className="hero__bg absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80"
          alt="Residência de alto padrão"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
      </div>

      {/* Partículas Three.js */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      {/* Conteúdo */}
      <div className="shell relative flex h-full flex-col justify-end pb-10">
        <div className="max-w-4xl">
          <div className="overflow-hidden">
            <p className="hero__kicker text-[0.72rem] font-medium uppercase tracking-[0.3em] text-bronze">
              KG Imóveis · Santo André desde 2004
            </p>
          </div>
          <h1 className="mt-6 font-serif text-[13vw] leading-[0.92] text-paper sm:text-[10vw] lg:text-[7.5rem]">
            <span className="block overflow-hidden">
              <span className="hero__line block">O endereço</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero__line block italic text-stone-light">do seu próximo</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero__line block">capítulo.</span>
            </span>
          </h1>
        </div>

        <div className="hero__search mt-12 w-full max-w-5xl">
          <SearchBar />
        </div>

        <div className="hero__scroll mt-10 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-stone-light">
          <span className="h-px w-10 bg-stone-light" />
          Role para explorar
        </div>
      </div>
    </section>
  )
}
