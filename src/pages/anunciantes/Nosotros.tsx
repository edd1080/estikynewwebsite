import IsoCity from '../../components/IsoCity'
import Reveal from '../../components/Reveal'
import { Button, Card, Check, CtaBand, PageHero, Section } from '../../components/ui'
import { useSeo } from '../../lib/seo'

export default function Nosotros() {
  useSeo('Nosotros', 'Por qué existe Estiky, cómo medimos, dónde operamos y los límites actuales del servicio.', '/nosotros')
  return (
    <>
      <PageHero eyebrow="Nosotros" title={<>La publicidad exterior, <span className="hl">en movimiento</span> y con evidencia.</>} lead="Estiky nace de una idea simple: una marca debería poder salir a la calle sin comprometer un contrato anual y saber qué pasó con su campaña." actions={<Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button>}>
        <IsoCity mode="advertiser" />
      </PageHero>
      <Section eyebrow="Por qué existe" title="Hacer la publicidad exterior más flexible y más medible.">
        <div className="narrow prose">
          <p>La publicidad exterior es poderosa, pero suele implicar compromisos largos y poca visibilidad de lo que ocurre. Estiky conecta marcas con dueños de autos particulares que instalan un wrap publicitario y circulan por la ciudad.</p>
          <p>Así, la marca viaja en autos reales que hacen rutas reales, y la circulación se registra con GPS para que la veas en tu panel en tiempo real.</p>
        </div>
      </Section>
      <Section tone="tint" eyebrow="Cómo medimos" title="Si no lo podemos medir, no lo prometemos.">
        <div className="grid3">
          <Reveal><Card icon="gps" title="GPS en viajes reales"><p>Los viajes los inicia el conductor y se registran con GPS.</p></Card></Reveal>
          <Reveal delay={100}><Card icon="chart" title="Panel en tiempo real"><p>Kilómetros verificados, zonas cubiertas e impresiones estimadas, disponibles cuando los necesites.</p></Card></Reveal>
          <Reveal delay={200}><Card icon="scale" title="Límites claros"><p>No afirmamos personas únicas, recordación ni conversiones.</p></Card></Reveal>
        </div>
      </Section>
      <Section eyebrow="Estado actual" title="Dónde estamos hoy.">
        <div className="split">
          <Reveal className="panel panel--ok"><h3 className="h3">Lo que ya hay</h3><ul className="checks">
            <Check>Operación en Ciudad de Guatemala.</Check>
            <Check>Campaña de prueba <b>Testin 1</b> con viajes registrados por GPS.</Check>
            <Check>Proceso de verificación de conductores en operación.</Check>
          </ul></Reveal>
          <Reveal className="panel" delay={120}><h3 className="h3">Límites actuales</h3><ul className="checks">
            <Check tone="no">La disponibilidad de vehículos varía por zona.</Check>
            <Check tone="no">Sin operación nacional por ahora.</Check>
            <Check tone="no">Aprobaciones, instalación y pagos se gestionan de forma asistida por el equipo.</Check>
          </ul></Reveal>
        </div>
      </Section>
      <CtaBand title="Sé de las primeras marcas en la calle." text="Crea tu cuenta y arma tu primera campaña desde el panel." primary={{ label: 'Crear cuenta de anunciante', to: '/registro' }} secondary={{ label: 'Hablar con ventas', to: '/demo' }} />
    </>
  )
}
