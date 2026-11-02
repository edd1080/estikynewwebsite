import type { ReactNode } from 'react'
import Icon from './Icon'

export function Phone({ children, tilt = 0, className = '' }: { children: ReactNode; tilt?: number; className?: string }) {
  return (
    <div className={`phone ${className}`} style={{ transform: `rotate(${tilt}deg)` }} aria-hidden="true">
      <div className="phone__notch" />
      <div className="phone__screen">{children}</div>
    </div>
  )
}

function Bar({ title }: { title: string }) {
  return <div className="ph-bar"><b>{title}</b><span><i className="live-dot" /></span></div>
}

export function DriverStart() {
  return (
    <Phone tilt={-4}>
      <Bar title="estiky" />
      <p className="ph-hi">Hola, conductor</p>
      <div className="ph-card ph-card--ok"><Icon name="check" size={16} /> Cuenta verificada</div>
      <div className="ph-map"><svg viewBox="0 0 200 120"><path d="M10 100 C50 40 90 110 130 50 S180 30 195 55" fill="none" stroke="#087F52" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" /><circle cx="130" cy="50" r="7" fill="#087F52" stroke="#fff" strokeWidth="3" /></svg></div>
      <div className="ph-btn">Iniciar viaje</div>
      <p className="ph-note">El GPS solo se activa mientras tu viaje está en curso.</p>
    </Phone>
  )
}
export function DriverTrip() {
  return (
    <Phone tilt={0} className="phone--lg">
      <Bar title="Viaje en curso" />
      <div className="ph-timer">00:27:41</div>
      <div className="ph-stats"><div><small>Distancia</small><b>9.8 km</b></div><div><small>GPS</small><b>Activo</b></div></div>
      <div className="ph-map ph-map--lg"><svg viewBox="0 0 200 160"><rect width="200" height="160" fill="#EEF0F6" /><path d="M0 40 H200 M0 100 H200 M50 0 V160 M130 0 V160" stroke="#fff" strokeWidth="8" /><path d="M20 140 C50 90 80 120 110 70 S160 50 185 20" fill="none" stroke="#087F52" strokeWidth="4" strokeLinecap="round" /><circle cx="110" cy="70" r="14" fill="#087F52" opacity=".2" /><circle cx="110" cy="70" r="7" fill="#087F52" stroke="#fff" strokeWidth="3" /></svg></div>
      <div className="ph-btn ph-btn--stop">Finalizar viaje</div>
    </Phone>
  )
}
export function DriverDocs() {
  const rows: [string, string][] = [['Licencia de conducir', 'Aprobada'], ['Tarjeta de circulación', 'Aprobada'], ['Seguro del vehículo', 'En revisión'], ['Fotos del vehículo', 'Pendiente']]
  return (
    <Phone tilt={4}>
      <Bar title="Verificación" />
      <ul className="ph-list">{rows.map(([t, s]) => (
        <li key={t}><span className={`ph-dot ${s === 'Aprobada' ? 'ok' : s === 'En revisión' ? 'wait' : ''}`} /><div><b>{t}</b><small>{s}</small></div></li>
      ))}</ul>
      <div className="ph-card"><Icon name="camera" size={16} /> Subir foto del vehículo</div>
      <div className="ph-btn">Enviar a revisión</div>
    </Phone>
  )
}
export function AdvPhone() {
  return (
    <Phone tilt={3}>
      <Bar title="Mi panel" />
      <div className="ph-kpis"><div><small>Vehículos</small><b>6</b></div><div><small>Km</small><b>4,862</b></div><div><small>Impr.</small><b>128k</b></div></div>
      <div className="ph-map"><svg viewBox="0 0 200 120"><rect width="200" height="120" fill="#EEF0F6" /><rect x="30" y="30" width="80" height="50" rx="8" fill="#5B3DF5" opacity=".2" /><path d="M10 100 C50 40 90 110 130 50 S180 30 195 55" fill="none" stroke="#5B3DF5" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" /><circle cx="130" cy="50" r="7" fill="#5B3DF5" stroke="#fff" strokeWidth="3" /></svg></div>
      <div className="ph-list ph-list--tight"><li><span className="ph-dot ok" /><div><b>Campaña A</b><small>Activa</small></div></li><li><span className="ph-dot wait" /><div><b>Campaña B</b><small>En revisión</small></div></li></div>
    </Phone>
  )
}
