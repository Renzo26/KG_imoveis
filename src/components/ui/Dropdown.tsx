import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface Option {
  value: string
  label: string
}

export const toOptions = (items: readonly string[]): Option[] =>
  items.map((i) => ({ value: i, label: i }))

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  icon?: ReactNode
  /** Exibe a opção de limpar (valor vazio) no topo. Padrão: true. */
  clearable?: boolean
}

export default function Dropdown({
  label,
  value,
  onChange,
  options,
  placeholder = 'Todos',
  icon,
  clearable = true,
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative h-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-full w-full items-center justify-between gap-3 p-5 text-left transition-colors hover:bg-paper-dark/50"
      >
        <span className="flex min-w-0 items-center gap-3">
          {icon && <span className="text-bronze">{icon}</span>}
          <span className="flex min-w-0 flex-col">
            <span className="kicker text-[0.58rem]">{label}</span>
            <span className={`truncate text-sm ${selected ? 'text-ink' : 'text-stone'}`}>
              {selected ? selected.label : placeholder}
            </span>
          </span>
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`shrink-0 text-bronze transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-72 origin-top overflow-y-auto border border-line bg-paper py-2 shadow-[0_24px_60px_-24px_rgba(28,26,23,0.45)]"
          >
            {clearable && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onChange('')
                    setOpen(false)
                  }}
                  className={`block w-full px-5 py-2.5 text-left text-sm transition-colors hover:bg-paper-dark hover:text-bronze ${
                    !selected ? 'text-bronze' : 'text-stone'
                  }`}
                >
                  {placeholder}
                </button>
              </li>
            )}
            {options.map((o) => {
              const active = o.value === value
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(o.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between px-5 py-2.5 text-left text-sm transition-colors hover:bg-paper-dark ${
                      active ? 'text-bronze' : 'text-charcoal hover:text-bronze'
                    }`}
                  >
                    {o.label}
                    {active && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
