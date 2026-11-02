import type { IconName } from '../components/Icon'

export const ARGS: { icon: IconName; title: string; body: string; biz: string; quote: string }[] = [
  {
    icon: 'target',
    title: 'Autonomía: tú mandas en tu campaña',
    body: 'Creas la campaña cuando la necesitas, defines zonas, fechas y presupuesto, y la envías a revisión desde el mismo panel.',
    biz: 'Dejas de esperar a que una agencia te arme un plan y te pase una cotización por correo.',
    quote: 'Tú decides el alcance; nosotros ejecutamos la calle.',
  },
  {
    icon: 'eye',
    title: 'Visibilidad: ya no es una caja negra',
    body: 'El panel te muestra el estado real de cada campaña —aprobada, activa, en revisión o rechazada con motivo— y su avance: kilómetros, zonas, vehículos participando e impresiones estimadas, en tiempo real.',
    biz: 'Puedes informar a dirección o a finanzas cuando quieras, sin pedir un reporte y esperar días.',
    quote: 'Lo que otros te cuentan al final del contrato, tú lo ves mientras está pasando.',
  },
  {
    icon: 'gps',
    title: 'Evidencia: cada kilómetro tiene respaldo',
    body: 'La circulación se registra con GPS por viaje, no con estimaciones de tránsito.',
    biz: 'Defiendes la inversión con datos verificables, no con una foto del anuncio.',
    quote: 'No te vendemos “mucha gente pasó”. Te mostramos dónde y cuánto circuló tu marca.',
  },
  {
    icon: 'shield',
    title: 'Riesgo controlado: empiezas acotado',
    body: 'El piloto es una campaña concreta, con cupo y duración definidos. Ves resultados y decides si amplías.',
    biz: 'Pruebas exterior sin comprometer un contrato anual ni un presupuesto grande de arranque.',
    quote: 'Empiezas con una campaña, no con un año.',
  },
  {
    icon: 'wrench',
    title: 'Cero carga operativa',
    body: 'Verificamos conductores y vehículos, producimos e instalamos el wrap, coordinamos el retiro y mantenemos tu panel al día.',
    biz: 'Tu equipo de marketing se concentra en la campaña, no en logística.',
    quote: 'Tú te enfocas en la marca; la operación corre por nuestra cuenta.',
  },
]
