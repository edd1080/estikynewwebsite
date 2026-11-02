import Reveal from '../../components/Reveal'
import { DriverTrip } from '../../components/phones'
import { Button, Card, Check, CtaBand, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

export default function Seguridad() {
  useSeo('Seguridad y privacidad para conductores', 'Qué datos recoge Estiky, cuándo se usa el GPS y qué control tiene el conductor.', '/conductores/seguridad')
  return (
    <>
      <PageHero eyebrow="Seguridad y privacidad" title={<>Tú tienes el <span className="hl">control</span> del GPS.</>} lead="El GPS solo se usa durante los viajes que tú inicias en la app. Aquí está qué datos recogemos y para qué." actions={<Button to="/conductores/registro" icon="arrow" size="lg">Crear cuenta</Button>}>
        <DriverTrip />
      </PageHero>
      <Section eyebrow="Qué recogemos" title="Datos de tu cuenta y de tus viajes.">
        <div className="grid3">
          <Reveal><Card icon="id" title="Cuenta y verificación"><p>Nombre, contacto, documentos y fotos que subes para verificarte.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="gps" title="Viajes activos"><p>Ubicación, distancia y recorrido, solo mientras un viaje está en curso.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="bank" title="Datos de pago"><p>Los datos bancarios necesarios para transferirte cada quincena.</p></Card></Reveal>
        </div>
      </Section>
      <Section tone="tint" eyebrow="Tu control" title="Tú inicias. Tú detienes.">
        <div className="split">
          <Reveal className="panel panel--ok"><h3 className="h3">Cómo funciona</h3><ul className="checks">
            <Check>Tú inicias el viaje en la app.</Check>
            <Check>El GPS se activa solo durante ese viaje.</Check>
            <Check>Tú lo finalizas y el registro se detiene.</Check>
          </ul></Reveal>
          <Reveal className="panel" delay={120}><h3 className="h3">Lo que no hacemos</h3><ul className="checks">
            <Check tone="no">Registrar tu ubicación fuera de un viaje activo.</Check>
            <Check tone="no">Compartir tus documentos con anunciantes.</Check>
          </ul></Reveal>
        </div>
      </Section>
      <Section eyebrow="Tus derechos" title="Puedes pedir acceso, corrección o eliminación." lead="Consulta nuestra política de privacidad (borrador sujeto a revisión legal) o escríbenos al canal legal." />
      <CtaBand tone="ink" title="Tu auto, tus reglas." text="Crea tu cuenta y decide cuándo iniciar tus viajes." primary={{ label: 'Crear cuenta de conductor', to: '/conductores/registro' }} secondary={{ label: 'Política de privacidad', to: '/legal/privacidad' }} />
    </>
  )
}
