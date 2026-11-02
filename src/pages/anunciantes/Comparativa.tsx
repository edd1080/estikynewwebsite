import { Billboard } from '../../components/illus'
import WrapCar from '../../components/WrapCar'
import Reveal from '../../components/Reveal'
import { Button, Card, CtaBand, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

const ROWS = [
  ['Alcance', 'Una ubicación fija. Quien pasa por ese punto la ve.', 'Se mueve por las zonas objetivo de tu campaña.'],
  ['Medición', 'Generalmente estimaciones de tráfico en el punto.', 'Kilómetros verificados por GPS e impresiones estimadas.'],
  ['Zonas', 'La que ocupa la estructura.', 'Zonas que defines en el brief, sujetas a vehículos disponibles.'],
  ['Costo', 'Por ubicación y periodo contratado.', 'Se cotiza por campaña: zonas, duración y formato.'],
  ['Flexibilidad', 'Depende de los plazos del contrato del espacio.', 'Activas por campaña y puedes ajustar con datos en tiempo real.'],
  ['Reportes', 'Varían según el proveedor.', 'Panel en tiempo real, disponible en cualquier momento.'],
  ['Limitaciones', 'Un solo punto; formato fijo.', 'No mide personas únicas ni conversiones; cobertura según vehículos disponibles por zona.'],
]

export default function Comparativa() {
  useSeo('Estiky vs. publicidad exterior tradicional', 'Comparativa honesta entre vallas fijas y publicidad vehicular on-demand: alcance, medición, zonas, costo, flexibilidad, monitoreo y limitaciones.', '/comparativa')
  return (
    <>
      <PageHero
        eyebrow="Comparativa"
        title={<>Estiky frente a la <span className="hl">publicidad exterior</span> tradicional.</>}
        lead="Cada medio tiene su lugar. Esta comparativa te ayuda a decidir cuándo conviene una valla, cuándo Estiky y cuándo ambos."
        actions={<Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button>}>
        <Billboard withCar />
      </PageHero>
      <Section eyebrow="Criterio por criterio" title="Lo que cambia entre una valla y una campaña en movimiento.">
        <Reveal className="table-wrap">
          <table className="table table--compare">
            <thead><tr><th scope="col">Criterio</th><th scope="col">Valla tradicional</th><th scope="col" className="is-brand">Estiky</th></tr></thead>
            <tbody>{ROWS.map(([c, a, b]) => (<tr key={c}><th scope="row">{c}</th><td>{a}</td><td className="is-brand">{b}</td></tr>))}</tbody>
          </table>
        </Reveal>
      </Section>
      <Section tone="tint" eyebrow="Con honestidad" title="Cuándo una valla sigue siendo la mejor opción.">
        <div className="grid3">
          <Reveal><Card icon="pin" title="Un punto muy específico"><p>Si quieres presencia permanente frente a un cruce o acceso concreto, una valla en esa ubicación es más directa.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="layers" title="Formato monumental"><p>Para impacto de gran formato en una avenida, una estructura fija ofrece una escala que un vehículo no iguala.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="calendar" title="Presencia a largo plazo"><p>Si buscas ocupar un espacio durante muchos meses sin cambios, el contrato de una valla puede tener sentido.</p></Card></Reveal>
        </div>
      </Section>
      <Section eyebrow="Mejor juntas" title="Estiky funciona bien cuando…" lead="Quieres cubrir varias zonas, activar por temporada, medir con GPS o complementar la valla que ya tienes con presencia en movimiento.">
        <div className="center-gfx"><WrapCar design="fit" /></div>
        <div className="center-cta"><Button to="/casos-de-uso" variant="ghost" icon="arrow">Ver casos de uso</Button></div>
      </Section>
      <CtaBand title="¿Estiky o valla? Platiquémoslo." text="Te ayudamos a evaluar tu caso, aunque la respuesta sea combinar medios." primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }} secondary={{ label: 'Hablar con ventas', to: '/demo' }} />
    </>
  )
}
