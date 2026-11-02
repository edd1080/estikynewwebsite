import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CtaBand, Faq, PageHero, Section } from '../../components/ui'
import { DRV_FAQ } from '../../lib/faq'
import { useSeo } from '../../lib/seo'

const CATS = ['Registro', 'Verificación', 'Instalación', 'Viajes', 'Pagos']

export default function DriverAyuda() {
  useSeo('Ayuda para conductores', 'Preguntas frecuentes de conductores sobre registro, verificación, instalación, viajes y pagos.', '/conductores/ayuda')
  const [cat, setCat] = useState(CATS[0])
  return (
    <>
      <PageHero eyebrow="Ayuda" title={<>Respuestas para <span className="hl">conductores</span>.</>} lead="Elige una categoría. Si no encuentras lo que buscas, escríbenos a soporte." />
      <Section>
        <div className="tabs" role="tablist" aria-label="Categorías">
          {CATS.map((c) => (<button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'is-on' : ''} onClick={() => setCat(c)}>{c}</button>))}
        </div>
        <div className="narrow">
          <Faq items={DRV_FAQ.filter((q) => q.cat === cat)} />
          <p className="center-note">Soporte: <Link to="/contacto">ver canales de contacto</Link>.</p>
        </div>
      </Section>
      <CtaBand tone="ink" title="¿Listo para empezar?" text="Crea tu cuenta de conductor." primary={{ label: 'Crear cuenta de conductor', to: '/conductores/registro' }} />
    </>
  )
}
