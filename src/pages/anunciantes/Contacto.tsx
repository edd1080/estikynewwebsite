import { AdvPhone } from '../../components/phones'
import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import Icon from '../../components/Icon'
import { Button, Card, PageHero, Section } from '../../components/ui'
import { config } from '../../lib/config'
import { useSeo } from '../../lib/seo'

export default function Contacto() {
  useSeo('Contacto', 'Canales de contacto de Estiky por área: ventas, soporte y legal.', '/contacto')
  const areas = [
    { icon: 'store', t: 'Ventas', d: 'Propuestas, campañas y presupuestos para anunciantes.', mail: config.salesEmail },
    { icon: 'chat', t: 'Soporte', d: 'Ayuda con tu cuenta, campañas activas y métricas.', mail: config.supportEmail },
    { icon: 'scale', t: 'Legal', d: 'Términos, privacidad y consultas legales.', mail: config.legalEmail },
  ]
  return (
    <>
      <PageHero eyebrow="Contacto" title={<>Hablemos de tu <span className="hl">próxima campaña</span>.</>} lead="Elige el canal según lo que necesites." actions={<Button to="/registro" icon="arrow" size="lg">Crear cuenta de anunciante</Button>}>
        <AdvPhone />
      </PageHero>
      <Section>
        <div className="grid3">
          {areas.map((a, i) => (
            <Reveal key={a.t} delay={i * 80}>
              <Card icon={a.icon as 'mail'} title={a.t}>
                <p>{a.d}</p>
                <p><a className="link" href={`mailto:${a.mail}`}><Icon name="mail" size={16} /> {a.mail}</a></p>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="center-note">Operamos desde Ciudad de Guatemala. ¿Eres conductor? Visita la <Link className="link" to="/conductores/ayuda">ayuda para conductores</Link>.</p>
      </Section>
    </>
  )
}
