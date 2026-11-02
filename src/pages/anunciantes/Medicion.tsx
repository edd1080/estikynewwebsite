import Reveal from '../../components/Reveal'
import { LiveMap, TripsCard } from '../../components/panel'
import Icon from '../../components/Icon'
import { Button, Card, Check, CtaBand, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

export default function Medicion() {
  useSeo('Medición con GPS en tiempo real', 'Qué es un kilómetro verificado, una zona cubierta y una impresión estimada. Metodología, límites y métricas de tu panel en tiempo real.', '/medicion')
  return (
    <>
      <PageHero
        eyebrow="Medición y métricas"
        title={<>Cada kilómetro <span className="hl">verificado</span>, en tiempo real.</>}
        lead="La circulación de tu campaña se registra con GPS durante viajes reales y la ves en tu panel en cualquier momento. Aquí está exactamente qué medimos, cómo y hasta dónde llegan las conclusiones."
        actions={<Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button>}
      >
        <div className="gps-art" aria-hidden="true">
          <svg viewBox="0 0 320 240">
            <path className="gps-art__route" d="M20 200 C60 60, 120 220, 170 110 S270 60, 300 120" />
            <circle className="gps-art__pulse" cx="170" cy="110" r="10" />
            <circle cx="170" cy="110" r="7" fill="var(--brand)" />
          </svg>
          <span className="bubble bubble--advertiser gps-art__b"><i className="bubble__eye" /><b>GPS</b><span>viaje registrado</span></span>
        </div>
      </PageHero>

      <Section eyebrow="Definiciones" title="Tres conceptos que verás en tu panel.">
        <div className="grid3">
          <Reveal><Card icon="gps" title="Kilómetro verificado"><p>Distancia recorrida por un vehículo de tu campaña durante un viaje iniciado por el conductor y registrado por GPS.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="pin" title="Zona cubierta"><p>Zona objetivo por la que circularon los vehículos de tu campaña hasta hoy.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="eye" title="Impresión estimada"><p>Estimación de oportunidades de exposición de tu marca, calculada a partir de la circulación verificada por zona.</p></Card></Reveal>
        </div>
      </Section>

      <Section tone="tint" eyebrow="Metodología" title="Cómo se registra, de punta a punta.">
        <div className="steps3">
          {[
            { n: '1', t: 'El conductor inicia el viaje', d: 'El GPS se activa solo mientras hay un viaje en curso. Cuando el conductor lo finaliza, deja de registrar.' },
            { n: '2', t: 'Se verifica la distancia', d: 'La app registra el recorrido y se valida para contarlo como kilómetro verificado.' },
            { n: '3', t: 'Se agrupa por zonas y campaña', d: 'Los viajes se asignan a las zonas de tu campaña y se reflejan en tu panel.' },
          ].map((s, i) => (
            <Reveal key={s.n} className="steps3__item" delay={i * 100}><span className="steps3__n">{s.n}</span><h3 className="h3">{s.t}</h3><p>{s.d}</p></Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Así se ve" title="La evidencia, en tu panel.">
        <div className="split"><Reveal><div className="dcard"><div className="dcard__h"><b>Mapa en vivo</b><span className="dtag">Datos ilustrativos</span></div><LiveMap /></div></Reveal><Reveal delay={100}><TripsCard compact /></Reveal></div>
      </Section>

      <Section tone="tint" eyebrow="Honestidad por diseño" title="Lo que puedes y no puedes afirmar con tus métricas.">
        <div className="split">
          <Reveal className="panel panel--ok">
            <h3 className="h3">Puedes afirmar</h3>
            <ul className="checks">
              <Check>Tu campaña circuló X kilómetros verificados.</Check>
              <Check>Cubrió estas zonas hasta hoy.</Check>
              <Check>Se estiman estas impresiones a partir de esa circulación.</Check>
              <Check>Estos vehículos estuvieron activos.</Check>
            </ul>
          </Reveal>
          <Reveal className="panel panel--no" delay={120}>
            <h3 className="h3">No se puede afirmar</h3>
            <ul className="checks">
              <Check tone="no">Cuántas personas únicas vieron tu marca.</Check>
              <Check tone="no">Cuánto recuerdan tu marca.</Check>
              <Check tone="no">Cuántas ventas o conversiones generó.</Check>
            </ul>
            <p className="panel__note">Si necesitas medir recordación o conversiones, puedes combinar Estiky con tus propias herramientas.</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="ink" eyebrow="Tu panel" title="Qué ves en tu panel, en cualquier momento." lead="Ejemplo de estructura. Los valores se muestran como marcadores, no son datos reales.">
        <Reveal className="report report--wide">
          <div className="report__bar"><span className="report__dots" aria-hidden="true"><i /><i /><i /></span><b>Panel en tiempo real · Campaña de ejemplo</b><span className="stamp stamp--light">Ejemplo de estructura</span></div>
          <div className="report__sections">
            {[
              ['file', 'Resumen de campaña', 'Objetivo, formato, vehículos y periodo.'],
              ['gps', 'Kilómetros verificados', 'Total acumulado y evolución a lo largo de la campaña.'],
              ['pin', 'Zonas cubiertas', 'Qué zonas se recorrieron y con qué intensidad relativa.'],
              ['eye', 'Impresiones estimadas', 'Estimación acumulada y por zona.'],
              ['car', 'Vehículos activos', 'Cuántos vehículos están circulando en tu campaña.'],
              ['chat', 'Notas operativas', 'Incidencias, ajustes y recomendaciones del equipo.'],
            ].map(([ic, t, d]) => (
              <div key={t} className="report__sec"><Icon name={ic as 'gps'} size={20} /><div><b>{t}</b><span>{d}</span></div><em>XX,XXX</em></div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Decisiones" title="Qué decisiones te permiten tomar tus métricas.">
        <ul className="checks checks--grid">
          <Check>Reforzar zonas donde la circulación fue menor a lo esperado.</Check>
          <Check>Ampliar la campaña con más vehículos en las zonas más relevantes.</Check>
          <Check>Cambiar de formato en la siguiente etapa.</Check>
          <Check>Decidir si renuevas, pausas o cierras la campaña.</Check>
        </ul>
      </Section>

      <CtaBand title="Mide lo que importa, sin letra chica." text="Solicita una propuesta y revisa con el equipo cómo se vería el panel de tu campaña." primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }} secondary={{ label: 'Hablar con ventas', to: '/demo' }} />
    </>
  )
}
