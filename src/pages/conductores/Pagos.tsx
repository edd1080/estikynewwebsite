import Reveal from '../../components/Reveal'
import { Button, Card, Check, CtaBand, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

export default function Pagos() {
  useSeo('Pagos para conductores', 'Cada cuánto y por qué medio se paga a los conductores de Estiky, y dónde consultar el detalle dentro de la app.', '/conductores/pagos')
  return (
    <>
      <PageHero eyebrow="Pagos" title={<>Cada quincena, <span className="hl">por transferencia</span>.</>} lead="Sabes cuándo y cómo se paga. El detalle de tu cuenta lo ves dentro de la app una vez que está verificada." actions={<Button to="/conductores/registro" icon="arrow" size="lg">Crear cuenta</Button>} />
      <Section eyebrow="Lo esencial" title="Tres cosas claras.">
        <div className="grid3">
          <Reveal><Card icon="calendar" title="Cadencia quincenal"><p>Los pagos se hacen cada quincena.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="bank" title="Por transferencia"><p>Recibes el pago por transferencia bancaria.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="phoneApp" title="Detalle en la app"><p>Consultas el detalle de tu cuenta dentro de la app cuando está verificada.</p></Card></Reveal>
        </div>
      </Section>
      <Section tone="tint" eyebrow="Para recibir tu pago" title="Qué necesitas tener listo.">
        <ul className="checks checks--grid">
          <Check>Cuenta verificada en Estiky.</Check>
          <Check>Datos bancarios completos en tu perfil.</Check>
          <Check>Viajes registrados desde la app durante el periodo.</Check>
        </ul>
      </Section>
      <Section eyebrow="Importante" title="Cómo hablamos de dinero.">
        <div className="narrow prose">
          <p>Los montos y las condiciones de pago se muestran dentro de la app, en tu cuenta verificada. Aquí no publicamos tarifas ni ejemplos de ingreso porque dependen de la campaña y de tus viajes registrados, y Estiky no garantiza un ingreso fijo.</p>
        </div>
      </Section>
      <CtaBand tone="ink" title="Empieza tu registro." text="Verifica tu cuenta y consulta el detalle dentro de la app." primary={{ label: 'Crear cuenta de conductor', to: '/conductores/registro' }} secondary={{ label: 'Ayuda', to: '/conductores/ayuda' }} />
    </>
  )
}
