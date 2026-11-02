import { Link } from 'react-router-dom'
import IsoCity from '../../components/IsoCity'
import WrapCar from '../../components/WrapCar'
import RoadTimeline from '../../components/RoadTimeline'
import Reveal from '../../components/Reveal'
import Icon from '../../components/Icon'
import { Button, Check, Container, CtaBand, Faq, Section } from '../../components/ui'
import { DashboardMock } from '../../components/panel'

import { ARGS } from '../../lib/platform'
import { ADV_FAQ } from '../../lib/faq'
import { useSeo } from '../../lib/seo'

const TICKER = ['Lanzamientos', 'Apertura de sucursales', 'Temporadas y promociones', 'Refuerzo local', 'Eventos', 'Zonas objetivo']

export default function Home() {
  useSeo(
    'Publicidad exterior on-demand en Guatemala',
    'Wraps publicitarios en autos reales que circulan por Ciudad de Guatemala, medidos con GPS y visibles en tiempo real desde tu panel. Crea tu cuenta.',
    '/',
  )

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <Container className="hero__inner">
          <div className="hero__copy">
            <span className="sticker sticker--tilt"><span className="live-dot" aria-hidden="true" /> Piloto 2026 · Ciudad de Guatemala</span>
            <h1 className="h1">
              Tu marca, <span className="hl">circulando</span> por toda la ciudad.
            </h1>
            <p className="lead lead--xl">
              Estiky te da un panel donde tu campaña exterior deja de ser una caja negra: la creas, la
              monitoreas y la administras, con cada kilómetro medido por GPS en autos reales.
            </p>
            <div className="btn-row btn-row--hero">
              <Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button>
              <Button to="/plataforma" variant="ghost" size="lg">Ver la plataforma</Button>
            </div>
            <ul className="hero__proof">
              <li><Icon name="check" size={16} /> Panel de control en vivo</li>
              <li><Icon name="check" size={16} /> Medición por GPS</li>
              <li><Icon name="check" size={16} /> Sin contrato anual</li>
            </ul>
          </div>
          <div className="hero__stage">
            <IsoCity mode="advertiser" />
          </div>
        </Container>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i}><i /> {t}</span>
          ))}
        </div>
      </div>

      {/* ───────── PROBLEMA / SOLUCIÓN ───────── */}
      <Section
        eyebrow="Por qué Estiky"
        title={<>La valla se queda en su esquina.<br />Tu marca puede ir a donde está tu cliente.</>}
        lead="La publicidad exterior tradicional vive en un punto fijo. Estiky pone tu mensaje en movimiento por las zonas que eliges y te entrega evidencia de lo que circuló."
      >
        <div className="vs">
          <Reveal className="vs__card vs__card--old">
            <p className="vs__tag">Valla fija</p>
            <h3 className="h3">Un punto, un contrato.</h3>
            <ul className="plain">
              <li>Presencia en una sola ubicación.</li>
              <li>Compromisos largos para ocupar el espacio.</li>
              <li>Poca visibilidad de qué pasó realmente en la campaña.</li>
            </ul>
          </Reveal>
          <div className="vs__arrow" aria-hidden="true"><Icon name="arrow" size={28} /></div>
          <Reveal className="vs__card vs__card--new" delay={120}>
            <p className="vs__tag">Estiky</p>
            <h3 className="h3">Muchas calles, una campaña.</h3>
            <ul className="plain">
              <li>Tu marca recorre las zonas objetivo de tu campaña.</li>
              <li>Activas por campaña, sin atarte a un contrato anual.</li>
              <li>Kilómetros verificados por GPS, en tiempo real.</li>
            </ul>
            <WrapCar className="vs__car" coverage="full" color="#5B3DF5" accent="#C8F31D" text="TU MARCA" />
          </Reveal>
        </div>
      </Section>

      {/* ───────── PLATAFORMA ───────── */}
      <Section
        tone="tint"
        eyebrow="La plataforma"
        title="Tu campaña deja de ser una caja negra."
        lead="Ves cómo avanza, con qué evidencia y qué decisión tomar. Todo desde tu panel."
      >
        <Reveal className="platform-hero"><DashboardMock /></Reveal>
        <ul className="callouts">
          {([['pin', 'Mapa en vivo', 'Zonas objetivo y vehículos en viaje, al momento.'], ['gps', 'Km e impresiones', 'Métricas que se actualizan mientras la campaña circula.'], ['route', 'Trayectos', 'Cada viaje con su distancia y duración.'], ['file', 'Estados claros', 'Borrador, revisión, activa o rechazada con motivo.']] as const).map(([ic, t, d]) => (
            <li key={t}><Icon name={ic} size={22} /><b>{t}</b><span>{d}</span></li>
          ))}
        </ul>
        <p className="disclaimer">Maqueta interactiva: haz clic en el menú lateral. Los datos son ilustrativos.</p>
        <div className="platform-hero" />
        <div className="args args--home">
          {ARGS.map((a, i) => (
            <Reveal key={a.title} className="arg" delay={(i % 3) * 80}>
              <span className="card__icon"><Icon name={a.icon} size={24} /></span>
              <h3 className="h3">{a.title}</h3>
              <p>{a.body}</p>
              <blockquote className="quote">{a.quote}</blockquote>
            </Reveal>
          ))}
          <Reveal className="arg arg--cta" delay={160}>
            <h3 className="h3">Empieza con tu cuenta.</h3>
            <p>Crea tu cuenta de anunciante y arma tu primera campaña desde el panel.</p>
            <Button to="/registro" variant="pop" icon="arrow">Crear cuenta</Button>
            <Link className="arg__link" to="/plataforma">Conocer la plataforma</Link>
          </Reveal>
        </div>
      </Section>

      {/* ───────── CÓMO FUNCIONA ───────── */}
      <Section
        id="como-funciona"
        eyebrow="Cómo funciona"
        title="De tu panel a la calle en cuatro pasos."
        lead="Sigue la ruta: mientras bajas, el auto avanza por las etapas de tu campaña."
      >
        <RoadTimeline
          steps={[
            { icon: 'target', title: 'Crea tu campaña', text: <p>Desde tu panel defines zonas, fechas y presupuesto, y la envías a revisión.</p>, tags: [{ who: 'Tú', what: 'Defines objetivo, zonas y fechas' }, { who: 'Estiky', what: 'Revisa tu solicitud' }] },
            { icon: 'file', title: 'Revisión y propuesta', text: <p>Ves el estado en el panel y recibes una propuesta con formato recomendado, zonas, duración y qué incluye el presupuesto.</p>, tags: [{ who: 'Estiky', what: 'Arma y cotiza la campaña' }, { who: 'Tú', what: 'Apruebas o pides ajustes' }] },
            { icon: 'wrench', title: 'Producción e instalación', text: <p>Producimos el wrap con tu arte aprobado y coordinamos la instalación en los vehículos elegidos.</p>, tags: [{ who: 'Tú', what: 'Apruebas el arte final' }, { who: 'Estiky', what: 'Produce, instala y verifica' }] },
            { icon: 'chart', title: 'Circulación y monitoreo', text: <p>Los autos circulan y ves el avance en tu panel: trayectos, kilómetros, vehículos e impresiones estimadas. Al terminar, el wrap se retira.</p>, tags: [{ who: 'Estiky', what: 'Mide y mantiene tu panel al día' }, { who: 'Tú', what: 'Decides qué ajustar' }] },
          ]}
        />
        <div className="center-cta">
          <Button to="/como-funciona" variant="ghost" icon="arrow">Ver el proceso completo</Button>
        </div>
      </Section>

      {/* ───────── FORMATOS ───────── */}
      <Section
        tone="tint"
        eyebrow="Formatos"
        title="Tres formas de vestir un auto con tu marca."
        lead="Elige según el objetivo de tu campaña. Si no estás seguro, te recomendamos uno en la propuesta."
      >
        <div className="formats">
          {[
            { cov: 'full' as const, name: 'Full wrap', tag: 'Máxima visibilidad', text: 'El vehículo completo con tu marca. Pensado para lanzamientos y campañas que necesitan impacto inmediato.', color: '#5B3DF5', accent: '#C8F31D' },
            { cov: 'plus' as const, name: 'Panel+', tag: 'Cobertura amplia', text: 'Cobertura ampliada de la carrocería. Equilibra visibilidad y presupuesto para campañas sostenidas.', color: '#FF5C7A', accent: '#FFFFFF' },
            { cov: 'panel' as const, name: 'Panel', tag: 'Presencia constante', text: 'Un panel con tu mensaje. Ideal para recordación de marca y refuerzo local.', color: '#15122B', accent: '#C8F31D' },
          ].map((f, i) => (
            <Reveal key={f.name} className="format" delay={i * 100}>
              <div className="format__art">
                <WrapCar coverage={f.cov} color={f.color} accent={f.accent} text="TU MARCA" />
              </div>
              <p className="format__tag">{f.tag}</p>
              <h3 className="h3">{f.name}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="center-cta">
          <Button to="/formatos" variant="ghost" icon="arrow">Comparar formatos</Button>
        </div>
      </Section>

      {/* ───────── MEDICIÓN ───────── */}
      <Section
        eyebrow="Medición"
        title="Lo que se promete, se mide. Y te decimos hasta dónde llega."
        lead="Medimos circulación real, no intuiciones. Y somos claros sobre lo que tus métricas pueden afirmar y lo que no."
      >
        <div className="split">
          <Reveal className="panel panel--ok">
            <h3 className="h3">Lo que medimos</h3>
            <ul className="checks">
              <Check><b>Kilómetros verificados</b> por GPS en viajes reales.</Check>
              <Check><b>Zonas cubiertas</b> por la campaña.</Check>
              <Check><b>Impresiones estimadas</b> a partir de la circulación.</Check>
              <Check><b>Vehículos activos</b> en tu campaña, en vivo.</Check>
            </ul>
          </Reveal>
          <Reveal className="panel panel--no" delay={120}>
            <h3 className="h3">Lo que no afirmamos</h3>
            <ul className="checks">
              <Check tone="no">Personas únicas alcanzadas.</Check>
              <Check tone="no">Recordación de marca.</Check>
              <Check tone="no">Conversiones o ventas atribuidas.</Check>
            </ul>
            <p className="panel__note">Tener claro el límite hace que cada dato de tu panel sea confiable.</p>
          </Reveal>
        </div>
        <div className="center-cta">
          <Button to="/medicion" variant="ghost" icon="arrow">Cómo medimos</Button>
        </div>
      </Section>

      {/* ───────── REPORTE ───────── */}
      <Section
        tone="ink"
        eyebrow="Métricas en vivo"
        title="Tu campaña sobre la mesa, cuando quieras."
        lead="Así se estructuran las métricas de tu panel. Es un ejemplo de estructura: no contiene datos reales."
      >
        <Reveal className="report">
          <div className="report__bar">
            <span className="report__dots" aria-hidden="true"><i /><i /><i /></span>
            <b>Panel en tiempo real · Campaña de ejemplo</b>
            <span className="stamp stamp--light">Ejemplo de estructura</span>
          </div>
          <div className="report__grid">
            {[
              ['Kilómetros verificados', 'XX,XXX', 'gps'],
              ['Zonas cubiertas', 'X de X', 'pin'],
              ['Impresiones estimadas', 'XX,XXX', 'eye'],
              ['Vehículos activos', 'XX', 'car'],
            ].map(([l, v, ic]) => (
              <div key={l} className="report__kpi">
                <Icon name={ic as 'gps'} size={18} />
                <span>{l}</span>
                <b>{v}</b>
              </div>
            ))}
            <div className="report__chart">
              <span>Evolución de la campaña</span>
              <div className="mini-bars mini-bars--lg" aria-hidden="true">
                {[34, 48, 42, 64, 58, 80, 72].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
              </div>
            </div>
            <div className="report__map" aria-hidden="true">
              <span>Mapa de recorridos</span>
              <svg viewBox="0 0 200 120"><path d="M10 100 C40 20, 80 110, 110 50 S170 20, 190 70" /><circle cx="110" cy="50" r="6" /></svg>
            </div>
          </div>
          <p className="report__foot">Incluye además resumen de campaña y notas operativas para decidir qué ajustar sin esperar a nadie.</p>
        </Reveal>
        <div className="center-cta">
          <Button to="/medicion" variant="pop" icon="arrow">Ver qué mides en tu panel</Button>
        </div>
      </Section>

      {/* ───────── CASOS ───────── */}
      <Section
        eyebrow="Casos de uso"
        title="Para cada momento de tu marca."
        lead="Cuatro situaciones en las que una campaña en movimiento hace sentido."
      >
        <div className="cases">
          {[
            { icon: 'rocket', t: 'Lanzamiento', d: 'Presenta un producto o marca nueva con presencia visible desde el primer día.' },
            { icon: 'store', t: 'Apertura de sucursal', d: 'Lleva a la gente al nuevo punto: tu marca circula por las zonas cercanas.' },
            { icon: 'tag', t: 'Temporada o promoción', d: 'Activa justo cuando lo necesitas y retira al terminar. Sin atarte por un año.' },
            { icon: 'target', t: 'Refuerzo local', d: 'Si ya inviertes en otros medios, suma presencia en las zonas que más te importan.' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 80} className="case">
              <span className="case__icon"><Icon name={c.icon as 'rocket'} size={26} /></span>
              <h3 className="h3">{c.t}</h3>
              <p>{c.d}</p>
            </Reveal>
          ))}
        </div>
        <div className="center-cta">
          <Button to="/casos-de-uso" variant="ghost" icon="arrow">Ver los casos</Button>
        </div>
      </Section>

      {/* ───────── CONFIANZA ───────── */}
      <Section
        tone="tint"
        eyebrow="Operación y confianza"
        title="Tu marca viaja en manos verificadas."
        lead="Operamos de forma asistida: el equipo de Estiky gestiona aprobaciones, instalación y retiro."
      >
        <div className="trust">
          {[
            { icon: 'id', t: 'Conductores verificados', d: 'Cada conductor pasa por un proceso de verificación de identidad y documentos antes de circular.' },
            { icon: 'car', t: 'Vehículos elegibles', d: 'Solo circulan autos que cumplen los criterios de elegibilidad para el formato de tu campaña.' },
            { icon: 'wrench', t: 'Instalación coordinada', d: 'El equipo coordina la instalación para que el wrap quede como lo aprobaste.' },
            { icon: 'check', t: 'Retiro al finalizar', d: 'Cuando termina la campaña, el wrap se retira. Tu marca no queda circulando sin control.' },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 80} className="trust__item">
              <span className="trust__icon"><Icon name={x.icon as 'id'} size={22} /></span>
              <div><h3 className="h3">{x.t}</h3><p>{x.d}</p></div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────── PILOTO ───────── */}
      <section className="pilot">
        <Container className="pilot__inner">
          <Reveal className="pilot__copy">
            <span className="sticker sticker--lime">Piloto cerrado 2026</span>
            <h2 className="h2 h2--on">Estamos abriendo las primeras campañas.</h2>
            <p className="lead lead--on">
              Operamos en Ciudad de Guatemala con un número limitado de campañas y vehículos. Para
              anunciantes seleccionados, la instalación del wrap no tiene costo. Ya tenemos viajes con GPS
              registrados en nuestra campaña de prueba, <b>Testin 1</b>.
            </p>
            <div className="btn-row">
              <Button to="/registro" variant="pop" icon="arrow" size="lg">Crear cuenta</Button>
              <Button to="/inversion" variant="ghost-on" size="lg">Condiciones del piloto</Button>
            </div>
          </Reveal>
          <Reveal className="pilot__art" delay={150}>
            <WrapCar coverage="full" design="estiky" />
          </Reveal>
        </Container>
      </section>

      {/* ───────── FAQ ───────── */}
      <Section eyebrow="Preguntas frecuentes" title="Lo que suelen preguntar las marcas.">
        <div className="narrow">
          <Faq items={ADV_FAQ.slice(0, 8)} />
          <p className="center-note">¿Más dudas? Visita la <Link to="/ayuda">ayuda para anunciantes</Link> o <Link to="/contacto">escríbenos</Link>.</p>
        </div>
      </Section>

      <CtaBand
        title="Toma el control de tu próxima campaña."
        text="Crea tu cuenta de anunciante, arma tu campaña y sigue su avance desde el panel. Si prefieres hablarlo antes, el equipo te acompaña."
        primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }}
        secondary={{ label: 'Hablar con ventas', to: '/demo' }}
      />
    </>
  )
}
