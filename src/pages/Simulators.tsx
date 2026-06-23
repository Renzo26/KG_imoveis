import PageTransition from '@/components/PageTransition'
import PageHero from '@/components/ui/PageHero'
import { useReveal } from '@/lib/scroll'

const BANKS = [
  { name: 'Caixa Econômica Federal', url: 'https://www.caixa.gov.br/voce/habitacao/simulador/Paginas/default.aspx' },
  { name: 'Banco do Brasil', url: 'https://www.bb.com.br/site/financiamentos/credito-imobiliario/' },
  { name: 'Bradesco', url: 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm' },
  { name: 'Itaú', url: 'https://www.itau.com.br/credito-financiamento/imobiliario/' },
  { name: 'Santander', url: 'https://www.santander.com.br/creditos-e-financiamentos/para-sua-casa/credito-imobiliario' },
]

export default function Simulators() {
  const ref = useReveal()
  return (
    <PageTransition>
      <PageHero
        kicker="Simuladores"
        title="Simule seu financiamento"
        subtitle="Acesso fácil aos simuladores dos principais bancos. Calcule as condições e venha negociar."
      />

      <div ref={ref} className="shell py-20 lg:py-28">
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {BANKS.map((b) => (
            <a
              key={b.name}
              href={b.url}
              target="_blank"
              rel="noreferrer"
              className="reveal group flex min-h-44 flex-col justify-between bg-paper p-8 transition-colors duration-500 hover:bg-ink"
            >
              <span className="kicker transition-colors group-hover:text-bronze">Simulador</span>
              <div>
                <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-paper">
                  {b.name}
                </h3>
                <span className="mt-3 inline-block text-[0.72rem] uppercase tracking-[0.18em] text-bronze">
                  Simular agora →
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="reveal mt-8 text-sm text-stone">
          Os simuladores são serviços externos das instituições financeiras. As condições podem
          variar conforme análise de cada banco.
        </p>
      </div>
    </PageTransition>
  )
}
