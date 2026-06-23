import { Link } from 'react-router-dom'
import { NAV, SITE } from '@/data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-paper">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-serif text-3xl text-paper">
              KG Imóveis
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-light">
              No mercado imobiliário do ABC desde {SITE.foundedYear}, com sede própria.
              Compra, venda, locação e administração com segurança e qualidade.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="kicker mb-5">Navegação</h4>
            <ul className="space-y-3 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-stone-light transition-colors hover:text-bronze">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Endereço */}
          <div>
            <h4 className="kicker mb-5">Nosso Endereço</h4>
            <address className="space-y-1 text-sm not-italic text-stone-light">
              <p>{SITE.address.street}</p>
              <p>{SITE.address.district}</p>
              <p>
                {SITE.address.city}/{SITE.address.state}
              </p>
              <p>CEP {SITE.address.zip}</p>
              <p className="pt-2 text-bronze">{SITE.creci}</p>
            </address>
          </div>

          {/* Contato */}
          <div>
            <h4 className="kicker mb-5">Contato</h4>
            <ul className="space-y-2 text-sm text-stone-light">
              <li>{SITE.phones.landline} · Fixo</li>
              <li>
                <a
                  href={`https://wa.me/55${SITE.phones.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-bronze"
                >
                  {SITE.phones.whatsapp} · WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/55${SITE.phones.whatsappAlt.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-bronze"
                >
                  {SITE.phones.whatsappAlt} · WhatsApp
                </a>
              </li>
              <li className="pt-2">
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-bronze">
                  {SITE.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-4 text-xs uppercase tracking-[0.18em]">
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="hover:text-bronze">
                Instagram
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer" className="hover:text-bronze">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-8 text-xs text-stone md:flex-row md:items-center md:justify-between">
          <p>© {year} KG Imóveis. Todos os direitos reservados.</p>
          <p>{SITE.creci} · {SITE.social.handle}</p>
        </div>
      </div>
    </footer>
  )
}
