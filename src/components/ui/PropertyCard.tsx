import { Link } from 'react-router-dom'
import type { Property } from '@/data/properties'
import { formatBRL, formatArea } from '@/lib/format'

const specItems = (p: Property) =>
  [
    p.bedrooms > 0 && `${p.bedrooms} dorm.`,
    p.suites > 0 && `${p.suites} suíte${p.suites > 1 ? 's' : ''}`,
    p.parking > 0 && `${p.parking} vaga${p.parking > 1 ? 's' : ''}`,
    p.totalArea > 0 && formatArea(p.totalArea),
  ].filter(Boolean) as string[]

export default function PropertyCard({ property: p }: { property: Property }) {
  const price = p.salePrice ?? p.rentPrice ?? 0
  const isRent = !p.salePrice && !!p.rentPrice

  return (
    <Link to={`/imovel/${p.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-dark">
        <img
          src={p.images[0]}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-elyse)] group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {p.isLaunch && (
            <span className="bg-bronze px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-paper">
              Lançamento
            </span>
          )}
          <span className="bg-ink/80 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-paper backdrop-blur-sm">
            {p.reference}
          </span>
        </div>
      </div>

      <div className="pt-5">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-stone">
          {p.type} · {p.district}, {p.city}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-ink transition-colors group-hover:text-bronze">
          {p.title}
        </h3>
        <p className="mt-3 text-sm text-stone">{specItems(p).join('  ·  ')}</p>
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="font-serif text-xl text-ink">
            {formatBRL(price)}
            {isRent && <span className="text-sm text-stone"> /mês</span>}
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-bronze opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Ver imóvel →
          </span>
        </div>
      </div>
    </Link>
  )
}
