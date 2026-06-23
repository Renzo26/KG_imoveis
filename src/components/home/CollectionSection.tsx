import { Link } from 'react-router-dom'
import PropertyCard from '@/components/ui/PropertyCard'
import type { Property } from '@/data/properties'

interface Props {
  kicker: string
  title: string
  to: string
  linkLabel: string
  properties: Property[]
}

export default function CollectionSection({ kicker, title, to, linkLabel, properties }: Props) {
  return (
    <section className="shell py-24 lg:py-32">
      <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="kicker">{kicker}</span>
          <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">{title}</h2>
        </div>
        <Link
          to={to}
          className="group flex items-center gap-3 text-[0.74rem] uppercase tracking-[0.18em] text-ink hover:text-bronze"
        >
          {linkLabel}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {properties.slice(0, 4).map((p) => (
          <div key={p.id} className="reveal">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
