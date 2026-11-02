import { useId } from 'react'

export type Coverage = 'full' | 'plus' | 'panel' | 'none'
export type Design = 'estiky' | 'cafe' | 'fit' | 'fruta'

interface Props {
  coverage?: Coverage
  design?: Design
  /** Compatibilidad: si no hay `design`, se deduce del color. */
  color?: string
  accent?: string
  text?: string
  className?: string
  spin?: boolean
  label?: string
}

const BODY = 'M12 112 L12 54 Q12 42 24 42 L192 42 Q203 42 210 50 L244 80 L292 88 Q306 91 306 104 L306 112 Z'
const GLASS = 'M208 53 Q211 53 214 56 L240 79 L208 79 Z'

const BRAND: Record<Design, { name: string; tag: string; primary: string; accent: string; ink: string }> = {
  estiky: { name: 'estiky', tag: 'Tu campaña en tiempo real', primary: '#5B3DF5', accent: '#C8F31D', ink: '#FFFFFF' },
  cafe: { name: 'Café Aurora', tag: 'Despierta tu ciudad', primary: '#F4E3C3', accent: '#E4572E', ink: '#6B3A1E' },
  fit: { name: 'FITZONE', tag: 'Primer mes gratis', primary: '#15122B', accent: '#C8F31D', ink: '#FFFFFF' },
  fruta: { name: 'Frutiko', tag: '100% fruta', primary: '#FF8A3D', accent: '#FFFFFF', ink: '#FFFFFF' },
}

function designFor(color?: string): Design {
  switch ((color ?? '').toUpperCase()) {
    case '#FF5C7A': return 'fruta'
    case '#15122B': return 'fit'
    case '#C8F31D': case '#FFC93C': return 'cafe'
    default: return 'estiky'
  }
}

function Phone({ x, y, rot = -7 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect width="50" height="86" rx="9" fill="#15122B" />
      <rect x="3" y="3" width="44" height="80" rx="7" fill="#fff" />
      <rect x="18" y="5" width="14" height="3" rx="1.5" fill="#15122B" />
      <rect x="7" y="12" width="20" height="5" rx="2" fill="#5B3DF5" />
      <rect x="7" y="21" width="36" height="22" rx="4" fill="#EBE6FF" />
      <path d="M10 38 L17 30 L23 34 L31 25 L40 28" fill="none" stroke="#5B3DF5" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="31" cy="25" r="2" fill="#C8F31D" stroke="#15122B" strokeWidth=".8" />
      <rect x="7" y="47" width="17" height="12" rx="3" fill="#F3F1FA" />
      <rect x="26" y="47" width="17" height="12" rx="3" fill="#F3F1FA" />
      <rect x="9" y="50" width="9" height="2.5" rx="1" fill="#15122B" opacity=".6" />
      <rect x="28" y="50" width="9" height="2.5" rx="1" fill="#15122B" opacity=".6" />
      <rect x="9" y="54" width="6" height="3" rx="1" fill="#5B3DF5" />
      <rect x="28" y="54" width="6" height="3" rx="1" fill="#5B3DF5" />
      <rect x="7" y="63" width="36" height="5" rx="2" fill="#F3F1FA" />
      <rect x="7" y="70" width="36" height="9" rx="4.5" fill="#C8F31D" />
    </g>
  )
}

function Qr({ x, y }: { x: number; y: number }) {
  const cells = [1,1,1,0,1,1,1, 1,0,1,1,1,0,1, 1,1,0,1,0,1,1, 0,1,1,0,1,1,0, 1,0,1,1,0,1,1, 1,0,0,1,1,0,1, 1,1,1,0,1,1,1]
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="30" height="30" rx="4" fill="#fff" />
      {cells.map((c, i) => c ? <rect key={i} x={2 + (i % 7) * 3.7} y={2 + Math.floor(i / 7) * 3.7} width="3.2" height="3.2" fill="#15122B" /> : null)}
    </g>
  )
}

