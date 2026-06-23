import PageTransition from '@/components/PageTransition'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <span className="kicker">Erro 404</span>
        <h1 className="mt-4 font-serif text-6xl text-ink md:text-8xl">Página não encontrada</h1>
        <p className="mt-5 max-w-md text-stone">
          O endereço que você procura não existe ou foi movido. Vamos voltar ao começo?
        </p>
        <div className="mt-10">
          <ButtonLink to="/">Voltar ao início</ButtonLink>
        </div>
      </section>
    </PageTransition>
  )
}
