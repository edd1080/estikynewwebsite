import Reveal from '../../components/Reveal'
import { Button, Card, Check, CtaBand, Faq, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

export default function Inversion() {
  useSeo('Inversión y presupuesto de campaña', 'Qué incluye el presupuesto de una campaña Estiky, qué variables definen la cotización y las condiciones del piloto 2026.', '/inversion')
  return (
    <>
      <PageHero
        eyebrow="Inversión"
        title={<>Un presupuesto <span className="hl">a la medida</span> de tu campaña.</>}
        lead="No hay tarifario único. Cada campaña se cotiza según zonas, duración y formato, y la propuesta te muestra con claridad qué incluye."
        actions={<Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button>}
      />
      <Section eyebrow="Qué incluye" title="Cuatro componentes en un solo presupuesto.">
        <div className="grid4">
          {[
            { icon: 'layers', t: 'Diseño y producción del wrap', d: 'Adaptación del arte y producción del material.' },
            { icon: 'wrench', t: 'Instalación y retiro', d: 'Coordinación de instalación y retiro al terminar.' },
            { icon: 'gps', t: 'Circulación y medición', d: 'Vehículos en calle y registro de viajes con GPS.' },
            { icon: 'chart', t: 'Panel en tiempo real', d: 'Acceso a métricas y estado de tu campaña en todo momento.' },
          ].map((x, i) => (<Reveal key={x.t} delay={i * 80}><Card icon={x.icon as 'gps'} title={x.t}><p>{x.d}</p></Card></Reveal>))}
        </div>
      </Section>
      <Section tone="tint" eyebrow="Cómo se cotiza" title="Tres variables definen tu propuesta.">
        <div className="steps3">
          {[
            { n: '1', t: 'Zonas', d: 'Cuántas y cuáles zonas quieres cubrir, y con cuántos vehículos.' },
            { n: '2', t: 'Duración', d: 'Cuánto tiempo estará activa tu campaña.' },
            { n: '3', t: 'Formato', d: 'Full wrap, Panel+ o Panel.' },
          ].map((s, i) => (<Reveal key={s.n} className="steps3__item" delay={i * 100}><span className="steps3__n">{s.n}</span><h3 className="h3">{s.t}</h3><p>{s.d}</p></Reveal>))}
        </div>
        <p className="center-note">No publicamos tarifas ni precios por kilómetro: dependen de la combinación de estas tres variables.</p>
      </Section>
      <Section id="piloto" eyebrow="Piloto 2026" title="Condiciones del piloto cerrado.">
        <div className="split">
          <Reveal className="panel panel--ok">
            <h3 className="h3">Lo que ofrece el piloto</h3>
            <ul className="checks">
              <Check>Instalación del wrap sin costo para anunciantes seleccionados.</Check>
              <Check>Operación asistida: el equipo gestiona aprobaciones, instalación y retiro.</Check>
              <Check>Panel en tiempo real con medición GPS en todas las campañas.</Check>
            </ul>
          </Reveal>
          <Reveal className="panel" delay={120}>
            <h3 className="h3">Lo que debes saber</h3>
            <ul className="checks">
              <Check>Número limitado de campañas y vehículos.</Check>
              <Check>Operación en Ciudad de Guatemala.</Check>
              <Check>La cobertura por zona depende de los vehículos disponibles.</Check>
            </ul>
          </Reveal>
        </div>
      </Section>
      <Section tone="tint" eyebrow="Preguntas sobre inversión" title="Antes de pedir tu propuesta.">
        <div className="narrow"><Faq items={[
          { q: '¿Hay un mínimo para empezar?', a: <p>Las condiciones del piloto se confirman en la propuesta, según el tipo de campaña y la disponibilidad de vehículos.</p> },
          { q: '¿El diseño del wrap está incluido?', a: <p>El presupuesto contempla diseño y producción del wrap. En la propuesta se detalla el alcance.</p> },
          { q: '¿Se cobra el retiro del wrap?', a: <p>Instalación y retiro forman parte de los componentes del presupuesto; en el piloto, la instalación no tiene costo para anunciantes seleccionados.</p> },
          { q: '¿En qué moneda se cotiza?', a: <p>En quetzales (Q).</p> },
        ]} /></div>
      </Section>
      <CtaBand title="Recibe tu presupuesto sin compromiso." text="Cuéntanos tu objetivo, zonas y rango aproximado." primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }} secondary={{ label: 'Hablar con ventas', to: '/demo' }} />
    </>
  )
}
