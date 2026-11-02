import { useEffect, useState, type ReactNode } from 'react'
import Icon, { type IconName } from './Icon'

/* Todos los datos de estos mockups son ilustrativos. */

export function Spark({ data, color = 'var(--brand)', fill = true }: { data: number[]; color?: string; fill?: boolean }) {
  const max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => [(i / (data.length - 1)) * 100, 28 - ((v - min) / (max - min || 1)) * 24] as const)
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  return (
    <svg className="spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      {fill && <path d={`${d} L100 32 L0 32Z`} fill={color} opacity=".12" />}
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function Kpi({ icon, label, value, delta, data }: { icon: IconName; label: string; value: string; delta: string; data: number[] }) {
  return (
    <div className="dkpi">
      <div className="dkpi__top"><span className="dkpi__ic"><Icon name={icon} size={16} /></span><span>{label}</span></div>
      <b>{value}</b>
      <div className="dkpi__bot"><em>{delta}</em><Spark data={data} /></div>
    </div>
  )
}

/* ───────── Mapa en vivo ───────── */
export function LiveMap({ big = false }: { big?: boolean }) {
  const routes = [
    'M30 210 C80 150 120 190 170 120 S260 60 330 90',
    'M60 60 C110 100 140 40 200 80 S300 170 380 150',
    'M40 150 C100 110 160 170 230 130 S330 190 390 200',
  ]
  return (
    <div className={`lmap ${big ? 'lmap--big' : ''}`}>
      <svg viewBox="0 0 420 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="420" height="260" fill="#EEF0F6" />
        {[40, 100, 160, 220].map((y) => <rect key={y} x="0" y={y} width="420" height="9" fill="#fff" />)}
        {[50, 120, 190, 260, 330, 390].map((x) => <rect key={x} x={x} y="0" width="9" height="260" fill="#fff" />)}
        <rect x="266" y="168" width="64" height="44" rx="6" fill="#CDEFB6" /><rect x="64" y="12" width="48" height="22" rx="6" fill="#CDEFB6" />
        <g>
          <rect x="125" y="44" width="136" height="52" rx="10" fill="#5B3DF5" opacity=".22" stroke="#5B3DF5" strokeDasharray="5 4" />
          <rect x="195" y="105" width="130" height="58" rx="10" fill="#5B3DF5" opacity=".16" stroke="#5B3DF5" strokeDasharray="5 4" />
          <rect x="14" y="108" width="100" height="48" rx="10" fill="#5B3DF5" opacity=".12" stroke="#5B3DF5" strokeDasharray="5 4" />
        </g>
        {routes.map((r, i) => <path key={i} d={r} fill="none" stroke="#5B3DF5" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7" opacity=".7" />)}
        {routes.map((r, i) => (
          <g key={'v' + i}>
            <circle r="13" fill="#5B3DF5" opacity=".2"><animateMotion dur={`${14 + i * 4}s`} repeatCount="indefinite" path={r} /></circle>
            <circle r="6" fill="#5B3DF5" stroke="#fff" strokeWidth="2.5"><animateMotion dur={`${14 + i * 4}s`} repeatCount="indefinite" path={r} /></circle>
          </g>
        ))}
        {[['Zona 10', 193, 42], ['Zona 14', 260, 104], ['Zona 4', 64, 106]].map(([t, x, y]) => (
          <g key={t as string}><rect x={x as number} y={y as number} width="46" height="15" rx="7.5" fill="#15122B" /><text x={(x as number) + 23} y={(y as number) + 10.5} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="Inter Variable, Arial, sans-serif">{t as string}</text></g>
        ))}
      </svg>
      <span className="lmap__live"><i /> En vivo</span>
      <div className="lmap__legend"><span><i className="a" /> Vehículo en viaje</span><span><i className="b" /> Zona objetivo</span></div>
    </div>
  )
}

/* ───────── Trayectos ───────── */
const TRIPS = [
  ['Vehículo 03', 'Zona 10', '12.4 km', '38 min', 'En curso'],
  ['Vehículo 07', 'Zona 14', '8.9 km', '27 min', 'En curso'],
  ['Vehículo 01', 'Zona 4', '15.2 km', '52 min', 'Finalizado'],
  ['Vehículo 05', 'Zona 10', '6.1 km', '19 min', 'Finalizado'],
  ['Vehículo 02', 'Zona 14', '10.7 km', '34 min', 'Finalizado'],
]
export function TripsCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="dcard">
      <div className="dcard__h"><b>Trayectos</b><span className="dtag">Distancia y duración por viaje</span></div>
      <table className="dtable">
        <thead><tr><th>Vehículo</th><th>Zona</th><th>Distancia</th><th>Duración</th><th>Estado</th></tr></thead>
        <tbody>
          {TRIPS.slice(0, compact ? 3 : 5).map((t) => (
            <tr key={t[0] + t[3]}><td><b>{t[0]}</b></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td><td><span className={`chip ${t[4] === 'En curso' ? 'chip--ok' : 'chip--wait'}`}>{t[4]}</span></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ───────── Estados de campaña ───────── */
const CAMPS = [
  { n: 'Campaña de ejemplo A', z: 'Zona 10 · Zona 14', f: '1 – 30 nov', st: 'Activa', c: 'ok', p: 62, v: 6 },
  { n: 'Campaña de ejemplo B', z: 'Zona 4', f: '5 – 20 dic', st: 'En revisión', c: 'wait', p: 0, v: 0 },
  { n: 'Campaña de ejemplo C', z: 'Zona 9', f: '10 – 24 nov', st: 'Rechazada', c: 'no', p: 0, v: 0 },
  { n: 'Campaña de ejemplo D', z: 'Zona 1 · Zona 4', f: 'Sin fechas', st: 'Borrador', c: 'draft', p: 0, v: 0 },
]
export function CampaignList() {
  return (
    <div className="dcard">
      <div className="dcard__h"><b>Mis campañas</b><span className="dtag">Estado real de cada una</span></div>
      <ul className="dcamps">
        {CAMPS.map((c) => (
          <li key={c.n}>
            <div className="dcamps__n"><b>{c.n}</b><small>{c.z} · {c.f}</small></div>
            <div className="dcamps__p"><div><i style={{ width: `${c.p}%` }} /></div><small>{c.v ? `${c.v} vehículos` : '—'}</small></div>
            <span className={`chip chip--${c.c}`}>{c.st}</span>
          </li>
        ))}
      </ul>
      <div className="dreject">
        <Icon name="x" size={16} />
        <div><b>Campaña C rechazada · motivo</b><p>El arte no respeta el área segura del wrap. Ajusta los márgenes y reenvía a revisión.</p></div>
        <span className="dbtn">Corregir y reenviar</span>
      </div>
    </div>
  )
}

export function StatusFlow() {
  const steps = ['Borrador', 'En revisión', 'Aprobada', 'Activa', 'Finalizada']
  return (
    <div className="dcard">
      <div className="dcard__h"><b>Ciclo de tu campaña</b><span className="dtag">Siempre sabes dónde está</span></div>
      <ol className="flow">
        {steps.map((s, i) => (
          <li key={s} className={i < 4 ? 'done' : ''}>
            <span>{i < 3 ? <Icon name="check" size={14} /> : i === 3 ? <i className="live-dot" /> : ''}</span>
            <b>{s}</b>
          </li>
        ))}
      </ol>
      <div className="dreject dreject--wait"><Icon name="clock" size={16} /><div><b>Si algo se rechaza</b><p>Ves el motivo exacto, lo corriges y reenvías desde el mismo panel.</p></div></div>
    </div>
  )
}

/* ───────── Crear campaña ───────── */
export function Wizard() {
  const [zones, setZones] = useState<string[]>(['Zona 10', 'Zona 14'])
  const [fmt, setFmt] = useState('Panel+')
  const toggle = (z: string) => setZones((s) => (s.includes(z) ? s.filter((x) => x !== z) : [...s, z]))
  return (
    <div className="dcard wiz">
      <div className="dcard__h"><b>Nueva campaña</b><span className="dtag">Paso 2 de 4</span></div>
      <div className="wiz__steps">{['Objetivo', 'Zonas y fechas', 'Formato', 'Revisión'].map((s, i) => <span key={s} className={i < 2 ? 'on' : ''}>{s}</span>)}</div>
      <div className="wiz__f"><label>Zonas objetivo</label>
        <div className="wiz__chips">{['Zona 1', 'Zona 4', 'Zona 9', 'Zona 10', 'Zona 14', 'Zona 15'].map((z) => (
          <button type="button" key={z} className={zones.includes(z) ? 'on' : ''} aria-pressed={zones.includes(z)} onClick={() => toggle(z)}>{z}</button>
        ))}</div>
      </div>
      <div className="wiz__row">
        <div className="wiz__f"><label>Inicio</label><div className="wiz__in"><Icon name="calendar" size={14} /> 1 nov 2026</div></div>
        <div className="wiz__f"><label>Fin</label><div className="wiz__in"><Icon name="calendar" size={14} /> 30 nov 2026</div></div>
      </div>
      <div className="wiz__f"><label>Formato</label>
        <div className="wiz__chips">{['Full wrap', 'Panel+', 'Panel'].map((z) => (
          <button type="button" key={z} className={fmt === z ? 'on' : ''} aria-pressed={fmt === z} onClick={() => setFmt(z)}>{z}</button>
        ))}</div>
      </div>
      <div className="wiz__f"><label>Presupuesto (tu rango)</label><div className="wiz__slider"><i /><b /></div></div>
      <span className="dbtn dbtn--full">Enviar a revisión <Icon name="arrow" size={16} /></span>
    </div>
  )
}

/* ───────── Gráfica de impresiones ───────── */
export function ImpressionsChart() {
  const a = [22, 30, 28, 40, 38, 52, 49, 63, 60, 74, 82, 91]
  const max = 100
  const d = a.map((v, i) => `${i ? 'L' : 'M'}${(i / (a.length - 1)) * 400} ${120 - (v / max) * 110}`).join(' ')
  return (
    <div className="dcard">
      <div className="dcard__h"><b>Impresiones estimadas</b><span className="dtag">Acumulado de la campaña</span></div>
      <svg className="dchart" viewBox="0 0 400 130" preserveAspectRatio="none" aria-hidden="true">
        {[20, 55, 90].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(21,18,43,.08)" />)}
        <path d={`${d} L400 130 L0 130Z`} fill="var(--brand)" opacity=".12" />
        <path d={d} fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <circle cx="400" cy={120 - (a[a.length - 1] / max) * 110} r="5" fill="#C8F31D" stroke="#15122B" strokeWidth="2" />
      </svg>
      <div className="dchart__x"><span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Sem 4</span></div>
    </div>
  )
}

export function Activity() {
  const rows: [IconName, string, string][] = [
    ['gps', 'Vehículo 03 inició un viaje en Zona 10', 'hace 2 min'],
    ['check', 'Campaña de ejemplo A: instalación verificada', 'hace 1 h'],
    ['file', 'Campaña de ejemplo B recibida, en revisión', 'hace 3 h'],
    ['x', 'Campaña de ejemplo C requiere ajustes', 'ayer'],
  ]
  return (
    <div className="dcard">
      <div className="dcard__h"><b>Actividad</b><span className="dtag">Al momento</span></div>
      <ul className="dact">{rows.map(([ic, t, w]) => <li key={t}><span><Icon name={ic} size={14} /></span><div><b>{t}</b><small>{w}</small></div></li>)}</ul>
    </div>
  )
}

/* ───────── Dashboard completo ───────── */
type View = 'resumen' | 'campanas' | 'mapa' | 'trayectos' | 'nueva'
const NAV: [View, string, IconName][] = [
  ['resumen', 'Resumen', 'chart'], ['campanas', 'Campañas', 'layers'], ['mapa', 'Mapa en vivo', 'pin'], ['trayectos', 'Trayectos', 'route'], ['nueva', 'Nueva campaña', 'plus'],
]

export function DashboardMock({ initial = 'resumen' as View }: { initial?: View }) {
  const [view, setView] = useState<View>(initial)
  const [km, setKm] = useState(4862)
  const [imp, setImp] = useState(128430)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => { setKm((k) => k + Math.round(1 + Math.random() * 3)); setImp((i) => i + Math.round(20 + Math.random() * 60)) }, 1800)
    return () => clearInterval(t)
  }, [])
  const fmt = (n: number) => n.toLocaleString('es-GT')
  let body: ReactNode
  if (view === 'resumen') body = (
    <>
      <div className="dgrid dgrid--4">
        <Kpi icon="target" label="Campañas activas" value="1" delta="+1 esta semana" data={[1, 1, 2, 2, 3, 3, 4]} />
        <Kpi icon="car" label="Vehículos participando" value="6" delta="de 6 asignados" data={[2, 3, 3, 4, 5, 6, 6]} />
        <Kpi icon="gps" label="Km verificados" value={fmt(km)} delta="actualizándose" data={[10, 22, 30, 41, 58, 70, 90]} />
        <Kpi icon="eye" label="Impresiones estimadas" value={fmt(imp)} delta="actualizándose" data={[8, 20, 28, 45, 52, 77, 95]} />
      </div>
      <div className="dgrid dgrid--2"><ImpressionsChart /><div className="dcard"><div className="dcard__h"><b>Mapa en vivo</b><span className="dtag">Zonas y vehículos</span></div><LiveMap /></div></div>
      <div className="dgrid dgrid--2"><CampaignList /><Activity /></div>
    </>
  )
  else if (view === 'campanas') body = <div className="dgrid dgrid--2"><CampaignList /><StatusFlow /></div>
  else if (view === 'mapa') body = <div className="dcard"><div className="dcard__h"><b>Mapa en vivo</b><span className="dtag">Vehículos en viaje por zona</span></div><LiveMap big /></div>
  else if (view === 'trayectos') body = <div className="dgrid dgrid--2"><TripsCard /><ImpressionsChart /></div>
  else body = <div className="dgrid dgrid--2"><Wizard /><StatusFlow /></div>

  return (
    <div className="dash" role="group" aria-label="Maqueta interactiva del panel del anunciante. Datos ilustrativos.">
      <div className="dash__chrome">
        <span className="report__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="dash__url"><Icon name="lock" size={12} /> app.estiky.com/panel</span>
        <span className="stamp stamp--light">Datos ilustrativos</span>
      </div>
      <div className="dash__main">
        <aside className="dash__side">
          <div className="dash__brand"><span /> estiky</div>
          {NAV.map(([k, l, ic]) => (
            <button key={k} type="button" className={view === k ? 'is-on' : ''} onClick={() => setView(k)} aria-pressed={view === k}><Icon name={ic} size={16} /> <span>{l}</span></button>
          ))}
          <div className="dash__side-foot"><span className="live-dot" /> Ciudad de Guatemala</div>
        </aside>
        <div className="dash__content">
          <div className="dash__top">
            <div><small>Hola, Marca Ejemplo</small><h3>{NAV.find((n) => n[0] === view)![1]}</h3></div>
            <div className="dash__top-r"><span className="dash__live"><i className="live-dot" /> Tiempo real</span><span className="dbtn" onClick={() => setView('nueva')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setView('nueva')}><Icon name="plus" size={14} /> Nueva campaña</span></div>
          </div>
          <div className="dash__body" key={view}>{body}</div>
        </div>
      </div>
    </div>
  )
}
