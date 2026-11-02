import { useEffect, useRef, useState, type ReactNode } from 'react'
import Icon, { type IconName } from './Icon'

export interface Step {
  title: string
  text: ReactNode
  icon: IconName
  tags?: { who: string; what: string }[]
}

function TopCar() {
  return (
    <svg viewBox="0 0 40 72" width="34" height="62" aria-hidden="true">
      <rect x="3" y="12" width="6" height="12" rx="2" fill="#15122B" />
      <rect x="31" y="12" width="6" height="12" rx="2" fill="#15122B" />
      <rect x="3" y="48" width="6" height="12" rx="2" fill="#15122B" />
      <rect x="31" y="48" width="6" height="12" rx="2" fill="#15122B" />
      <rect x="5" y="4" width="30" height="64" rx="13" style={{ fill: 'var(--brand)' }} />
      <rect x="5" y="30" width="30" height="8" fill="#C8F31D" />
      <rect x="10" y="14" width="20" height="12" rx="4" fill="#26305F" />
      <rect x="10" y="44" width="20" height="10" rx="4" fill="#26305F" />
      <rect x="9" y="5" width="6" height="3" rx="1.5" fill="#FFF3B0" />
      <rect x="25" y="5" width="6" height="3" rx="1.5" fill="#FFF3B0" />
    </svg>
  )
}

/** Calle vertical: un auto avanza con el scroll y va "encendiendo" cada paso. */
export default function RoadTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const v = (vh * 0.62 - r.top) / r.height
      setP(Math.max(0, Math.min(1, v)))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(calc) }
    calc()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="road" ref={ref}>
      <div className="road__lane" aria-hidden="true">
        <div className="road__fill" style={{ height: `${p * 100}%` }} />
        <div className="road__car" style={{ top: `${p * 100}%` }}><TopCar /></div>
      </div>
      <ol className="road__steps">
        {steps.map((s, i) => {
          const on = p > (i + 0.15) / steps.length
          return (
            <li key={s.title} className={`road__step ${on ? 'is-on' : ''} ${i % 2 ? 'is-right' : ''}`}>
              <span className="road__num" aria-hidden="true">{i + 1}</span>
              <div className="road__card">
                <span className="road__icon"><Icon name={s.icon} size={22} /></span>
                <h3 className="h3">{s.title}</h3>
                <div className="road__text">{s.text}</div>
                {s.tags && (
                  <dl className="road__tags">
                    {s.tags.map((t) => (
                      <div key={t.who}><dt>{t.who}</dt><dd>{t.what}</dd></div>
                    ))}
                  </dl>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
