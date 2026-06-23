import type { ComponentProps, ReactNode } from 'react'

const base =
  'w-full border border-line bg-paper px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-bronze placeholder:text-stone-light'

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.14em] text-stone">
      {children}
    </span>
  )
}

export function Input({ label, ...rest }: { label: string } & ComponentProps<'input'>) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input className={base} {...rest} />
    </label>
  )
}

export function Textarea({ label, ...rest }: { label: string } & ComponentProps<'textarea'>) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <textarea className={base} {...rest} />
    </label>
  )
}

export function Select({
  label,
  options,
  placeholder,
  ...rest
}: { label: string; options: readonly string[]; placeholder?: string } & ComponentProps<'select'>) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select className={base} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
