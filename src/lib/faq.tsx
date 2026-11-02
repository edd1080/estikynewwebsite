import { Link } from 'react-router-dom'
import type { QA } from '../components/ui'

export const ADV_FAQ: QA[] = [
  {
    cat: 'Campañas',
    q: '¿Qué es la publicidad vehicular on-demand?',
    a: <p>Es publicidad exterior que se activa por campaña: tu marca va impresa en un wrap instalado en autos particulares reales que circulan por Ciudad de Guatemala. A diferencia de una valla, no está fija en un punto: se mueve con los vehículos y su circulación queda registrada con GPS.</p>,
  },
  {
    cat: 'Campañas',
    q: '¿Puedo elegir las zonas donde circula mi campaña?',
    a: <p>Sí. Defines las zonas objetivo en el brief y la propuesta se arma alrededor de ellas. Durante el piloto 2026 la cobertura depende de los vehículos disponibles en cada zona; te lo confirmamos antes de producir nada.</p>,
  },
  {
    cat: 'Campañas',
    q: '¿Cuánto tarda en arrancar una campaña?',
    a: <p>Depende de la aprobación del diseño, la producción del wrap y la instalación. La idea del servicio es activar en semanas, no en meses. Los tiempos aproximados de tu campaña vienen en la propuesta.</p>,
  },
  {
    cat: 'Campañas',
    q: '¿Qué pasa si mi campaña se rechaza o necesito pausarla?',
    a: <p>Si el arte o la solicitud no pasan la revisión, te indicamos el motivo y qué ajustar para volver a enviarla. Si necesitas pausar, avisas a tu contacto en Estiky y el equipo coordina el cambio con los conductores. Más detalle en <Link to="/como-funciona">Cómo funciona</Link>.</p>,
  },
  {
    cat: 'Medición',
    q: '¿Cómo se mide la circulación?',
    a: <p>Con GPS, durante viajes que inicia el propio conductor. De ahí salen los kilómetros verificados, las zonas cubiertas y las impresiones estimadas que ves en tu panel en cualquier momento. La metodología completa está en <Link to="/medicion">Medición y reportes</Link>.</p>,
  },
  {
    cat: 'Medición',
    q: '¿Qué significa que las impresiones sean “estimadas”?',
    a: <p>Que se calculan a partir de la circulación verificada y las zonas recorridas; no son un conteo de personas. Por eso no afirmamos personas únicas, recordación ni conversiones.</p>,
  },
  {
    cat: 'Formatos',
    q: '¿Qué formato me conviene?',
    a: <p>Full wrap busca la máxima visibilidad, Panel+ equilibra cobertura y presupuesto, y Panel sirve para presencia constante y recordatorio de marca. Lo vemos contigo en el brief; también puedes revisar los <Link to="/formatos">formatos</Link>.</p>,
  },
  {
    cat: 'Presupuesto',
    q: '¿Cuánto cuesta?',
    a: <p>No publicamos tarifas porque cada campaña se cotiza según zonas, duración y formato. Solicita una propuesta y recibes el presupuesto con el detalle de qué incluye. Ver <Link to="/inversion">Inversión</Link>.</p>,
  },
  {
    cat: 'Presupuesto',
    q: '¿Qué incluye el presupuesto?',
    a: <p>Diseño y producción del wrap, instalación y retiro, circulación con medición y acceso a tu panel en tiempo real.</p>,
  },
  {
    cat: 'Operación',
    q: '¿Cómo cuidan mi marca?',
    a: <p>Los conductores pasan por un proceso de verificación, solo circulan vehículos elegibles, la instalación se coordina con el equipo y al terminar la campaña el wrap se retira.</p>,
  },
  {
    cat: 'Operación',
    q: '¿Qué es el piloto cerrado 2026?',
    a: <p>Es la etapa actual de Estiky: operamos en Ciudad de Guatemala con un número limitado de campañas y vehículos. Para anunciantes seleccionados, la instalación no tiene costo.</p>,
  },
]

export const DRV_FAQ: QA[] = [
  {
    cat: 'Registro',
    q: '¿Qué es Estiky para un conductor?',
    a: <p>Es una plataforma que conecta tu auto con marcas que quieren publicidad exterior. Instalas un wrap en tu vehículo, sigues con tu rutina y registras tus viajes desde la app.</p>,
  },
  {
    cat: 'Registro',
    q: '¿Esto es un empleo?',
    a: <p>No. No hay horario, jefe ni relación laboral. Tú decides cuándo inicias y detienes tus viajes. Tampoco se garantiza un ingreso fijo.</p>,
  },
  {
    cat: 'Registro',
    q: '¿Tengo que cambiar mis rutas?',
    a: <p>No. Estiky está pensado para tu rutina de siempre. No te pedimos manejar de más ni ir a lugares específicos.</p>,
  },
  {
    cat: 'Verificación',
    q: '¿Qué documentos necesito?',
    a: <p>Licencia de conducir, tarjeta de circulación y seguro del vehículo, además de fotos de tu auto. El detalle está en <Link to="/conductores/requisitos">Requisitos y verificación</Link>.</p>,
  },
  {
    cat: 'Verificación',
    q: '¿Qué pasa si rechazan mi solicitud?',
    a: <p>Te indicamos el motivo desde la app. Si es algo corregible (una foto borrosa, un documento vencido), puedes subirlo de nuevo y volver a enviar.</p>,
  },
  {
    cat: 'Instalación',
    q: '¿Quién paga la instalación del wrap?',
    a: <p>La instalación y el retiro los coordina Estiky; no los pagas tú. Te avisamos fecha, lugar y qué esperar.</p>,
  },
  {
    cat: 'Instalación',
    q: '¿Qué pasa cuando termina la campaña?',
    a: <p>Se coordina el retiro del wrap con el equipo. Después puedes quedar disponible para una próxima campaña, si hay una que encaje con tu vehículo.</p>,
  },
  {
    cat: 'Viajes',
    q: '¿Cuándo se activa el GPS?',
    a: <p>Solo durante los viajes que tú inicias en la app, y se detiene cuando los finalizas. Fuera de un viaje activo no se registra tu ubicación.</p>,
  },
  {
    cat: 'Pagos',
    q: '¿Cuándo y cómo se paga?',
    a: <p>Los pagos son quincenales y se hacen por transferencia. El detalle de tu cuenta lo consultas dentro de la app una vez que está verificada.</p>,
  },
  {
    cat: 'Instalación',
    q: '¿Puedo quitar el wrap por mi cuenta?',
    a: <p>No. El retiro lo coordina el equipo de Estiky para no dañar tu vehículo ni la campaña.</p>,
  },
  {
    cat: 'Viajes',
    q: '¿Tengo que dejar la app abierta?',
    a: <p>Mientras tengas un viaje activo, la app registra el recorrido. Al finalizarlo, deja de registrar.</p>,
  },
  {
    cat: 'Viajes',
    q: '¿Qué pasa si olvido finalizar un viaje?',
    a: <p>Finalízalo en cuanto lo recuerdes. Si hay un registro raro, el equipo puede revisarlo contigo desde soporte.</p>,
  },
  {
    cat: 'Pagos',
    q: '¿Dónde veo el detalle de mi cuenta?',
    a: <p>Dentro de la app, cuando tu cuenta está verificada.</p>,
  },
]
