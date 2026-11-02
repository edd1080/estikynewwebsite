import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import Icon, { type IconName } from './Icon'
import Reveal from './Reveal'
import WrapCar, { type Design } from './WrapCar'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>
}

export function Section({
  id, eyebrow, title, lead, children, tone = 'plain', className = '',
}: {
  id?: string; eyebrow?: string; title?: ReactNode; lead?: ReactNode; children?: ReactNode
  tone?: 'plain' | 'tint' | 'ink' | 'brand'; className?: string
}) {
  return (
    <section id={id} className={`section section--${tone} ${className}`}>
      <Container>
        {(eyebrow || title || lead) && (
          <Reveal className="section__head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="h2">{title}</h2>}
            {lead && <p className="lead">{lead}</p>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  )
}

export function PageHero({
  eyebrow, title, lead, children, actions,
}: { eyebrow: string; title: ReactNode; lead: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="pagehero">
      <Container className="pagehero__inner">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1 h1--page">{title}</h1>
          <p className="lead lead--xl">{lead}</p>
          {actions && <div className="btn-row">{actions}</div>}
        </div>
        {children && <div className="pagehero__art">{children}</div>}
      </Container>
    </header>
  )
}

type BtnProps = {
  to?: string; href?: string; variant?: 'primary' | 'ink' | 'ghost' | 'pop' | 'ghost-on'; children: ReactNode
  icon?: IconName; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; size?: 'md' | 'lg'
}
export function Button({ to, href, variant = 'primary', children, icon, onClick, type = 'button', disabled, size = 'md' }: BtnProps) {
  const cls = `btn btn--${variant} btn--${size}`
  const inner = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} />}
    </>
  )
  if (to) return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>
  if (href) return <a href={href} className={cls} onClick={onClick}>{inner}</a>
  return <button type={type} className={cls} onClick={onClick} disabled={disabled}>{inner}</button>
}

export function Card({
  icon, title, children, tone = 'white', className = '',
}: { icon?: IconName; title: ReactNode; children: ReactNode; tone?: 'white' | 'tint' | 'brand' | 'ink'; className?: string }) {
  return (
    <div className={`card card--${tone} ${className}`}>
      {icon && (
        <span className="card__icon"><Icon name={icon} size={24} /></span>
      )}
      <h3 className="h3">{title}</h3>
      <div className="card__body">{children}</div>
    </div>
  )
}

export function Check({ children, tone = 'ok' }: { children: ReactNode; tone?: 'ok' | 'no' }) {
  return (
    <li className={`check check--${tone}`}>
      <span className="check__mark"><Icon name={tone === 'ok' ? 'check' : 'x'} size={14} /></span>
      <span>{children}</span>
    </li>
  )
}

export interface QA { q: string; a: ReactNode; cat?: string }
export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q} className="faq__item">
          <summary>
            <span>{it.q}</span>
            <span className="faq__plus" aria-hidden="true"><Icon name="plus" size={18} /></span>
          </summary>
          <div className="faq__a">{it.a}</div>
        </details>
      ))}
    </div>
  )
}

export function Stamp({ children }: { children: ReactNode }) {
  return <span className="stamp">{children}</span>
}

export function CtaBand({
  title, text, primary, secondary, tone = 'brand', car,
}: {
  title: ReactNode; text: ReactNode; tone?: 'brand' | 'ink'; car?: Design
  primary: { label: string; to: string }; secondary?: { label: string; to: string }
}) {
  return (
    <section className={`ctaband ctaband--${tone}`}>
      <Container>
        <Reveal className="ctaband__inner">
          <div className="ctaband__copy">
            <h2 className="h2 h2--on">{title}</h2>
            <p className="lead lead--on">{text}</p>
            <div className="btn-row">
              <Button to={primary.to} variant="pop" icon="arrow" size="lg">{primary.label}</Button>
              {secondary && <Button to={secondary.to} variant="ghost-on" size="lg">{secondary.label}</Button>}
            </div>
          </div>
          <div className="ctaband__art"><WrapCar design={car ?? (tone === 'ink' ? 'estiky' : 'fruta')} /></div>
        </Reveal>
      </Container>
    </section>
  )
}
