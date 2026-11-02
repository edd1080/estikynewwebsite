import WrapCar from '../../components/WrapCar'
import Reveal from '../../components/Reveal'
import Icon from '../../components/Icon'
import { Button, Check, CtaBand, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

const FORMATS = [
  {
    id: 'full-wrap', cov: 'full' as const, name: 'Full wrap', tag: 'Máxima visibilidad',
    color: '#5B3DF5', accent: '#C8F31D',
    cubre: 'Cobertura total de la carrocería con tu diseño.',
    vehiculo: 'Vehículos elegibles para cobertura completa (se confirma en la verificación).',
    ideal: 'Lanzamientos, aperturas y campañas que necesitan impacto desde el primer día.',
    visibilidad: 'Alta',
    pros: ['Es el formato que más se nota en la calle.', 'Permite una historia de marca completa en un solo vehículo.', 'Diferencia tu campaña de otros mensajes en el tráfico.'],
  },
  {
    id: 'panel-plus', cov: 'plus' as const, name: 'Panel+', tag: 'Cobertura amplia',
    color: '#FF5C7A', accent: '#FFFFFF',
    cubre: 'Cobertura ampliada de la parte baja de la carrocería, con espacio para mensaje y logo.',
    vehiculo: 'Vehículos elegibles según el área a cubrir.',
    ideal: 'Campañas sostenidas, promociones de temporada y refuerzo de marca con buen equilibrio de presupuesto.',
    visibilidad: 'Media-alta',
    pros: ['Buena presencia con una inversión más ajustada que el full wrap.', 'Espacio suficiente para un mensaje claro y llamada a la acción.', 'Funciona bien en campañas sostenidas.'],
  },
  {
    id: 'panel', cov: 'panel' as const, name: 'Panel', tag: 'Presencia constante',
    color: '#15122B', accent: '#C8F31D',
    cubre: 'Un panel con tu logo y mensaje en un área definida del vehículo.',
    vehiculo: 'Amplia variedad de vehículos elegibles.',
    ideal: 'Recordación de marca, refuerzo local y pruebas de zona con menor inversión.',
    visibilidad: 'Media',
    pros: ['Es la forma más ágil de probar Estiky.', 'Permite sumar más vehículos para ampliar zonas.', 'Ideal para mensajes cortos: marca + una idea.'],
  },
]

export default function Formatos() {
  useSeo('Formatos de wrap: Full wrap, Panel+ y Panel', 'Conoce qué cubre cada formato de wrap de Estiky, para qué campaña sirve y qué nivel de visibilidad implica.', '/formatos')
  return (
    <>
      <PageHero
        eyebrow="Formatos"
        title={<>Elige cuánto de tu <span className="hl">marca</span> quieres ver en la calle.</>}
        lead="Full wrap, Panel+ y Panel. Cada formato responde a un objetivo distinto: qué cubre, qué vehículo lo lleva y cuánta visibilidad aporta."
        actions={<><Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button><Button to="#comparar" variant="ghost" size="lg">Comparar</Button></>}
      >
        <div className="stack-cars" aria-hidden="true">
          <WrapCar coverage="full" color="#5B3DF5" accent="#C8F31D" text="TU MARCA" />
          <WrapCar coverage="plus" color="#FF5C7A" accent="#FFFFFF" text="TU MARCA" />
          <WrapCar coverage="panel" color="#15122B" accent="#C8F31D" text="TU MARCA" />
        </div>
      </PageHero>

      {FORMATS.map((f, i) => (
        <Section key={f.id} id={f.id} tone={i % 2 ? 'tint' : 'plain'}>
          <div className={`feature ${i % 2 ? 'feature--rev' : ''}`}>
            <Reveal className="feature__art">
              <WrapCar coverage={f.cov} color={f.color} accent={f.accent} text="TU MARCA" />
              <span className="sticker sticker--tilt">{f.tag}</span>
            </Reveal>
            <Reveal className="feature__copy" delay={100}>
              <p className="eyebrow">Formato {i + 1}</p>
              <h2 className="h2">{f.name}</h2>
              <dl className="spec">
                <div><dt><Icon name="layers" size={16} /> Qué cubre</dt><dd>{f.cubre}</dd></div>
                <div><dt><Icon name="car" size={16} /> Vehículo</dt><dd>{f.vehiculo}</dd></div>
                <div><dt><Icon name="target" size={16} /> Conviene para</dt><dd>{f.ideal}</dd></div>
                <div><dt><Icon name="eye" size={16} /> Visibilidad</dt><dd><b>{f.visibilidad}</b></dd></div>
              </dl>
              <ul className="checks">{f.pros.map((p) => <Check key={p}>{p}</Check>)}</ul>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section id="comparar" eyebrow="Comparar" title="Los tres formatos, lado a lado.">
        <Reveal className="table-wrap">
          <table className="table">
            <thead><tr><th scope="col">&nbsp;</th><th scope="col">Full wrap</th><th scope="col">Panel+</th><th scope="col">Panel</th></tr></thead>
            <tbody>
              <tr><th scope="row">Cobertura</th><td>Total</td><td>Ampliada</td><td>Un panel</td></tr>
              <tr><th scope="row">Visibilidad</th><td>Alta</td><td>Media-alta</td><td>Media</td></tr>
              <tr><th scope="row">Mejor para</th><td>Impacto y lanzamientos</td><td>Campañas sostenidas</td><td>Recordación y pruebas</td></tr>
              <tr><th scope="row">Mensaje</th><td>Historia completa</td><td>Mensaje + llamada a la acción</td><td>Marca + una idea</td></tr>
            </tbody>
          </table>
        </Reveal>
      </Section>

      <Section
        tone="tint"
        id="impresiones"
        eyebrow="Impresiones"
        title="Cómo estimamos las impresiones."
        lead="Una impresión estimada es una oportunidad de que tu marca sea vista, calculada a partir de la circulación verificada."
      >
        <div className="steps3">
          {[
            { n: '1', t: 'Circulación verificada', d: 'El GPS registra los kilómetros que recorre cada vehículo durante sus viajes.' },
            { n: '2', t: 'Zonas recorridas', d: 'Cruzamos esos recorridos con las zonas objetivo de tu campaña.' },
            { n: '3', t: 'Impresión estimada', d: 'A partir de la circulación por zona se calcula una estimación de impresiones. Es una estimación, no un conteo de personas.' },
          ].map((s, i) => (
            <Reveal key={s.n} className="steps3__item" delay={i * 100}>
              <span className="steps3__n">{s.n}</span>
              <h3 className="h3">{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
        <div className="center-cta"><Button to="/medicion" variant="ghost" icon="arrow">Metodología y límites</Button></div>
      </Section>

      <CtaBand
        title="¿No sabes qué formato elegir?"
        text="Cuéntanos tu objetivo y zonas. En la propuesta te recomendamos el formato que mejor encaja."
        primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }}
        secondary={{ label: 'Hablar con ventas', to: '/demo' }}
      />
    </>
  )
}
