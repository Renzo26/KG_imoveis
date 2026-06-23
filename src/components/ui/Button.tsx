import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 ease-[var(--ease-elyse)] px-7 py-4'

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:bg-bronze',
  outline: 'border border-ink/30 text-ink hover:border-bronze hover:text-bronze',
  ghost: 'text-ink hover:text-bronze',
}

interface CommonProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

export function ButtonLink({
  to,
  variant = 'solid',
  children,
  className = '',
  ...rest
}: CommonProps & { to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'className'>) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  )
}

export function Button({
  variant = 'solid',
  children,
  className = '',
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
