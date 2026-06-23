import { useState, type FormEvent } from 'react'
import PageTransition from '@/components/PageTransition'
import PageHero from '@/components/ui/PageHero'
import { Input, Textarea, Select } from '@/components/ui/Field'
import { useReveal } from '@/lib/scroll'
import { PROPERTY_TYPES } from '@/data/site'

const NEGOTIATIONS = ['Venda', 'Locação', 'Venda ou Locação'] as const

export default function FindProperty() {
  const ref = useReveal()
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <PageTransition>
      <PageHero
        kicker="Encontramos para você"
        title="Encontre seu imóvel"
        subtitle="Conte o que você procura e a nossa equipe busca as melhores opções para o seu perfil."
        image="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2400&q=80"
      />

      <div ref={ref} className="shell max-w-3xl py-20 lg:py-28">
        {sent ? (
          <div className="reveal border border-line bg-paper p-12 text-center">
            <h2 className="font-serif text-3xl text-ink">Pedido recebido!</h2>
            <p className="mt-3 text-stone">
              Vamos procurar imóveis com o seu perfil e retornar o contato em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="reveal space-y-5">
            <p className="text-sm text-stone">Campos com * são obrigatórios.</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Nome *" required />
              <Input label="Telefone *" required />
            </div>
            <Input label="E-mail *" type="email" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Select label="Tipo do imóvel *" options={PROPERTY_TYPES} placeholder="Selecione" required />
              <Select label="Negociação *" options={NEGOTIATIONS} placeholder="Selecione" required />
            </div>
            <Textarea
              label="O que você procura? *"
              rows={5}
              placeholder="Descreva o imóvel desejado: cidade, bairro, dormitórios, faixa de valor..."
              required
            />
            <button className="w-full bg-ink px-6 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-bronze">
              Enviar pedido
            </button>
          </form>
        )}
      </div>
    </PageTransition>
  )
}
