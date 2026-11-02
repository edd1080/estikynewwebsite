import type { ReactNode } from 'react'
import Icon, { type IconName } from './Icon'

const FD = 'Bricolage Grotesque Variable, Arial Black, sans-serif'
const FB = 'Inter Variable, Arial, sans-serif'

/* ───────── Valla fija ───────── */
export function Billboard({ withCar = false }: { withCar?: boolean }) {
  return (
    <svg className="illus billboard" viewBox="0 0 420 280" role="img" aria-label="Ilustración de una valla publicitaria fija en una esquina, con su área de visibilidad limitada a un punto.">
      <rect width="420" height="280" rx="22" fill="#EEF0F6" />
      <circle cx="350" cy="56" r="26" fill="#FFE49A" />
      {/* edificios de fondo */}
      <g fill="#DCD8EC">
        <rect x="16" y="120" width="54" height="110" rx="4" /><rect x="76" y="96" width="40" height="134" rx="4" /><rect x="320" y="110" width="44" height="120" rx="4" /><rect x="368" y="138" width="40" height="92" rx="4" />
      </g>
      <g fill="#fff" opacity=".7">
        {[0, 1, 2, 3].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={24 + c * 22} y={132 + r * 22} width="12" height="12" rx="2" />))}
      </g>
      {/* radio de alcance */}
      <ellipse cx="210" cy="232" rx="120" ry="22" fill="#FF5C7A" opacity=".1" stroke="#FF5C7A" strokeDasharray="6 6" strokeWidth="1.6" />
      {/* calle */}
      <rect x="0" y="232" width="420" height="48" fill="#C9C5DA" />
      <path d="M0 256 H420" stroke="#fff" strokeWidth="3" strokeDasharray="16 14" />
      {/* estructura */}
      <rect x="198" y="140" width="12" height="96" fill="#5E5A78" />
      <rect x="226" y="140" width="12" height="96" fill="#5E5A78" />
      <path d="M190 140 L246 140 L238 132 L198 132Z" fill="#4A4663" />
      <rect x="104" y="34" width="232" height="100" rx="6" fill="#4A4663" />
      <rect x="110" y="40" width="220" height="88" rx="3" fill="#5A2E17" />
      <circle cx="292" cy="86" r="36" fill="#E4572E" /><circle cx="292" cy="86" r="24" fill="#F28C28" /><circle cx="292" cy="86" r="12" fill="#FFC93C" />
      <text x="124" y="78" fontFamily={FD} fontWeight="800" fontSize="22" fill="#fff" letterSpacing="-.8">Despierta</text>
      <text x="124" y="102" fontFamily={FD} fontWeight="800" fontSize="22" fill="#FFC93C" letterSpacing="-.8">tu ciudad.</text>
      <text x="125" y="118" fontFamily={FB} fontWeight="700" fontSize="8" fill="#fff" opacity=".8">CAFÉ AURORA · ZONA 10</text>
      {[130, 190, 250, 310].map((x) => <path key={x} d={`M${x} 34 L${x - 6} 24 L${x + 6} 24Z`} fill="#4A4663" />)}
      {/* pin */}
      <g transform="translate(210 212)">
        <path d="M0 18 C-12 4 -12 -12 0 -12 C12 -12 12 4 0 18Z" fill="#FF5C7A" stroke="#15122B" strokeWidth="2" />
        <circle cy="-2" r="4.5" fill="#fff" />
      </g>
      <g transform="translate(24 24)">
        <rect width="118" height="26" rx="13" fill="#15122B" />
        <text x="59" y="17" textAnchor="middle" fontFamily={FB} fontWeight="700" fontSize="11" fill="#fff">1 sola ubicación</text>
      </g>
      {withCar && (
        <g transform="translate(300 214)">
          <rect x="0" y="6" width="96" height="24" rx="10" fill="#5B3DF5" />
          <path d="M18 8 L32 -6 H66 L80 8Z" fill="#5B3DF5" />
          <path d="M24 6 L34 -3 H48 V6Z M52 6 V-3 H64 L74 6Z" fill="#26305F" />
          <rect x="0" y="22" width="96" height="6" fill="#C8F31D" />
          <circle cx="22" cy="30" r="8" fill="#15122B" /><circle cx="76" cy="30" r="8" fill="#15122B" />
        </g>
      )}
    </svg>
  )
}

