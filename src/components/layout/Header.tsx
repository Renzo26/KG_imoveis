import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV, SITE } from '@/data/site'
import { WhatsAppIcon } from '@/components/ui/icons'

const waLink = (phone: string) => `https://wa.me/55${phone.replace(/\D/g, '')}`

// Rotas cujo topo já é escuro (hero com imagem/overlay): o header pode ficar
// transparente com texto claro. Demais rotas usam header sólido desde o topo.
const hasDarkHero = (path: string) =>
  path === '/' ||
  path.startsWith('/imoveis') ||
  ['/empresa', '/contato', '/cadastre-seu-imovel', '/encontre-seu-imovel', '/simuladores'].includes(
    path,
  )

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // "Sobre o hero": topo da página, menu fechado e rota com hero escuro → texto claro.
  const overHero = !scrolled && !open && hasDarkHero(pathname)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[var(--ease-elyse)] ${
        overHero
          ? 'bg-gradient-to-b from-ink/45 to-transparent'
          : 'border-b border-line bg-paper/95 backdrop-blur-sm'
      }`}
    >
      <div className="shell flex items-center justify-between gap-10 py-5">
        <Link to="/" className="group flex shrink-0 items-baseline gap-2">
          <span className={`font-serif text-2xl leading-none ${overHero ? 'text-paper' : 'text-ink'}`}>
            KG
          </span>
          <span
            className={`text-[0.7rem] uppercase tracking-[0.32em] transition-colors group-hover:text-bronze ${
              overHero ? 'text-paper/70' : 'text-stone'
            }`}
          >
            Imóveis
          </span>
        </Link>

        {/* Navegação + ações (agrupadas à direita) */}
        <div className="hidden items-center gap-9 xl:flex">
          <nav className="flex items-center gap-7">
            {NAV.slice(0, 7).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative text-[0.78rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive
                      ? 'text-bronze'
                      : overHero
                        ? 'text-paper/90 hover:text-bronze'
                        : 'text-charcoal hover:text-bronze'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5 border-l border-current/20 pl-7">
            <a
              href={waLink(SITE.phones.whatsapp)}
              target="_blank"
              rel="noreferrer"
              aria-label={`WhatsApp ${SITE.phones.whatsapp}`}
              className={`group flex items-center gap-2 text-[0.78rem] tracking-wide transition-colors ${
                overHero ? 'text-paper/90 hover:text-paper' : 'text-charcoal hover:text-ink'
              }`}
            >
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
              <span>{SITE.phones.whatsapp}</span>
            </a>
            <Link
              to="/contato"
              className={`px-5 py-3 text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
                overHero
                  ? 'border border-paper/50 text-paper hover:border-paper hover:bg-paper hover:text-ink'
                  : 'bg-ink text-paper hover:bg-bronze'
              }`}
            >
              Contato
            </Link>
          </div>
        </div>

        {/* Botão mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] xl:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {[
            open ? 'translate-y-[6px] rotate-45' : '',
            open ? 'opacity-0' : '',
            open ? '-translate-y-[6px] -rotate-45' : '',
          ].map((transform, i) => (
            <span
              key={i}
              className={`h-px w-6 transition-all duration-300 ${
                overHero ? 'bg-paper' : 'bg-ink'
              } ${transform}`}
            />
          ))}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-paper xl:hidden"
          >
            <div className="shell flex flex-col py-6">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `border-b border-line py-4 font-serif text-2xl ${
                      isActive ? 'text-bronze' : 'text-ink'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href={waLink(SITE.phones.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center gap-2 text-sm tracking-wide text-bronze"
              >
                <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
                WhatsApp {SITE.phones.whatsapp}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
