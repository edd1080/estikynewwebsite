import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/ui'
import { config } from '../lib/config'
import { useSeo } from '../lib/seo'

const DOCS = {
  terminos: {
    title: 'Términos de uso',
    sections: [
      ['Aceptación', 'Al usar el sitio y los servicios de Estiky aceptas estos términos. Si no estás de acuerdo, no utilices el servicio.'],
      ['El servicio', 'Estiky conecta anunciantes con conductores que instalan wraps publicitarios en sus vehículos. Durante el piloto 2026, aprobaciones, instalación y pagos se gestionan de forma asistida por el equipo.'],
      ['Cuentas', 'Eres responsable de la información que registras y de mantener tus credenciales seguras. Las cuentas tienen un rol: anunciante o conductor.'],
      ['Campañas y contenidos', 'Los anunciantes son responsables de la titularidad y legalidad del arte que entregan. Estiky puede rechazar o pausar contenidos que no cumplan los lineamientos.'],
      ['Medición', 'Las métricas se basan en registros GPS de viajes iniciados por conductores. Las impresiones son estimaciones y no representan personas únicas, recordación ni conversiones.'],
      ['Limitación de responsabilidad', 'El servicio se ofrece en etapa de piloto. Estiky no garantiza resultados comerciales específicos.'],
      ['Cambios', 'Podemos actualizar estos términos. Publicaremos la versión vigente en esta página.'],
    ],
  },
  privacidad: {
    title: 'Política de privacidad',
    sections: [
      ['Qué datos recogemos', 'Datos de contacto y de cuenta; para conductores, documentos de verificación, fotos del vehículo y ubicación GPS únicamente durante viajes activos iniciados por el conductor.'],
      ['Para qué los usamos', 'Operar el servicio, verificar conductores, medir campañas, mostrar métricas, procesar pagos y comunicarnos contigo.'],
      ['Con quién los compartimos', 'Los anunciantes ven métricas agregadas de circulación. No compartimos documentos personales de conductores con anunciantes.'],
      ['Tus derechos', 'Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo al canal legal.'],
      ['Conservación y seguridad', 'Conservamos los datos mientras sea necesario para el servicio y aplicamos medidas de seguridad razonables.'],
      ['Contacto', `Para consultas de privacidad escribe a ${config.legalEmail}.`],
    ],
  },
} as const

export default function Legal() {
  const { doc } = useParams()
  const d = doc === 'privacidad' ? DOCS.privacidad : DOCS.terminos
  useSeo(d.title, `${d.title} de Estiky (borrador sujeto a revisión legal).`, `/legal/${doc === 'privacidad' ? 'privacidad' : 'terminos'}`)
  return (
    <section className="legal">
      <Container>
        <div className="narrow">
          <div className="alert" role="note"><b>Borrador sujeto a revisión legal.</b> Este texto es provisional y puede cambiar antes de su publicación definitiva.</div>
          <h1 className="h1 h1--page">{d.title}</h1>
          <p className="muted">Última actualización: 1 de noviembre de 2026</p>
          {d.sections.map(([t, p], i) => (
            <div key={t} className="legal__sec">
              <h2 className="h3">{i + 1}. {t}</h2>
              <p>{p}</p>
            </div>
          ))}
          <p className="center-note"><Link to="/legal/terminos">Términos</Link> · <Link to="/legal/privacidad">Privacidad</Link></p>
        </div>
      </Container>
    </section>
  )
}
