import { useState, type FormEvent } from 'react'
import PageTransition from '@/components/PageTransition'
import PageHero from '@/components/ui/PageHero'
import { Input, Textarea } from '@/components/ui/Field'
import { useReveal } from '@/lib/scroll'
import { SITE } from '@/data/site'

export default function Contact() {
  const ref = useReveal()
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <PageTransition>
      <PageHero
        kicker="Contato"
        title="Fale conosco"
        subtitle="Envie sua mensagem e retornaremos o contato. Será um prazer atender você."
      />

      <div ref={ref} className="shell grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
        {/* Informações */}
        <div className="reveal lg:col-span-5">
          <span className="kicker">Nosso endereço</span>
          <address className="mt-5 space-y-1 text-lg not-italic text-charcoal">
            <p>{SITE.address.street}</p>
            <p>
              {SITE.address.district} — {SITE.address.city}/{SITE.address.state}
            </p>
            <p>CEP {SITE.address.zip}</p>
          </address>

          <div className="mt-10 space-y-4">
            <div>
              <span className="text-[0.72rem] uppercase tracking-[0.14em] text-stone">Telefone</span>
              <p className="text-lg text-ink">{SITE.phones.landline}</p>
            </div>
            <div>
              <span className="text-[0.72rem] uppercase tracking-[0.14em] text-stone">WhatsApp</span>
              <p className="text-lg text-ink">
                {SITE.phones.whatsapp} · {SITE.phones.whatsappAlt}
              </p>
            </div>
            <div>
              <span className="text-[0.72rem] uppercase tracking-[0.14em] text-stone">E-mail</span>
              <p className="text-lg text-ink">{SITE.email}</p>
            </div>
            <p className="pt-2 text-sm text-bronze">{SITE.creci}</p>
          </div>
        </div>

        {/* Formulário */}
        <div className="lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div className="reveal flex h-full flex-col items-center justify-center border border-line bg-paper p-12 text-center">
              <h2 className="font-serif text-3xl text-ink">Mensagem enviada!</h2>
              <p className="mt-3 text-stone">Retornaremos o seu contato em breve. Obrigado.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="reveal space-y-5">
              <p className="text-sm text-stone">Campos com * são obrigatórios.</p>
              <Input label="Nome *" required />
              <Input label="E-mail *" type="email" required />
              <Input label="Telefone *" required />
              <Textarea label="Mensagem *" rows={5} required />
              <button className="w-full bg-ink px-6 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-bronze">
                Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
