import type { ReactNode } from 'react'

interface Props {
  kicker: string
  title: string
  subtitle?: string
  image?: string
  children?: ReactNode
}

export default function PageHero({ kicker, title, subtitle, image, children }: Props) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-ink pt-28">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        </>
      )}
      <div className="shell relative w-full pb-14">
        <span className="kicker">{kicker}</span>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl text-paper md:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-xl text-stone-light">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
