import RoadTimeline from '../../components/RoadTimeline'
import Reveal from '../../components/Reveal'
import Icon from '../../components/Icon'
import { Button, Card, CtaBand, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

export default function ComoFunciona() {
  useSeo('Cómo funciona para anunciantes', 'Creación de campaña, propuesta, producción e instalación, circulación y monitoreo en tiempo real: el proceso completo de una campaña en Estiky y quién hace qué.', '/como-funciona')
  return (
    <>
      <PageHero
        eyebrow="Cómo funciona"
        title={<>Una campaña, <span className="hl">cuatro etapas</span>, un solo equipo.</>}
        lead="Estiky opera el servicio de forma asistida: tú decides el mensaje y las zonas; el equipo gestiona aprobaciones, producción, instalación, medición y retiro."
        actions={<Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button>}
      >
        <div className="hero-badges" aria-hidden="true">
          <span><Icon name="target" /> Brief</span>
          <span><Icon name="file" /> Propuesta</span>
          <span><Icon name="wrench" /> Instalación</span>
          <span><Icon name="chart" /> Monitoreo</span>
        </div>
      </PageHero>

      <Section eyebrow="El flujo completo" title="Qué pasa en cada etapa y quién se encarga.">
        <RoadTimeline
          steps={[
            {
              icon: 'target', title: '1. Crea tu campaña',
              text: <><p>Creas tu cuenta y, desde el panel, defines zonas, fechas y presupuesto, y envías la campaña a revisión. Si prefieres, lo conversamos primero con el equipo.</p><p>Es el punto de partida para recomendar formato y número de vehículos.</p></>,
              tags: [{ who: 'Tú decides', what: 'Objetivo, zonas, duración y presupuesto aproximado.' }, { who: 'Estiky hace', what: 'Te contacta, aclara dudas y confirma disponibilidad de vehículos.' }, { who: 'Tiempo', what: 'Te lo indicamos al responder tu solicitud.' }],
            },
            {
              icon: 'file', title: '2. Revisión y propuesta',
              text: <><p>Recibes una propuesta con el formato recomendado, las zonas, la duración, el número de vehículos y qué incluye el presupuesto.</p><p>Puedes pedir ajustes hasta que quede como la necesitas.</p></>,
              tags: [{ who: 'Estiky hace', what: 'Arma la propuesta y la cotiza.' }, { who: 'Tú decides', what: 'Apruebas, ajustas o declinas.' }, { who: 'Aprobación', what: 'La campaña arranca solo con tu aprobación de la propuesta.' }],
            },
            {
              icon: 'wrench', title: '3. Producción e instalación',
              text: <><p>Trabajamos tu arte, producimos el wrap y coordinamos la instalación con cada conductor verificado.</p><p>Antes de producir, apruebas el arte final.</p></>,
              tags: [{ who: 'Tú decides', what: 'Apruebas el arte final.' }, { who: 'Estiky hace', what: 'Produce, instala y verifica la instalación.' }, { who: 'Aprobación', what: 'Revisión del arte y de la instalación por el equipo.' }],
            },
            {
              icon: 'chart', title: '4. Circulación y monitoreo',
              text: <><p>Los vehículos circulan y el GPS registra los viajes que inician los conductores. Ves el avance en tu panel en tiempo real, en cualquier momento.</p><p>Al terminar, el equipo coordina el retiro del wrap.</p></>,
              tags: [{ who: 'Estiky hace', what: 'Mide, mantiene tu panel al día y coordina el retiro.' }, { who: 'Tú decides', what: 'Qué ajustar, si renuevas o cuándo cerrar.' }, { who: 'Tiempo', what: 'Datos en tiempo real mientras dure la campaña.' }],
            },
          ]}
        />
      </Section>

      <Section
        tone="tint"
        eyebrow="Si algo cambia"
        title="¿Qué pasa si la campaña se rechaza o se pausa?"
        lead="Operamos con revisiones para proteger tu marca y la de los demás. Esto es lo que puedes esperar."
      >
        <div className="grid3">
          <Reveal><Card icon="x" title="La campaña no pasa la revisión"><p>Te explicamos el motivo —por ejemplo, un arte que debe ajustarse— y qué cambiar. Corriges y la enviamos de nuevo.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="clock" title="Necesitas pausarla"><p>Avisas a tu contacto en Estiky. El equipo coordina la pausa con los conductores y te confirma cómo quedan tus métricas.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="shield" title="Un vehículo sale de la campaña"><p>Si un conductor deja de cumplir los criterios, el equipo lo retira y, cuando es posible, lo reemplaza para mantener la cobertura.</p></Card></Reveal>
        </div>
      </Section>

      <Section eyebrow="Tiempos" title="Semanas, no meses." lead="Los tiempos aproximados dependen de la aprobación del arte, la producción y la disponibilidad de instalación. Los encuentras en tu propuesta." />

      <CtaBand
        title="Empecemos por tu brief."
        text="Son unos minutos. Te respondemos con los siguientes pasos."
        primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }}
        secondary={{ label: 'Hablar con ventas', to: '/demo' }}
      />
    </>
  )
}
