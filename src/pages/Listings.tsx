import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageTransition from '@/components/PageTransition'
import PageHero from '@/components/ui/PageHero'
import PropertyCard from '@/components/ui/PropertyCard'
import Dropdown, { toOptions, type Option } from '@/components/ui/Dropdown'
import { useReveal } from '@/lib/scroll'
import { PROPERTIES, type Negotiation } from '@/data/properties'
import { BAIRROS, CITIES, PROPERTY_TYPES, SALE_PRICE_RANGES } from '@/data/site'

const META: Record<Negotiation, { kicker: string; title: string; image: string }> = {
  venda: {
    kicker: 'Imóveis à venda',
    title: 'À venda',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80',
  },
  locacao: {
    kicker: 'Imóveis para locação',
    title: 'Para locação',
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2400&q=80',
  },
  lancamento: {
    kicker: 'Novos empreendimentos',
    title: 'Lançamentos',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=80',
  },
}

const sortOptions: Option[] = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor', label: 'Menor valor' },
  { value: 'maior', label: 'Maior valor' },
]

type Sort = 'relevancia' | 'menor' | 'maior'

export default function Listings({ negotiation }: { negotiation: Negotiation }) {
  const [params, setParams] = useSearchParams()
  const ref = useReveal([negotiation])

  const [type, setType] = useState(params.get('tipo') ?? '')
  const [city, setCity] = useState(params.get('cidade') ?? '')
  const [bairro, setBairro] = useState(params.get('bairro') ?? '')
  const [priceIdx, setPriceIdx] = useState(Number(params.get('faixa') ?? -1))
  const [bedrooms, setBedrooms] = useState(Number(params.get('dorm') ?? 0))
  const [bathrooms, setBathrooms] = useState(Number(params.get('banheiros') ?? 0))
  const [parking, setParking] = useState(Number(params.get('vagas') ?? 0))
  const [reference, setReference] = useState(params.get('ref') ?? '')
  const [sort, setSort] = useState<Sort>('relevancia')

  const meta = META[negotiation]

  const priceOf = (p: (typeof PROPERTIES)[number]) =>
    negotiation === 'locacao' ? p.rentPrice ?? 0 : p.salePrice ?? 0

  const results = useMemo(() => {
    let list = PROPERTIES.filter((p) => p.negotiation.includes(negotiation))
    if (type) list = list.filter((p) => p.type === type)
    if (city) list = list.filter((p) => p.city === city)
    if (bairro) list = list.filter((p) => p.district === bairro)
    if (bedrooms > 0) list = list.filter((p) => p.bedrooms >= bedrooms)
    if (bathrooms > 0) list = list.filter((p) => p.bathrooms >= bathrooms)
    if (parking > 0) list = list.filter((p) => p.parking >= parking)
    if (reference.trim())
      list = list.filter((p) =>
        p.reference.toLowerCase().includes(reference.trim().toLowerCase()),
      )
    if (priceIdx >= 0) {
      const r = SALE_PRICE_RANGES[priceIdx]
      list = list.filter((p) => priceOf(p) >= r.min && priceOf(p) <= r.max)
    }
    if (sort === 'menor') list = [...list].sort((a, b) => priceOf(a) - priceOf(b))
    if (sort === 'maior') list = [...list].sort((a, b) => priceOf(b) - priceOf(a))
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [negotiation, type, city, bairro, bedrooms, bathrooms, parking, reference, priceIdx, sort])

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const clearAll = () => {
    setType('')
    setCity('')
    setBairro('')
    setPriceIdx(-1)
    setBedrooms(0)
    setBathrooms(0)
    setParking(0)
    setReference('')
    setParams({}, { replace: true })
  }

  return (
    <PageTransition>
      <PageHero kicker={meta.kicker} title={meta.title} image={meta.image} />

      <div ref={ref} className="shell grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        {/* Filtros */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="kicker">Filtrar busca</h2>
              <button onClick={clearAll} className="text-[0.7rem] text-stone hover:text-bronze">
                Limpar
              </button>
            </div>

            <div className="space-y-4">
              <div className="border border-line">
                <Dropdown
                  label="Tipo"
                  value={type}
                  onChange={(v) => {
                    setType(v)
                    updateParam('tipo', v)
                  }}
                  options={toOptions(PROPERTY_TYPES)}
                  placeholder="Todos os tipos"
                />
              </div>

              <div className="border border-line">
                <Dropdown
                  label="Cidade"
                  value={city}
                  onChange={(v) => {
                    setCity(v)
                    updateParam('cidade', v)
                  }}
                  options={toOptions(CITIES)}
                  placeholder="Todas as cidades"
                />
              </div>

              <div className="border border-line">
                <Dropdown
                  label="Bairro"
                  value={bairro}
                  onChange={(v) => {
                    setBairro(v)
                    updateParam('bairro', v)
                  }}
                  options={toOptions(BAIRROS)}
                  placeholder="Todos os bairros"
                />
              </div>

              <div>
                <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.14em] text-stone">
                  Dormitórios
                </span>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        const v = bedrooms === n ? 0 : n
                        setBedrooms(v)
                        updateParam('dorm', v ? String(v) : '')
                      }}
                      className={`h-10 w-12 border text-sm transition-colors ${
                        bedrooms === n
                          ? 'border-bronze bg-bronze text-paper'
                          : 'border-line text-ink hover:border-bronze'
                      }`}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.14em] text-stone">
                  Vagas
                </span>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        const v = parking === n ? 0 : n
                        setParking(v)
                        updateParam('vagas', v ? String(v) : '')
                      }}
                      className={`h-10 w-12 border text-sm transition-colors ${
                        parking === n
                          ? 'border-bronze bg-bronze text-paper'
                          : 'border-line text-ink hover:border-bronze'
                      }`}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.14em] text-stone">
                  Faixa de valor
                </span>
                <div className="space-y-1">
                  {SALE_PRICE_RANGES.map((r, i) => (
                    <button
                      key={r.label}
                      onClick={() => {
                        const v = priceIdx === i ? -1 : i
                        setPriceIdx(v)
                        updateParam('faixa', v >= 0 ? String(v) : '')
                      }}
                      className={`block w-full text-left text-sm transition-colors ${
                        priceIdx === i ? 'text-bronze' : 'text-charcoal hover:text-bronze'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.14em] text-stone">
                  Referência
                </span>
                <input
                  value={reference}
                  onChange={(e) => {
                    setReference(e.target.value)
                    updateParam('ref', e.target.value)
                  }}
                  placeholder="Ex.: SO1448"
                  className="w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-bronze placeholder:text-stone-light"
                />
              </label>
            </div>
          </div>
        </aside>

        {/* Resultados */}
        <div className="lg:col-span-9">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
            <p className="text-sm text-stone">
              <span className="font-serif text-2xl text-ink">{results.length}</span> imóveis
              encontrados
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[0.72rem] uppercase tracking-[0.14em] text-stone">Ordenar</span>
              <div className="w-44 border border-line">
                <Dropdown
                  label="Ordenar"
                  value={sort}
                  onChange={(v) => setSort(v as Sort)}
                  options={sortOptions}
                  clearable={false}
                />
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="py-20 text-center text-stone">
              Nenhum imóvel encontrado com esses filtros.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <div key={p.id} className="reveal">
                  <PropertyCard property={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
