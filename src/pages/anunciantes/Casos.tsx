import WrapCar from '../../components/WrapCar'
import Reveal from '../../components/Reveal'
import Icon from '../../components/Icon'
import { Button, CtaBand, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

const CASES = [
  { icon: 'rocket', design: 'estiky' as const, t: 'Lanzamiento de producto o marca', ctx: 'Tienes algo nuevo y necesitas que la ciudad lo vea desde la primera semana.', obj: 'Generar presencia visible y reconocimiento inicial en las zonas donde está tu público.', mide: 'Kilómetros verificados, zonas cubiertas e impresiones estimadas desde el arranque.', fmt: 'Full wrap', cov: 'full' as const, color: '#5B3DF5', accent: '#C8F31D' },
  { icon: 'store', design: 'cafe' as const, t: 'Apertura de sucursal', ctx: 'Abres un nuevo punto y quieres que tus clientes cercanos sepan dónde encontrarte.', obj: 'Atraer visitas a la nueva ubicación desde las zonas alrededor.', mide: 'Circulación en las zonas cercanas a la sucursal, en tiempo real.', fmt: 'Panel+', cov: 'plus' as const, color: '#FF5C7A', accent: '#FFFFFF' },
  { icon: 'tag', design: 'fruta' as const, t: 'Temporada o promoción', ctx: 'Tienes una fecha clave —Navidad, regreso a clases, un descuento— y quieres presencia solo durante ese periodo.', obj: 'Reforzar el mensaje de la promoción mientras dura.', mide: 'Circulación y zonas cubiertas durante el periodo de la promoción.', fmt: 'Panel+ o Panel', cov: 'panel' as const, color: '#FFC93C', accent: '#15122B' },
  { icon: 'target', design: 'fit' as const, t: 'Refuerzo local', ctx: 'Ya inviertes en otros medios y quieres sumar presencia física en zonas específicas.', obj: 'Complementar tu mezcla de medios con recordatorio de marca en zonas clave.', mide: 'Cobertura por zona y evolución a lo largo de la campaña.', fmt: 'Panel', cov: 'panel' as const, color: '#15122B', accent: '#C8F31D' },
]

export default function Casos() {
  useSeo('Casos de uso para anunciantes', 'Lanzamientos, aperturas de sucursal, temporadas y refuerzo local: cuatro escenarios donde una campaña vehicular de Estiky hace sentido.', '/casos-de-uso')
  return (
    <>
      <PageHero eyebrow="Casos de uso" title={<>Cuatro momentos donde tu marca <span className="hl">gana la calle</span>.</>} lead="Escenarios de ejemplo para entender cómo se plantea una campaña: contexto, objetivo y qué mediría el panel." actions={<Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button>} />
      {CASES.map((c, i) => (
        <Section key={c.t} tone={i % 2 ? 'tint' : 'plain'}>
          <div className={`feature ${i % 2 ? 'feature--rev' : ''}`}>
            <Reveal className="feature__art"><WrapCar design={c.design} /></Reveal>
            <Reveal className="feature__copy" delay={100}>
              <p className="eyebrow"><Icon name={c.icon as 'rocket'} size={16} /> Caso {i + 1}</p>
              <h2 className="h2">{c.t}</h2>
              <dl className="spec">
                <div><dt>Contexto</dt><dd>{c.ctx}</dd></div>
                <div><dt>Objetivo</dt><dd>{c.obj}</dd></div>
                <div><dt>Qué mediría</dt><dd>{c.mide}</dd></div>
                <div><dt>Formato sugerido</dt><dd><b>{c.fmt}</b></dd></div>
              </dl>
            </Reveal>
          </div>
        </Section>
      ))}
      <CtaBand title="¿Tu caso es otro? También lo armamos." text="Cuéntanos qué necesitas y diseñamos la campaña contigo." primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }} secondary={{ label: 'Hablar con ventas', to: '/demo' }} />
    </>
  )
}
