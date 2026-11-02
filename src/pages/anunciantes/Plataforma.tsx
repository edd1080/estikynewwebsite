import { Link } from 'react-router-dom'
import { DashboardMock, ImpressionsChart, StatusFlow, LiveMap, TripsCard, Wizard, CampaignList } from '../../components/panel'
import Reveal from '../../components/Reveal'
import Icon from '../../components/Icon'
import { Button, CtaBand, PageHero, Section } from '../../components/ui'
import { ARGS } from '../../lib/platform'
import { useSeo } from '../../lib/seo'

const ROWS = [
  ['Cuándo arrancas', 'Según disponibilidad de espacios y contrato', 'Activas por campaña'],
  ['Qué sabes mientras corre', 'Poco o nada hasta el final del contrato', 'Panel con estado y avance'],
  ['Cómo se mide', 'Estimación de tránsito', 'GPS por viaje'],
  ['Qué puedes ajustar', 'Poco, y con fricción', 'Con datos en la mano, junto a Estiky'],
  ['Carga para tu equipo', 'Coordinar proveedores y permisos', 'Operación gestionada por Estiky'],
  ['Compromiso inicial', 'Largo', 'Una campaña, sin contrato anual'],
]

const TOUR = [
  'Entras con tu cuenta y ves tu resumen: campañas activas, conductores participando, kilómetros medidos e impresiones estimadas.',
  'Tus campañas aparecen separadas por estado: las que están en la calle, las que están en revisión y tus borradores.',
  'Abres una campaña y ves su estado, fechas, presupuesto, cuántos vehículos participan y cuánto se ha medido.',
  'Si algo se rechazó, ahí está el motivo exacto para corregirlo y reenviar.',
  'Consultas los trayectos: cada viaje con distancia y duración, la base de todas tus métricas, en tiempo real.',
]

export default function Plataforma() {
  useSeo('La plataforma para anunciantes', 'Crea, monitorea y administra tus campañas exteriores desde un panel: estado real, avance medido con GPS y evidencia de cada kilómetro.', '/plataforma')
  return (
    <>
      <PageHero
        eyebrow="La plataforma"
        title={<>Tu campaña deja de ser una <span className="hl">caja negra</span>.</>}
        lead="Estiky te da un panel donde ves cómo avanza tu campaña, con qué evidencia y qué decisión tomar."
        actions={<><Button to="/registro" icon="arrow">Crear cuenta de anunciante</Button><Button to="/demo" variant="ghost">Hablar con el equipo</Button></>}
      >
        <div className="floatcards"><ImpressionsChart /><StatusFlow /></div>
      </PageHero>

      <Section eyebrow="Cinco razones" title="Por qué un panel cambia cómo compras publicidad exterior.">
        <div className="args">
          {ARGS.map((a, i) => (
            <Reveal key={a.title} className="arg" delay={(i % 3) * 80}>
              <span className="card__icon"><Icon name={a.icon} size={24} /></span>
              <h3 className="h3">{a.title}</h3>
              <p>{a.body}</p>
              <p className="arg__biz"><b>Para tu negocio:</b> {a.biz}</p>
              <blockquote className="quote">{a.quote}</blockquote>
            </Reveal>
          ))}
          <Reveal className="arg arg--cta" delay={160}>
            <h3 className="h3">Empieza con tu cuenta.</h3>
            <p>Crea tu cuenta de anunciante y arma tu primera campaña desde el panel.</p>
            <Button to="/registro" variant="pop" icon="arrow">Crear cuenta</Button>
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" eyebrow="Recorrido por el panel" title="Un minuto dentro de tu panel.">
        <div className="tour">
          <ol className="tour__steps">
            {TOUR.map((t, i) => (<Reveal as="li" key={t} delay={i * 70}><span>{i + 1}</span><p>{t}</p></Reveal>))}
            <li className="tour__end"><p><b>Lo que ves no es una promesa: es la evidencia de la calle, campaña por campaña.</b></p></li>
          </ol>
          <div className="tour__dash"><DashboardMock initial="campanas" /></div>
        </div>
      </Section>

      <Section eyebrow="Funciones" title="Todo lo que haces desde el panel.">
        <div className="gallery">
          {[
            ['Crea tu campaña', 'Elige zonas, fechas, formato y presupuesto, y envíala a revisión sin intermediarios.', <Wizard />],
            ['Sigue su estado', 'Borrador, en revisión, aprobada, activa o rechazada con motivo. Corriges y reenvías desde el mismo lugar.', <CampaignList />],
            ['Mira tu campaña circular', 'Un mapa en vivo con las zonas objetivo y los vehículos en viaje.', <div className="dcard"><LiveMap big /></div>],
            ['Audita cada trayecto', 'Cada viaje registrado por GPS con su distancia y duración: la evidencia detrás de tus métricas.', <TripsCard />],
          ].map(([t, d, g], i) => (
            <div key={t as string} className={`feature ${i % 2 ? 'feature--rev' : ''}`}>
              <Reveal className="feature__copy"><p className="eyebrow">Función {i + 1}</p><h3 className="h2">{t as string}</h3><p className="lead">{d as string}</p></Reveal>
              <Reveal className="feature__gfx" delay={100}>{g as React.ReactNode}</Reveal>
            </div>
          ))}
        </div>
        <p className="disclaimer">Datos ilustrativos de ejemplo.</p>
      </Section>

      <Section eyebrow="Comparación" title="Estiky frente a la agencia u OOH tradicional." lead="Sin precios: solo lo que te importa al decidir.">
        <Reveal className="table-wrap">
          <table className="table table--compare">
            <thead><tr><th scope="col">Lo que te importa</th><th scope="col">Agencia / OOH tradicional</th><th scope="col" className="is-brand">Estiky</th></tr></thead>
            <tbody>{ROWS.map(([c, a, b]) => (<tr key={c}><th scope="row">{c}</th><td>{a}</td><td className="is-brand">{b}</td></tr>))}</tbody>
          </table>
        </Reveal>
        <p className="center-note">Más criterios en la <Link to="/comparativa">comparativa con vallas</Link>.</p>
      </Section>

      <Section tone="tint" eyebrow="Con honestidad" title="¿Puedo pausar o cambiar todo yo?">
        <div className="narrow">
          <div className="panel">
            <p>Hoy el control que tienes es de <b>visibilidad y decisión</b>: ves el avance, ves el estado y decides con nuestros datos.</p>
            <p>La ejecución —pausar, mover zonas, ajustar presupuesto— la hacemos contigo de forma asistida, para que no se rompa la operación. Es la diferencia entre una herramienta que te abandona y un equipo que responde.</p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="No compras espacio: compras evidencia y control."
        text="Crea tu cuenta, define objetivo, zonas y fechas, y mira qué cobertura es realista y cómo se va a medir."
        primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }}
        secondary={{ label: 'Hablar con ventas', to: '/demo' }}
      />
    </>
  )
}