function FullArt({ d }: { d: Design }) {
  if (d === 'estiky') {
    return (
      <g>
        <rect width="320" height="140" fill="url(#gv)" />
        <circle cx="168" cy="118" r="62" fill="#C8F31D" opacity=".18" />
        <polygon points="12,112 54,112 92,42 50,42" fill="#C8F31D" opacity=".95" />
        <text x="24" y="70" fontFamily="Bricolage Grotesque Variable, Arial Black, sans-serif" fontWeight="800" fontSize="32" fill="#fff" letterSpacing="-1.2">estiky</text>
        <text x="25" y="83" fontFamily="Inter Variable, Arial, sans-serif" fontWeight="700" fontSize="8" fill="#C8F31D">en tiempo real</text>
        <Phone x={118} y={46} />
        <Qr x={168} y={66} />
        <rect x="160" y="100" width="44" height="9" rx="4.5" fill="#fff" />
        <text x="182" y="107" textAnchor="middle" fontFamily="Inter Variable, Arial, sans-serif" fontWeight="800" fontSize="6.4" fill="#15122B">DESCARGA LA APP</text>
      </g>
    )
  }
  if (d === 'cafe') {
    return (
      <g>
        <rect width="320" height="140" fill="#F4E3C3" />
        <circle cx="160" cy="100" r="48" fill="#E4572E" /><circle cx="160" cy="100" r="33" fill="#F28C28" /><circle cx="160" cy="100" r="17" fill="#FFC93C" />
        <path d="M150 54 q-6 -8 0 -14 t0 -14 M166 56 q-6 -8 0 -14 t0 -14" fill="none" stroke="#6B3A1E" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
        <text x="26" y="62" fontFamily="Bricolage Grotesque Variable, Arial Black, sans-serif" fontWeight="800" fontSize="20" fill="#6B3A1E">Café</text>
        <text x="26" y="84" fontFamily="Bricolage Grotesque Variable, Arial Black, sans-serif" fontWeight="800" fontSize="26" fill="#E4572E" letterSpacing="-1">Aurora</text>
        <text x="104" y="60" fontFamily="Inter Variable, Arial, sans-serif" fontWeight="700" fontSize="7" fill="#6B3A1E">DESPIERTA TU CIUDAD</text>
      </g>
    )
  }
  if (d === 'fit') {
    return (
      <g>
        <rect width="320" height="140" fill="#15122B" />
        <polygon points="14,112 46,112 96,42 64,42" fill="#C8F31D" /><polygon points="56,112 72,112 122,42 106,42" fill="#FF5C7A" />
        <text x="30" y="80" fontFamily="Bricolage Grotesque Variable, Arial Black, sans-serif" fontWeight="800" fontStyle="italic" fontSize="30" fill="#fff" letterSpacing="-.5" transform="skewX(-8)">FITZONE</text>
        <circle cx="178" cy="68" r="23" fill="#C8F31D" /><text x="178" y="66" textAnchor="middle" fontFamily="Inter Variable, Arial, sans-serif" fontWeight="800" fontSize="8" fill="#15122B">1er mes</text><text x="178" y="77" textAnchor="middle" fontFamily="Bricolage Grotesque Variable, Arial Black, sans-serif" fontWeight="800" fontSize="11" fill="#15122B">GRATIS</text>
        <rect x="100" y="94" width="60" height="9" rx="4.5" fill="#fff" /><text x="130" y="101" textAnchor="middle" fontFamily="Inter Variable, Arial, sans-serif" fontWeight="800" fontSize="6.2" fill="#15122B">ENTRENA HOY</text>
      </g>
    )
  }
  return (
    <g>
      <rect width="320" height="140" fill="#FF8A3D" />
      <g transform="translate(160 96)">
        <circle r="40" fill="#fff" /><circle r="34" fill="#FFD27A" />
        {Array.from({ length: 8 }, (_, i) => <line key={i} x1="0" y1="0" x2={Math.cos((i * Math.PI) / 4) * 34} y2={Math.sin((i * Math.PI) / 4) * 34} stroke="#fff" strokeWidth="2.4" />)}
      </g>
      <path d="M186 52 q14 -16 28 0 q-14 14 -28 0z" fill="#2E9E5B" />
      <text x="24" y="76" fontFamily="Bricolage Grotesque Variable, Arial Black, sans-serif" fontWeight="800" fontSize="29" fill="#fff" letterSpacing="-1">Frutiko</text>
      <text x="25" y="86" fontFamily="Inter Variable, Arial, sans-serif" fontWeight="800" fontSize="7.5" fill="#2E5A2B">100% FRUTA</text>
    </g>
  )
}

