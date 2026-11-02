import Icon from './Icon'

const ROWS = [
  { name: 'Campaña de ejemplo A', st: 'Activa', cls: 'ok', pct: 68 },
  { name: 'Campaña de ejemplo B', st: 'En revisión', cls: 'wait', pct: 0 },
  { name: 'Campaña de ejemplo C', st: 'Rechazada · motivo visible', cls: 'no', pct: 0 },
]

/** Maqueta ilustrativa del panel del anunciante. No contiene datos reales. */
export default function PanelMock({ className = '' }: { className?: string }) {
  return (
    <div className={`panelmock ${className}`} role="img" aria-label="Vista ilustrativa del panel del anunciante con resumen, campañas por estado y avance. No contiene datos reales.">
      <div className="panelmock__bar">
        <span className="report__dots" aria-hidden="true"><i /><i /><i /></span>
        <b>Panel del anunciante</b>
        <span className="stamp stamp--light">Vista ilustrativa</span>
      </div>
      <div className="panelmock__body" aria-hidden="true">
        <div className="panelmock__kpis">
          {[['Campañas activas', 'X', 'target'], ['Vehículos participando', 'XX', 'car'], ['Km medidos', 'XX,XXX', 'gps'], ['Impresiones estimadas', 'XX,XXX', 'eye']].map(([l, v, ic]) => (
            <div key={l} className="report__kpi"><Icon name={ic as 'gps'} size={18} /><span>{l}</span><b>{v}</b></div>
          ))}
        </div>
        <div className="panelmock__tabs"><span className="is-on">Activas</span><span>En revisión</span><span>Borradores</span></div>
        <ul className="panelmock__list">
          {ROWS.map((r) => (
            <li key={r.name}>
              <div><b>{r.name}</b><small>Zonas · Fechas · Presupuesto</small></div>
              <div className="panelmock__prog"><i style={{ width: `${r.pct}%` }} /></div>
              <span className={`chip chip--${r.cls}`}>{r.st}</span>
            </li>
          ))}
        </ul>
        <div className="panelmock__trips">
          <Icon name="route" size={18} /> <span>Trayectos: cada viaje con distancia y duración, la base de todas tus métricas, en tiempo real.</span>
        </div>
      </div>
    </div>
  )
}