/* ───────── Ruta con varias zonas ───────── */
export function RouteMini() {
  const route = 'M24 120 C70 40 120 140 170 80 S260 30 300 70 S360 140 396 60'
  return (
    <svg className="illus routemini" viewBox="0 0 420 160" role="img" aria-label="Ruta de un auto con wrap que pasa por varias zonas de la ciudad.">
      <rect width="420" height="160" rx="18" fill="rgba(255,255,255,.06)" />
      <path d={route} fill="none" stroke="#C8F31D" strokeWidth="4" strokeDasharray="3 9" strokeLinecap="round" />
      {[[70, 66, 'Zona 4'], [170, 80, 'Zona 9'], [300, 70, 'Zona 10'], [384, 82, 'Zona 14']].map(([x, y, t]) => (
        <g key={t as string} transform={`translate(${x} ${y})`}>
          <circle r="7" fill="#C8F31D" stroke="#15122B" strokeWidth="2" />
          <rect x="-26" y="-34" width="52" height="18" rx="9" fill="#fff" />
          <text y="-21.5" textAnchor="middle" fontFamily={FB} fontWeight="700" fontSize="9.5" fill="#15122B">{t as string}</text>
        </g>
      ))}
      <g>
        <circle r="11" fill="#5B3DF5" stroke="#fff" strokeWidth="3"><animateMotion dur="9s" repeatCount="indefinite" path={route} /></circle>
      </g>
    </svg>
  )
}

/* ───────── Casos de uso ───────── */
export function CaseArt({ kind }: { kind: 'launch' | 'store' | 'season' | 'local' }) {
  return (
    <svg className="illus caseart" viewBox="0 0 280 140" aria-hidden="true">
      <rect width="280" height="140" rx="18" fill="var(--bg-2)" />
      {kind === 'launch' && (
        <g>
          {[[40, 30], [230, 26], [200, 100], [60, 104], [140, 18]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 6} L${x + 2} ${y - 2} L${x + 6} ${y} L${x + 2} ${y + 2} L${x} ${y + 6} L${x - 2} ${y + 2} L${x - 6} ${y} L${x - 2} ${y - 2}Z`} fill={i % 2 ? '#FF5C7A' : '#5B3DF5'} />)}
          <rect x="70" y="44" width="140" height="62" rx="12" fill="#5B3DF5" />
          <text x="140" y="72" textAnchor="middle" fontFamily={FD} fontWeight="800" fontSize="15" fill="#fff">¡NUEVO!</text>
          <text x="140" y="92" textAnchor="middle" fontFamily={FB} fontWeight="700" fontSize="9" fill="#C8F31D">YA DISPONIBLE</text>
          <rect x="196" y="36" width="34" height="18" rx="9" fill="#C8F31D" /><text x="213" y="49" textAnchor="middle" fontFamily={FB} fontWeight="800" fontSize="8" fill="#15122B">HOY</text>
        </g>
      )}
      {kind === 'store' && (
        <g>
          <rect x="54" y="52" width="120" height="70" rx="4" fill="#fff" stroke="#15122B" strokeWidth="2" />
          <path d="M48 52 L60 30 H168 L180 52Z" fill="#FF5C7A" stroke="#15122B" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${60 + i * 24} 52 q12 12 24 0`} fill={i % 2 ? '#fff' : '#FF5C7A'} stroke="#15122B" strokeWidth="1.5" />)}
          <rect x="98" y="84" width="30" height="38" fill="#26305F" /><rect x="66" y="72" width="24" height="20" fill="#DDF2FF" /><rect x="138" y="72" width="24" height="20" fill="#DDF2FF" />
          <rect x="74" y="36" width="80" height="12" rx="3" fill="#fff" /><text x="114" y="45" textAnchor="middle" fontFamily={FB} fontWeight="800" fontSize="8" fill="#15122B">NUEVA SUCURSAL</text>
          <g transform="translate(214 60)"><path d="M0 26 C-16 6 -16 -16 0 -16 C16 -16 16 6 0 26Z" fill="#5B3DF5" stroke="#15122B" strokeWidth="2" /><circle cy="-2" r="6" fill="#fff" /></g>
          <circle cx="214" cy="104" r="26" fill="none" stroke="#5B3DF5" strokeDasharray="4 5" strokeWidth="2" />
        </g>
      )}
      {kind === 'season' && (
        <g>
          <rect x="44" y="28" width="104" height="92" rx="10" fill="#fff" stroke="#15122B" strokeWidth="2" />
          <rect x="44" y="28" width="104" height="22" rx="10" fill="#5B3DF5" /><rect x="44" y="40" width="104" height="10" fill="#5B3DF5" />
          <text x="96" y="44" textAnchor="middle" fontFamily={FB} fontWeight="800" fontSize="9" fill="#fff">DICIEMBRE</text>
          {Array.from({ length: 15 }, (_, i) => <rect key={i} x={54 + (i % 5) * 18} y={58 + Math.floor(i / 5) * 18} width="12" height="12" rx="3" fill={i > 5 && i < 12 ? '#C8F31D' : '#EEEBF7'} />)}
          <g transform="translate(176 38) rotate(12)">
            <path d="M0 0 H66 L80 30 L66 60 H0Z" fill="#FF5C7A" stroke="#15122B" strokeWidth="2" />
            <circle cx="66" cy="30" r="5" fill="#fff" stroke="#15122B" strokeWidth="1.5" />
            <text x="30" y="28" textAnchor="middle" fontFamily={FD} fontWeight="800" fontSize="16" fill="#fff">-30%</text>
            <text x="30" y="44" textAnchor="middle" fontFamily={FB} fontWeight="700" fontSize="7.5" fill="#fff">TEMPORADA</text>
          </g>
        </g>
      )}
      {kind === 'local' && (
        <g>
          {[[30, 24], [96, 24], [162, 24], [30, 84], [96, 84], [162, 84]].map(([x, y], i) => <rect key={i} x={x} y={y} width="56" height="44" rx="8" fill={i === 1 || i === 4 ? '#5B3DF5' : '#fff'} opacity={i === 1 || i === 4 ? 0.85 : 1} stroke="#15122B" strokeOpacity=".12" />)}
          <circle cx="124" cy="76" r="34" fill="none" stroke="#FF5C7A" strokeWidth="3" />
          <circle cx="124" cy="76" r="20" fill="none" stroke="#FF5C7A" strokeWidth="3" />
          <circle cx="124" cy="76" r="7" fill="#FF5C7A" />
          <g transform="translate(234 40)"><rect width="34" height="60" rx="8" fill="#15122B" /><rect x="5" y="8" width="24" height="12" rx="3" fill="#C8F31D" /><rect x="5" y="24" width="24" height="6" rx="3" fill="#fff" opacity=".5" /><rect x="5" y="34" width="18" height="6" rx="3" fill="#fff" opacity=".5" /></g>
        </g>
      )}
    </svg>
  )
}