export default function WrapCar({ coverage = 'full', design, color, spin = true, label, className = '' }: Props) {
  const id = useId().replace(/:/g, '')
  const d = design ?? designFor(color)
  const b = BRAND[d]
  return (
    <svg className={`wrapcar ${className}`} viewBox="0 0 320 140" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <clipPath id={`c${id}`}><path d={BODY} /></clipPath>
        <linearGradient id="gv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6A4DFF" /><stop offset="1" stopColor="#3A1FC4" /></linearGradient>
      </defs>
      <ellipse cx="160" cy="132" rx="146" ry="7" fill="#15122B" opacity=".13" />
      <path d={BODY} fill="#EEEBF7" />
      <g clipPath={`url(#c${id})`}>
        {coverage === 'full' && <FullArt d={d} />}
        {coverage === 'plus' && (
          <g>
            <rect x="0" y="72" width="320" height="48" fill={b.primary} />
            <rect x="0" y="72" width="320" height="4" fill={b.accent} />
            <text x="104" y="98" fontFamily="Bricolage Grotesque Variable, Arial Black, sans-serif" fontWeight="800" fontSize="22" fill={b.ink} letterSpacing="-.6">{b.name}</text>
            <text x="105" y="109" fontFamily="Inter Variable, Arial, sans-serif" fontWeight="700" fontSize="8" fill={b.ink} opacity=".9">{b.tag}</text>
          </g>
        )}
        {coverage === 'panel' && (
          <g>
            <rect x="98" y="52" width="104" height="52" rx="9" fill={b.primary} stroke={b.accent} strokeWidth="2.5" />
            <text x="150" y="80" textAnchor="middle" fontFamily="Bricolage Grotesque Variable, Arial Black, sans-serif" fontWeight="800" fontSize="17" fill={b.ink} letterSpacing="-.5">{b.name}</text>
            <text x="150" y="94" textAnchor="middle" fontFamily="Inter Variable, Arial, sans-serif" fontWeight="700" fontSize="8" fill={b.ink} opacity=".9">{b.tag}</text>
          </g>
        )}
        <path d="M112 44 L112 112 M208 50 L208 112" stroke="#15122B" strokeOpacity=".16" strokeWidth="1.4" />
        <rect x="118" y="76" width="9" height="3" rx="1.5" fill="#15122B" opacity=".3" />
      </g>
      <path d={BODY} fill="none" stroke="#15122B" strokeOpacity=".2" strokeWidth="1.5" />
      <path d={GLASS} fill="#26305F" />
      <path d="M214 58 L232 74 L214 74Z" fill="#fff" opacity=".14" />
      <rect x="243" y="77" width="11" height="6" rx="2" fill="#15122B" opacity=".7" />
      <rect x="296" y="94" width="9" height="6" rx="2" fill="#FFF3B0" />
      <rect x="12" y="86" width="6" height="9" rx="2" fill="#FF4D4D" />
      {[66, 246].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="112" r="25" fill="#15122B" opacity=".28" />
          <circle cx={cx} cy="112" r="20" fill="#15122B" />
          <g className={spin ? 'wheel-spin' : undefined}>
            <circle cx={cx} cy="112" r="10" fill="#D8D4EA" />
            <path d={`M${cx} 103 L${cx} 121 M${cx - 9} 112 L${cx + 9} 112 M${cx - 6.4} 105.6 L${cx + 6.4} 118.4 M${cx + 6.4} 105.6 L${cx - 6.4} 118.4`} stroke="#8F89B0" strokeWidth="2" />
          </g>
        </g>
      ))}
    </svg>
  )
}
