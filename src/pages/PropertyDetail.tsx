import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTransition from '@/components/PageTransition'
import PropertyCard from '@/components/ui/PropertyCard'
import NotFound from './NotFound'
import { useReveal } from '@/lib/scroll'
import { findProperty, PROPERTIES } from '@/data/properties'
import { formatBRL, formatArea } from '@/lib/format'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = id ? findProperty(id) : undefined
  const ref = useReveal([id])
  const [active, setActive] = useState(0)

  if (!property) return <NotFound />
  const p = property

  const specs = [
    p.bedrooms > 0 && { label: 'Dormitórios', value: p.bedrooms },
    p.suites > 0 && { label: 'Suítes', value: p.suites },
    p.bathrooms > 0 && { label: 'Banheiros', value: p.bathrooms },
    p.parking > 0 && { label: 'Vagas', value: p.parking },
    p.builtArea > 0 && { label: 'Área construída', value: formatArea(p.builtArea) },
    p.totalArea > 0 && { label: 'Área total', value: formatArea(p.totalArea) },
  ].filter(Boolean) as { label: string; value: string | number }[]

  const related = PROPERTIES.filter(
    (x) => x.id !== p.id && x.negotiation.some((n) => p.negotiation.includes(n)),
  ).slice(0, 3)

  const inputCls =
    'w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-bronze'

  return (
    <PageTransition>
      <div ref={ref} className="pt-28">
        {/* Breadcrumb */}
        <div className="shell flex flex-wrap items-center gap-2 py-6 text-[0.72rem] uppercase tracking-[0.14em] text-stone">
          <Link to="/" className="hover:text-bronze">
            Início
          </Link>
          <span>/</span>
          <Link to="/imoveis/venda" className="hover:text-bronze">
            Imóveis
          </Link>
          <span>/</span>
          <span className="text-ink">{p.reference}</span>
        </div>

        {/* Galeria */}
        <section className="shell">
          <div className="relative aspect-[16/9] overflow-hidden bg-paper-dark">
            <img src={p.images[active]} alt={p.title} className="h-full w-full object-cover" />
            {p.isLaunch && (
              <span className="absolute left-5 top-5 bg-bronze px-4 py-1.5 text-[0.66rem] uppercase tracking-[0.18em] text-paper">
                Lançamento
              </span>
            )}
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3 md:grid-cols-6">
              {p.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  className={`aspect-[4/3] overflow-hidden transition-opacity ${
                    active === i ? 'ring-2 ring-bronze' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Conteúdo */}
        <section className="shell grid gap-14 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-8">
            <p className="kicker">
              {p.type} · {p.subtype}
            </p>
            <h1 className="reveal mt-3 font-serif text-4xl text-ink md:text-6xl">{p.title}</h1>
            <p className="mt-3 text-stone">
              {p.district}, {p.city} — {p.state} · Ref. {p.reference}
            </p>

            <div className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-2 border-y border-line py-6">
              {p.salePrice && (
                <div>
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-stone">Venda</span>
                  <p className="font-serif text-3xl text-ink">{formatBRL(p.salePrice)}</p>
                </div>
              )}
              {p.rentPrice && (
                <div>
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-stone">Locação</span>
                  <p className="font-serif text-3xl text-ink">
                    {formatBRL(p.rentPrice)}
                    <span className="text-base text-stone"> /mês</span>
                  </p>
                </div>
              )}
              {p.iptu && (
                <div>
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-stone">IPTU</span>
                  <p className="text-lg text-charcoal">{formatBRL(p.iptu)}</p>
                </div>
              )}
            </div>

            {/* Specs */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="border-l-2 border-bronze pl-4">
                  <p className="font-serif text-2xl text-ink">{s.value}</p>
                  <p className="text-[0.72rem] uppercase tracking-[0.12em] text-stone">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Descrição */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl text-ink">Sobre o imóvel</h2>
              <p className="mt-4 leading-relaxed text-charcoal">{p.description}</p>
            </div>

            {/* Características */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl text-ink">Características</h2>
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-charcoal">
                    <span className="h-1 w-1 rounded-full bg-bronze" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mapa (placeholder) */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl text-ink">Localização</h2>
              <div className="mt-5 flex aspect-[16/7] items-center justify-center border border-line bg-paper-dark text-sm text-stone">
                Mapa de {p.district}, {p.city}
              </div>
            </div>
          </div>

          {/* Sidebar: corretor + contato */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="border border-line bg-paper p-7">
                <span className="kicker">Fale com o corretor</span>
                <h3 className="mt-3 font-serif text-2xl text-ink">{p.broker.name}</h3>
                <p className="text-sm text-stone">{p.broker.role}</p>
                <p className="mt-1 text-sm text-stone">{p.broker.creci}</p>

                <div className="mt-5 space-y-2 text-sm">
                  <a
                    href={`https://wa.me/55${p.broker.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block bg-ink px-5 py-4 text-center text-[0.72rem] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-bronze"
                  >
                    WhatsApp {p.broker.whatsapp}
                  </a>
                  <a
                    href={`tel:${p.broker.phone.replace(/\D/g, '')}`}
                    className="block border border-line px-5 py-4 text-center text-[0.72rem] uppercase tracking-[0.18em] text-ink transition-colors hover:border-bronze hover:text-bronze"
                  >
                    Ligar {p.broker.phone}
                  </a>
                </div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-7 space-y-3 border-t border-line pt-7"
                >
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-stone">
                    Obtenha mais informações
                  </p>
                  <input className={inputCls} placeholder="Nome *" required />
                  <input className={inputCls} type="email" placeholder="E-mail *" required />
                  <input className={inputCls} placeholder="Telefone *" required />
                  <textarea className={inputCls} rows={3} placeholder="Mensagem *" required />
                  <button className="w-full bg-bronze px-5 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-bronze-dark">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </section>

        {/* Veja também */}
        {related.length > 0 && (
          <section className="border-t border-line">
            <div className="shell py-20">
              <h2 className="reveal mb-12 font-serif text-3xl text-ink md:text-4xl">Veja também</h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <div key={r.id} className="reveal">
                    <PropertyCard property={r} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