/* ───────── Confianza: tarjeta de verificación ───────── */
export function TrustStack() {
  const rows: [IconName, string, string, string][] = [
    ['id', 'Conductor verificado', 'Identidad y documentos', 'ok'],
    ['car', 'Vehículo elegible', 'Carrocería y formato', 'ok'],
    ['wrench', 'Instalación verificada', 'Fotos de la instalación', 'ok'],
    ['calendar', 'Retiro programado', 'Al terminar la campaña', 'wait'],
  ]
  return (
    <div className="truststack" role="img" aria-label="Lista de verificación: conductor verificado, vehículo elegible, instalación verificada y retiro programado.">
      <div className="truststack__h"><span className="truststack__av">V7</span><div><b>Vehículo 07</b><small>Campaña de ejemplo A</small></div><span className="chip chip--ok">Activo</span></div>
      <ul>{rows.map(([ic, t, d, st]) => (
        <li key={t}><span className="truststack__ic"><Icon name={ic} size={16} /></span><div><b>{t}</b><small>{d}</small></div><span className={`truststack__ok ${st}`}><Icon name={st === 'ok' ? 'check' : 'clock'} size={14} /></span></li>
      ))}</ul>
    </div>
  )
}

/* ───────── Cómo se estiman impresiones ───────── */
export function ImpressionsDiagram() {
  return (
    <div className="flowdiag" role="img" aria-label="Diagrama: kilómetros verificados por GPS, cruzados con zonas objetivo, dan impresiones estimadas.">
      <div className="flowdiag__node"><svg viewBox="0 0 120 70"><path d="M8 58 C30 10 60 64 82 28 S112 14 114 30" fill="none" stroke="var(--brand)" strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" /><circle cx="82" cy="28" r="7" fill="var(--brand)" stroke="#fff" strokeWidth="3" /></svg><b>Km verificados</b><small>GPS por viaje</small></div>
      <span className="flowdiag__op">×</span>
      <div className="flowdiag__node"><svg viewBox="0 0 120 70"><rect x="10" y="10" width="44" height="28" rx="6" fill="var(--brand)" opacity=".25" stroke="var(--brand)" strokeDasharray="4 3" /><rect x="64" y="26" width="46" height="34" rx="6" fill="var(--brand)" opacity=".18" stroke="var(--brand)" strokeDasharray="4 3" /><text x="32" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15122B">Z10</text><text x="87" y="47" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15122B">Z14</text></svg><b>Zonas objetivo</b><small>Por dónde circuló</small></div>
      <span className="flowdiag__op">=</span>
      <div className="flowdiag__node flowdiag__node--out"><svg viewBox="0 0 120 70"><path d="M14 35 C34 8 86 8 106 35 C86 62 34 62 14 35Z" fill="#fff" stroke="#15122B" strokeWidth="3" /><circle cx="60" cy="35" r="13" fill="#C8F31D" stroke="#15122B" strokeWidth="3" /><circle cx="60" cy="35" r="5" fill="#15122B" /></svg><b>Impresiones estimadas</b><small>Oportunidades de ver tu marca</small></div>
    </div>
  )
}

