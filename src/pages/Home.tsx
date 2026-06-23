import { Link } from 'react-router-dom'
import PageTransition from '@/components/PageTransition'
import Hero from '@/components/home/Hero'
import CollectionSection from '@/components/home/CollectionSection'
import { useReveal } from '@/lib/scroll'
import { byNegotiation } from '@/data/properties'
import { SITE } from '@/data/site'

const stats = [
  { value: '20+', label: 'anos de mercado' },
  { value: '1.300+', label: 'imóveis no portfólio' },
  { value: 'ABC', label: 'região de atuação' },
  { value: 'Sede', label: 'própria em Santo André' },
]

const ctas = [
  {
    kicker: 'Simuladores',
    title: 'Simule seu financiamento',
    text: 'Acesso fácil aos sites dos principais bancos.',
    to: '/simuladores',
    label: 'Simule agora',
  },
  {
    kicker: 'Proprietários',
    title: 'Cadastre seu imóvel',
    text: 'Anuncie conosco e garanta bons negócios.',
    to: '/cadastre-seu-imovel',
    label: 'Cadastrar imóvel',
  },
  {
    kicker: 'Atendimento',
    title: 'Fale conosco',
    text: 'Envie sua mensagem, retornaremos seu contato.',
    to: '/contato',
    label: 'Entre em contato',
  },
]

export default function Home({ ready }: { ready: boolean }) {
  const ref = useReveal()

  return (
    <PageTransition>
      <Hero start={ready} />

      <div ref={ref}>
        {/* Manifesto / sobre */}
        <section className="shell grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
          <div className="reveal lg:col-span-5">
            <span className="kicker">A KG Imóveis</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Refinamento atemporal encontra o bem-estar de morar bem.
            </h2>
          </div>
          <div className="reveal flex flex-col justify-center gap-6 lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-charcoal">
              Desde {SITE.foundedYear} no mercado imobiliário do ABC, com sede própria.
              Aqui você compra, vende, cuida de toda a documentação e também administra e
              aluga seu imóvel com segurança e rapidez.
            </p>
            <p className="leading-relaxed text-stone">
              Profissionais credenciados, atendimento próximo e transparente — nossa maior
              satisfação é atendê-lo com qualidade, do primeiro contato à entrega das chaves.
            </p>
            <Link
              to="/empresa"
              className="group mt-2 flex items-center gap-3 text-[0.74rem] uppercase tracking-[0.18em] text-bronze"
            >
              Conheça a empresa
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="border-y border-line">
          <div className="shell grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="reveal px-4 py-12 text-center">
                <p className="font-serif text-4xl text-ink md:text-5xl">{s.value}</p>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-stone">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <CollectionSection
          kicker="Seleção exclusiva"
          title="Imóveis à venda"
          to="/imoveis/venda"
          linkLabel="Ver todos à venda"
          properties={byNegotiation('venda')}
        />

        {/* Faixa de imagem */}
        <section className="reveal relative h-[60vh] min-h-[420px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=80"
            alt="Interior de alto padrão"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/40" />
          <div className="shell absolute inset-0 flex items-center">
            <blockquote className="max-w-2xl font-serif text-3xl leading-snug text-paper md:text-5xl">
              “Ao retornar, peça para falar com o mesmo corretor que lhe atendeu.”
            </blockquote>
          </div>
        </section>

        <CollectionSection
          kicker="Para alugar"
          title="Imóveis para locação"
          to="/imoveis/locacao"
          linkLabel="Ver todos para locação"
          properties={byNegotiation('locacao')}
        />

        <div className="bg-paper-dark">
          <CollectionSection
            kicker="Novidades"
            title="Lançamentos"
            to="/imoveis/lancamentos"
            linkLabel="Ver todos os lançamentos"
            properties={byNegotiation('lancamento')}
          />
        </div>

        {/* CTAs finais */}
        <section className="shell py-24 lg:py-32">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {ctas.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="reveal group flex flex-col bg-paper p-10 transition-colors duration-500 hover:bg-ink"
              >
                <span className="kicker transition-colors group-hover:text-bronze">{c.kicker}</span>
                <h3 className="mt-4 font-serif text-3xl text-ink transition-colors group-hover:text-paper">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-stone transition-colors group-hover:text-stone-light">
                  {c.text}
                </p>
                <span className="mt-8 text-[0.72rem] uppercase tracking-[0.18em] text-bronze">
                  {c.label} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
