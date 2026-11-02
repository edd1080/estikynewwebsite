import Reveal from '../../components/Reveal'
import { Button, Card, Check, CtaBand, PageHero, Section } from '../../components/ui'
import RoadTimeline from '../../components/RoadTimeline'
import { useSeo } from '../../lib/seo'

export default function Requisitos() {
  useSeo('Requisitos y verificación para conductores', 'Documentos, fotos y criterios de elegibilidad del vehículo para ser conductor de Estiky, y qué pasa si tu solicitud se rechaza.', '/conductores/requisitos')
  return (
    <>
      <PageHero eyebrow="Requisitos y verificación" title={<>Todo lo que necesitas para <span className="hl">arrancar</span>.</>} lead="Documentos, fotos y condiciones del vehículo. Si algo no pasa la revisión, te decimos qué corregir." actions={<Button to="/conductores/registro" icon="arrow" size="lg">Crear cuenta</Button>} />
      <Section eyebrow="Documentos" title="Tres documentos vigentes.">
        <div className="grid3">
          <Reveal><Card icon="id" title="Licencia de conducir"><p>Vigente y legible. Debe estar a tu nombre.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="file" title="Tarjeta de circulación"><p>Del vehículo que vas a registrar.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="shield" title="Seguro del vehículo"><p>Póliza vigente del vehículo.</p></Card></Reveal>
        </div>
      </Section>
      <Section tone="tint" eyebrow="Fotos" title="Fotos de tu vehículo.">
        <div className="split">
          <Reveal className="panel panel--ok"><h3 className="h3">Cómo tomarlas</h3><ul className="checks">
            <Check>Con buena luz y el auto limpio.</Check>
            <Check>Que se vea el vehículo completo en cada foto.</Check>
            <Check>Sin filtros ni ediciones.</Check>
          </ul></Reveal>
          <Reveal className="panel" delay={120}><h3 className="h3">Dentro de la app</h3><p>La app te guía foto por foto con ejemplos de qué ángulos subir. Si alguna no sirve, te pedimos repetirla.</p></Reveal>
        </div>
      </Section>
      <Section eyebrow="Elegibilidad" title="Qué buscamos en un vehículo.">
        <ul className="checks checks--grid">
          <Check>Vehículo particular que circule en Ciudad de Guatemala.</Check>
          <Check>Carrocería en buen estado, sin daños que afecten la instalación.</Check>
          <Check>Documentos vigentes y a tu nombre o con autorización del propietario.</Check>
          <Check>Compatibilidad con el formato de la campaña (se confirma en la verificación).</Check>
        </ul>
      </Section>
      <Section tone="tint" eyebrow="Verificación" title="Qué pasa después de enviar tus documentos.">
        <RoadTimeline steps={[
          { icon: 'file', title: 'Envías documentos y fotos', text: <p>Desde la app, cuando quieras.</p> },
          { icon: 'id', title: 'El equipo revisa', text: <p>Validamos que todo sea legible y esté vigente.</p> },
          { icon: 'check', title: 'Aprobada o con correcciones', text: <p>Si se aprueba, quedas listo para una campaña. Si algo falla, la app te dice qué corregir y puedes volver a enviar.</p> },
        ]} />
      </Section>
      <CtaBand tone="ink" title="¿Listo para registrarte?" text="Crea tu cuenta y sube tus documentos cuando quieras." primary={{ label: 'Crear cuenta de conductor', to: '/conductores/registro' }} secondary={{ label: 'Ayuda', to: '/conductores/ayuda' }} />
    </>
  )
}
