import { Link } from 'react-router-dom'
import { DriverStart, DriverTrip, DriverDocs } from '../../components/phones'
import IsoCity from '../../components/IsoCity'
import WrapCar from '../../components/WrapCar'
import RoadTimeline from '../../components/RoadTimeline'
import Reveal from '../../components/Reveal'
import Icon from '../../components/Icon'
import { Button, Card, Check, Container, CtaBand, Faq, Section } from '../../components/ui'
import { DRV_FAQ } from '../../lib/faq'
import { useSeo } from '../../lib/seo'

export default function DriverHome() {
  useSeo('Gana un ingreso extra con tu auto', 'Instala un wrap publicitario en tu auto, sigue con tu rutina y registra tus viajes desde la app. Crea tu cuenta de conductor en Estiky.', '/conductores')
  return (
    <>
      <section className="hero hero--driver">
        <div className="hero__bg" aria-hidden="true" />
        <Container className="hero__inner">
          <div className="hero__copy">
            <span className="sticker sticker--tilt"><span className="live-dot" aria-hidden="true" /> Ciudad de Guatemala</span>
            <h1 className="h1">Tu ruta de siempre, con un <span className="hl">ingreso extra</span>.</h1>
            <p className="lead lead--xl">
              Lleva un wrap publicitario en tu auto y sigue manejando como siempre. Tú inicias y detienes
              tus viajes desde la app; Estiky coordina la instalación, la verificación y el pago.
            </p>
            <div className="btn-row">
              <Button to="/conductores/registro" icon="arrow" size="lg">Crear cuenta de conductor</Button>
              <Button to="#proceso" variant="ghost" size="lg">Ver cómo funciona</Button>
            </div>
            <ul className="hero__proof">
              <li><Icon name="check" size={16} /> No cambias tu rutina</li>
              <li><Icon name="check" size={16} /> Tú controlas el GPS</li>
              <li><Icon name="check" size={16} /> Pagos quincenales</li>
            </ul>
          </div>
          <div className="hero__stage"><IsoCity mode="driver" /></div>
        </Container>
      </section>

      <Section
        eyebrow="Qué es Estiky"
        title="Tu auto, con un mensaje. Tu día, igual que siempre."
        lead="Estiky conecta a dueños de autos particulares con marcas que quieren publicidad exterior. Instalas un wrap en tu vehículo y registras tus viajes con la app."
      >
        <div className="grid3">
          <Reveal><Card icon="car" title="Llevas un wrap"><p>Un diseño publicitario se instala en tu auto. Lo coordina el equipo de Estiky.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="route" title="Manejas como siempre"><p>No te pedimos manejar de más ni cambiar tus rutas. Usas tu auto como lo usas hoy.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="phoneApp" title="Registras tus viajes"><p>Inicias y finalizas cada viaje en la app. El GPS solo funciona mientras el viaje está activo.</p></Card></Reveal>
        </div>
      </Section>

      <Section eyebrow="La app" title="Tu app, paso a paso." lead="Verificas tu cuenta, inicias tu viaje cuando tú quieras y lo finalizas al llegar. Así se ve.">
        <div className="phones"><Reveal><DriverDocs /></Reveal><Reveal delay={100}><DriverTrip /></Reveal><Reveal delay={200}><DriverStart /></Reveal></div>
        <p className="disclaimer">Pantallas ilustrativas de la app del conductor.</p>
      </Section>

      <Section id="proceso" tone="tint" eyebrow="Cómo funciona" title="De tu registro a tu primer pago, en cinco pasos." lead="Mientras bajas, el auto avanza por cada etapa.">
        <RoadTimeline
          steps={[
            { icon: 'phoneApp', title: 'Registro', text: <p>Creas tu cuenta de conductor y completas tu perfil y los datos de tu vehículo.</p> },
            { icon: 'id', title: 'Verificación', text: <p>Subes tus documentos y fotos. El equipo los revisa; si algo falta, te avisamos qué corregir.</p> },
            { icon: 'wrench', title: 'Instalación', text: <p>Coordinamos contigo la instalación del wrap. No la pagas tú.</p> },
            { icon: 'gps', title: 'Viajes', text: <p>Inicias tus viajes desde la app, manejas como siempre y los finalizas al llegar.</p> },
            { icon: 'bank', title: 'Pago', text: <p>Recibes tu pago cada quincena por transferencia. El detalle lo ves en la app.</p> },
          ]}
        />
      </Section>

      <Section eyebrow="Antes de empezar" title="Lo que necesitas." lead="Documentos y condiciones básicas del auto. El detalle está en la página de requisitos.">
        <div className="split">
          <Reveal className="panel panel--ok"><h3 className="h3">Documentos</h3><ul className="checks">
            <Check>Licencia de conducir vigente.</Check>
            <Check>Tarjeta de circulación.</Check>
            <Check>Seguro del vehículo.</Check>
          </ul></Reveal>
          <Reveal className="panel" delay={120}><h3 className="h3">Tu vehículo</h3><ul className="checks">
            <Check>Vehículo particular en Ciudad de Guatemala.</Check>
            <Check>Carrocería en buen estado.</Check>
            <Check>Fotos del auto que pedimos en la app.</Check>
          </ul></Reveal>
        </div>
        <div className="center-cta"><Button to="/conductores/requisitos" variant="ghost" icon="arrow">Ver requisitos completos</Button></div>
      </Section>

      <Section tone="tint" eyebrow="Instalación" title="¿Quién paga la instalación y qué pasa al terminar?">
        <div className="split">
          <Reveal className="panel panel--ok"><h3 className="h3">Instalación</h3><p>La instalación del wrap la coordina Estiky y no la pagas tú. Te avisamos fecha, lugar y qué esperar.</p></Reveal>
          <Reveal className="panel panel--ok" delay={120}><h3 className="h3">Cuando termina la campaña</h3><p>Se coordina el retiro del wrap con el equipo. Después puedes quedar disponible para una próxima campaña.</p></Reveal>
        </div>
      </Section>

      <Section eyebrow="Pagos" title="Quincenal, por transferencia." lead="Recibes tu pago cada quincena mediante transferencia. El detalle de tu cuenta lo consultas dentro de la app una vez que está verificada.">
        <div className="center-cta"><Button to="/conductores/pagos" variant="ghost" icon="arrow">Cómo funcionan los pagos</Button></div>
      </Section>

      <Section tone="ink" eyebrow="Privacidad y GPS" title="Tú inicias el viaje. Tú lo detienes.">
        <div className="split">
          <Reveal className="panel panel--dark"><h3 className="h3">Qué se registra</h3><ul className="checks">
            <Check>Tu ubicación, solo durante viajes activos.</Check>
            <Check>La distancia y el recorrido de esos viajes.</Check>
            <Check>Los datos de cuenta y verificación que tú envías.</Check>
          </ul></Reveal>
          <Reveal className="panel panel--dark" delay={120}><h3 className="h3">Qué no</h3><ul className="checks">
            <Check tone="no">Tu ubicación cuando no hay un viaje activo.</Check>
            <Check tone="no">Un registro continuo de tu día.</Check>
          </ul></Reveal>
        </div>
        <div className="center-cta"><Button to="/conductores/seguridad" variant="pop" icon="arrow">Seguridad y privacidad</Button></div>
      </Section>

      <Section eyebrow="Para que no haya sorpresas" title="Qué NO es Estiky.">
        <div className="grid3">
          <Reveal><Card icon="x" title="No es un empleo"><p>No hay horarios, jefe ni relación laboral.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="x" title="No garantiza un ingreso fijo"><p>Depende de las campañas disponibles y de tus viajes registrados.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="x" title="No cambia tu rutina"><p>No tienes que manejar de más ni ir a lugares específicos.</p></Card></Reveal>
        </div>
      </Section>

      <Section tone="tint" eyebrow="Preguntas frecuentes" title="Lo que preguntan los conductores.">
        <div className="narrow">
          <Faq items={DRV_FAQ.slice(0, 8)} />
          <p className="center-note">Más respuestas en la <Link to="/conductores/ayuda">ayuda para conductores</Link>.</p>
        </div>
      </Section>

      <section className="pilot pilot--driver">
        <Container className="pilot__inner">
          <Reveal className="pilot__copy">
            <span className="sticker sticker--lime">Ciudad de Guatemala</span>
            <h2 className="h2 h2--on">Estamos sumando conductores en Ciudad de Guatemala.</h2>
            <p className="lead lead--on">Crea tu cuenta y te avisamos cuando haya una campaña que encaje con tu auto.</p>
            <Button to="/conductores/registro" variant="pop" icon="arrow" size="lg">Crear cuenta de conductor</Button>
          </Reveal>
          <Reveal className="pilot__art" delay={150}><WrapCar coverage="full" design="estiky" /></Reveal>
        </Container>
      </section>
      <CtaBand tone="ink" title="Empieza hoy tu registro." text="Es gratis crear tu cuenta y subir tus documentos." primary={{ label: 'Crear cuenta de conductor', to: '/conductores/registro' }} secondary={{ label: 'Ya tengo cuenta', to: '/conductores/ingresar' }} />
    </>
  )
}
