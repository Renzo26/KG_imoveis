import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  label: string
  value: number
  onChange: (value: number) => void
  max?: number
}

/** Contador compacto (dormitórios, banheiros, vagas). 0 = "qualquer". */
export default function Stepper({ icon, label, value, onChange, max = 9 }: Props) {
  const set = (v: number) => onChange(Math.min(max, Math.max(0, v)))

  return (
    <div className="flex h-full items-center gap-3 p-5">
      <span className="text-bronze" title={label}>
        {icon}
      </span>
      <div className="flex flex-1 flex-col">
        <span className="kicker text-[0.58rem]">{label}</span>
        <div className="mt-0.5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => set(value - 1)}
            aria-label={`Diminuir ${label}`}
            className="flex h-5 w-5 items-center justify-center border border-line text-stone transition-colors hover:border-bronze hover:text-bronze disabled:opacity-40"
            disabled={value === 0}
          >
            −
          </button>
          <span className="min-w-6 text-center text-sm text-ink">
            {value === 0 ? '–' : `${value}+`}
          </span>
          <button
            type="button"
            onClick={() => set(value + 1)}
            aria-label={`Aumentar ${label}`}
            className="flex h-5 w-5 items-center justify-center border border-line text-stone transition-colors hover:border-bronze hover:text-bronze"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
