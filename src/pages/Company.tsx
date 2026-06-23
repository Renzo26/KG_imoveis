import PageTransition from '@/components/PageTransition'
import PageHero from '@/components/ui/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { useReveal } from '@/lib/scroll'
import { SITE } from '@/data/site'

const values = [
  { title: 'Honestidade', text: 'Relações construídas com transparência em cada negociação.' },
  { title: 'Qualidade', text: 'Profissionais credenciados e atendimento próximo, do início ao fim.' },
  { title: 'Respeito', text: 'Cuidado com clientes e colaboradores em todas as etapas.' },
  { title: 'Inovação', text: 'Organização e tecnologia a serviço do melhor negócio.' },
]

export default function Company() {
  const ref = useReveal()
  return (
    <PageTransition>
      <PageHero
        kicker="A empresa"
        title="Mais de 20 anos cuidando do seu imóvel"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80"
      />

      <div ref={ref}>
        <section className="shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <div className="reveal lg:col-span-5">
            <span className="kicker">Desde {SITE.foundedYear}</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Segurança e rapidez para comprar, vender e alugar.
            </h2>
          </div>
          <div className="reveal space-y-6 text-lg leading-relaxed text-charcoal lg:col-span-6 lg:col-start-7">
            <p>
              Estamos no mercado imobiliário desde {SITE.foundedYear}, com sede própria. Aqui você
              compra, vende e cuida de toda a sua documentação imobiliária — e também administramos
              e alugamos o seu imóvel com segurança e rapidez.
            </p>
            <p>
              Nossa maior satisfação é atendê-lo com qualidade. Contamos com ótimos profissionais
              credenciados, que prezam por honestidade, transparência, respeito, organização e
              inovação no atendimento.
            </p>
            <p className="font-serif text-2xl italic text-bronze">
              “Ao retornar, peça para falar com o mesmo corretor que lhe atendeu.”
            </p>
            <p className="text-sm text-stone">
              Fidelize seu contato e evite a duplicidade no atendimento. Acompanhe as novidades em
              nossas redes sociais {SITE.social.handle}.
            </p>
          </div>
        </section>

        <section className="border-y border-line bg-paper-dark">
          <div className="shell grid gap-px py-px sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="reveal bg-paper p-10">
                <h3 className="font-serif text-2xl text-ink">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="shell flex flex-col items-center gap-8 py-24 text-center lg:py-32">
          <h2 className="reveal max-w-2xl font-serif text-4xl text-ink md:text-5xl">
            Vamos encontrar o seu próximo imóvel?
          </h2>
          <div className="reveal flex flex-wrap justify-center gap-4">
            <ButtonLink to="/imoveis/venda">Ver imóveis</ButtonLink>
            <ButtonLink to="/contato" variant="outline">
              Falar com a equipe
            </ButtonLink>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
