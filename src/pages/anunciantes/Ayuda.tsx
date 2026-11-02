import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CtaBand, Faq, PageHero, Section } from '../../components/ui'
import { ADV_FAQ } from '../../lib/faq'
import { useSeo } from '../../lib/seo'

const CATS = ['Campañas', 'Medición', 'Formatos', 'Presupuesto', 'Operación']

export default function Ayuda() {
  useSeo('Ayuda para anunciantes', 'Preguntas frecuentes de anunciantes sobre campañas, medición, formatos, presupuesto y operación en Estiky.', '/ayuda')
  const [cat, setCat] = useState(CATS[0])
  return (
    <>
      <PageHero eyebrow="Ayuda" title={<>Resolvemos tus dudas de <span className="hl">anunciante</span>.</>} lead="Elige una categoría. Si no encuentras lo que buscas, escríbenos." />
      <Section>
        <div className="tabs" role="tablist" aria-label="Categorías">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'is-on' : ''} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="narrow">
          <Faq items={ADV_FAQ.filter((q) => q.cat === cat)} />
          <p className="center-note">¿Buscas ayuda de conductor? Ve al <Link to="/conductores/ayuda">centro de ayuda para conductores</Link>.</p>
        </div>
      </Section>
      <CtaBand title="¿Sigues con dudas?" text="Escríbenos o solicita una propuesta y lo resolvemos contigo." primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }} secondary={{ label: 'Hablar con ventas', to: '/demo' }} />
    </>
  )
}