/* ───────── Inversión ───────── */
export function BudgetParts() {
  const parts: [string, string, number][] = [['Diseño y producción', '#5B3DF5', 28], ['Instalación y retiro', '#C8F31D', 18], ['Circulación y medición', '#FF5C7A', 38], ['Panel en tiempo real', '#35C4FF', 16]]
  return (
    <div className="budget" role="img" aria-label="Los cuatro componentes de un presupuesto: diseño y producción, instalación y retiro, circulación y medición, y panel en tiempo real.">
      <div className="budget__h"><b>Tu propuesta</b><span className="dtag">Componentes · ilustrativo</span></div>
      <div className="budget__bar">{parts.map(([t, c, w]) => <i key={t} style={{ width: `${w}%`, background: c }} />)}</div>
      <ul>{parts.map(([t, c]) => <li key={t}><i style={{ background: c }} />{t}</li>)}</ul>
      <div className="budget__foot"><span>Total de la campaña</span><b>Q · · ·</b></div>
    </div>
  )
}

export function QuoteSliders() {
  const rows: [IconName, string, string, number][] = [['pin', 'Zonas', '3 zonas · 6 vehículos', 55], ['calendar', 'Duración', '4 semanas', 40], ['layers', 'Formato', 'Panel+', 66]]
  return (
    <div className="sliders" role="img" aria-label="Las tres variables que definen la cotización: zonas, duración y formato.">
      {rows.map(([ic, t, v, p]) => (
        <div key={t} className="sliders__row">
          <div className="sliders__l"><Icon name={ic} size={16} /> <b>{t}</b><span>{v}</span></div>
          <div className="sliders__track"><i style={{ width: `${p}%` }} /><b style={{ left: `${p}%` }} /></div>
        </div>
      ))}
    </div>
  )
}

/* ───────── Tiempos ───────── */
export function WeeksTimeline() {
  const rows: [string, number, number, string][] = [['Crear y revisar', 0, 1.2, '#5B3DF5'], ['Producción e instalación', 1, 1.6, '#FF5C7A'], ['En la calle + panel en vivo', 2.4, 3.6, '#C8F31D']]
  return (
    <div className="weeks" role="img" aria-label="Línea de tiempo ilustrativa: crear y revisar, producción e instalación, y campaña en la calle.">
      <div className="weeks__head"><span /><span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Sem 4</span><span>Sem 5</span><span>Sem 6</span></div>
      {rows.map(([t, s, w, c]) => (
        <div key={t} className="weeks__row"><b>{t}</b><div><i style={{ left: `${(s / 6) * 100}%`, width: `${(w / 6) * 100}%`, background: c }} /></div></div>
      ))}
      <p className="weeks__note">Ilustrativo. Los tiempos de tu campaña vienen en la propuesta.</p>
    </div>
  )
}

export function GfxWrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`gfxwrap ${className}`}>{children}</div>
}
