import { useId } from 'react'

export type Coverage = 'full' | 'plus' | 'panel' | 'none'
/** Campañas de ejemplo con marcas ficticias. */
export type Design = 'estiky' | 'cafe' | 'fit' | 'fruta' | 'blank'

interface Props {
  coverage?: Coverage
  design?: Design
  /** Compatibilidad con llamadas anteriores: si no hay `design`, se deduce. */
  color?: string
  accent?: string
  text?: string
  className?: string
  spin?: boolean
  label?: string
}

/* ───────── Geometría del sedán (vista lateral, frente a la derecha) ───────── */
const BODY =
  'M34 178 L30 146 Q29 128 46 122 L122 112 C152 108 168 100 186 88 L238 54 Q252 44 272 43 L368 42 Q392 43 410 54 L464 100 L540 110 Q570 115 578 133 L582 158 Q583 176 568 178 L510 178 A40 40 0 0 0 430 178 L180 178 A40 40 0 0 0 100 178 Z'
const GLASS_REAR = 'M202 96 L244 60 Q256 53 272 53 L316 52 L316 98 Z'
const GLASS_FRONT = 'M326 52 L366 52 Q386 53 400 62 L444 100 L326 99 Z'
const FONT_D = 'Bricolage Grotesque Variable, Arial Black, sans-serif'
const FONT_B = 'Inter Variable, Arial, sans-serif'

const BASE: Record<Design, string> = {
  estiky: '#5B3DF5',
  cafe: '#F4F3F7',
  fit: '#F4F3F7',
  fruta: '#E9EDF3',
  blank: '#F4F3F7',
}

function designFor(coverage: Coverage, color?: string): Design {
  switch ((color ?? '').toUpperCase()) {
    case '#5B3DF5': return 'estiky'
    case '#FF5C7A': return 'fruta'
    case '#15122B': return 'cafe'
    case '#C8F31D': case '#FFC93C': return 'fit'
  }
  if (coverage === 'plus') return 'fruta'
  if (coverage === 'panel') return 'cafe'
  if (coverage === 'none') return 'blank'
  return 'estiky'
}

/* ───────── Piezas gráficas ───────── */
function AppPhone({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x="-2" y="2" width="62" height="108" rx="12" fill="#000" opacity=".25" />
      <rect width="60" height="106" rx="11" fill="#15122B" />
      <rect x="4" y="4" width="52" height="98" rx="8" fill="#fff" />
      <rect x="22" y="6" width="16" height="4" rx="2" fill="#15122B" />
      <text x="9" y="22" fontFamily={FONT_D} fontWeight="800" fontSize="8" fill="#15122B">estiky</text>
      <circle cx="49" cy="19" r="3" fill="#1fd47f" />
      <rect x="8" y="27" width="44" height="30" rx="5" fill="#EBE6FF" />
      <path d="M11 51 L19 42 L26 46 L35 35 L49 38" fill="none" stroke="#5B3DF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="35" cy="35" r="2.6" fill="#C8F31D" stroke="#15122B" strokeWidth="1" />
      <rect x="8" y="61" width="21" height="15" rx="4" fill="#F3F1FA" />
      <rect x="31" y="61" width="21" height="15" rx="4" fill="#F3F1FA" />
      <text x="11" y="68" fontFamily={FONT_B} fontSize="4.2" fill="#6b6785">Km</text>
      <text x="11" y="74" fontFamily={FONT_D} fontWeight="800" fontSize="6.5" fill="#15122B">4,862</text>
      <text x="34" y="68" fontFamily={FONT_B} fontSize="4.2" fill="#6b6785">Impr.</text>
      <text x="34" y="74" fontFamily={FONT_D} fontWeight="800" fontSize="6.5" fill="#15122B">128k</text>
      <rect x="8" y="80" width="44" height="6" rx="3" fill="#F3F1FA" />
      <rect x="8" y="89" width="44" height="9" rx="4.5" fill="#C8F31D" />
      <text x="30" y="95.5" textAnchor="middle" fontFamily={FONT_B} fontWeight="800" fontSize="4.6" fill="#15122B">VER EN VIVO</text>
    </g>
  )
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff">
      <ellipse cx="0" cy="0" rx="26" ry="11" opacity=".95" />
      <ellipse cx="-16" cy="2" rx="14" ry="8" opacity=".95" />
      <ellipse cx="18" cy="3" rx="16" ry="8" opacity=".95" />
      <ellipse cx="4" cy="-8" rx="13" ry="9" opacity=".95" />
    </g>
  )
}

function JuiceCan({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="2" y="3" width="40" height="72" rx="7" fill="#000" opacity=".18" />
      <rect width="40" height="72" rx="7" fill="#fff" />
      <rect y="0" width="40" height="8" rx="4" fill="#d9dde6" />
      <circle cx="20" cy="30" r="15" fill="#FF8A3D" />
      <text x="20" y="28" textAnchor="middle" fontFamily={FONT_D} fontWeight="800" fontSize="6.5" fill="#fff">FRUTI</text>
      <text x="20" y="35" textAnchor="middle" fontFamily={FONT_D} fontWeight="800" fontSize="6.5" fill="#fff">KO</text>
      <text x="20" y="54" textAnchor="middle" fontFamily={FONT_D} fontWeight="800" fontSize="5.5" fill="#2E6BD6">MANGO</text>
      <circle cx="20" cy="63" r="5" fill="#FFB020" />
      <path d="M20 58 q3 -4 6 -2" fill="none" stroke="#2E9E5B" strokeWidth="1.6" />
    </g>
  )
}

function Art({ d }: { d: Design }) {
  if (d === 'estiky') {
    // Full wrap estilo campaña de telecom: color sólido, titular enorme, app como "personaje".
    return (
      <g>
        <rect width="620" height="230" fill="url(#est-g)" />
        <path d="M0 184 C160 160 300 188 620 128 L620 230 L0 230Z" fill="#C8F31D" />
        <path d="M0 168 C170 144 320 176 620 112" fill="none" stroke="#fff" strokeWidth="3" opacity=".35" />
        {[[260, 76, 18, '#C8F31D'], [300, 88, -24, '#FF5C7A'], [430, 112, 30, '#fff'], [120, 128, -12, '#FF5C7A'], [486, 128, 40, '#C8F31D']].map(([x, y, r, c], i) => (
          <rect key={i} x={x as number} y={y as number} width="10" height="4" rx="2" fill={c as string} transform={`rotate(${r} ${x} ${y})`} />
        ))}
        <text x="62" y="146" fontFamily={FONT_D} fontWeight="800" fontSize="22" fill="#fff" letterSpacing="-1">estiky</text>
        <text x="214" y="132" fontFamily={FONT_D} fontWeight="800" fontSize="26" fill="#fff" letterSpacing="-1.1">Tu campaña,</text>
        <text x="214" y="158" fontFamily={FONT_D} fontWeight="800" fontSize="26" fill="#C8F31D" letterSpacing="-1.1" stroke="#15122B" strokeWidth=".6" paintOrder="stroke">en tiempo real</text>
        <text x="215" y="170" fontFamily={FONT_B} fontWeight="600" fontSize="5.4" fill="#15122B" opacity=".8">Descarga la app y mira tu marca circular · estiky.com</text>
      </g>
    )
  }
  if (d === 'cafe') {
    // Panel en puertas sobre auto blanco (como las campañas de software).
    return (
      <g>
        <path d="M206 106 Q206 102 212 102 L438 103 Q444 103 443 110 L437 166 Q436 173 429 173 L218 173 Q210 173 209 166 Z" fill="url(#cafe-g)" />
        {[[232, 112], [420, 116], [252, 160], [402, 158], [338, 110]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${i * 37})`}><ellipse rx="5" ry="3.4" fill="#A0522D" /><path d="M-4 0 Q0 -1.4 4 0" stroke="#3B1F12" strokeWidth=".9" fill="none" /></g>
        ))}
        <text x="224" y="137" fontFamily={FONT_D} fontWeight="800" fontSize="22" fill="#fff" letterSpacing="-.8">Despierta</text>
        <text x="224" y="161" fontFamily={FONT_D} fontWeight="800" fontSize="22" fill="#FFC93C" letterSpacing="-.8">tu ciudad.</text>
        <g transform="translate(372 114)">
          <path d="M6 10 q-4 -6 0 -10 M16 10 q-4 -6 0 -10 M26 10 q-4 -6 0 -10" stroke="#fff" strokeWidth="2" fill="none" opacity=".8" strokeLinecap="round" />
          <path d="M0 14 H34 L30 46 Q29 50 25 50 H9 Q5 50 4 46 Z" fill="#fff" />
          <path d="M34 20 q12 2 8 12 q-3 6 -10 5" fill="none" stroke="#fff" strokeWidth="3" />
          <rect x="4" y="24" width="26" height="9" fill="#E4572E" />
          <text x="17" y="31" textAnchor="middle" fontFamily={FONT_D} fontWeight="800" fontSize="6" fill="#fff">AURORA</text>
        </g>
        <g transform="translate(66 118)">
          <circle cx="8" cy="8" r="8" fill="#E4572E" /><circle cx="8" cy="8" r="4.5" fill="#FFC93C" />
          <text x="20" y="12" fontFamily={FONT_D} fontWeight="800" fontSize="13" fill="#6B3A1E" letterSpacing="-.4">Café Aurora</text>
        </g>
      </g>
    )
  }
  if (d === 'fit') {
    // Calcomanía sobre auto blanco: logotipo, oferta y line-art.
    const navy = '#1E2A5A'
    return (
      <g>
        <text x="214" y="140" fontFamily={FONT_D} fontWeight="700" fontSize="31" fill={navy} letterSpacing="-1.2">fitzone.gt</text>
        <text x="216" y="157" fontFamily={FONT_B} fontWeight="800" fontSize="11" fill={navy} letterSpacing=".4">PRIMER MES GRATIS</text>
        <text x="216" y="166" fontFamily={FONT_B} fontWeight="500" fontSize="4.6" fill={navy}>Aplican restricciones. Detalles en fitzone.gt</text>
        <g transform="translate(0 6)" fill="none" stroke={navy} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="408" cy="104" r="7" />
          <path d="M406 112 L398 134 L414 146 L420 164 M398 134 L384 150 L372 152 M402 118 L386 126 L378 120 M404 120 L420 128 L430 120" />
          <path d="M350 162 H372 L378 152 L386 170 L392 158 H440" strokeWidth="2.6" />
        </g>
      </g>
    )
  }
  if (d === 'fruta') {
    // Wrap parcial: cielo desde la parte trasera hasta media puerta delantera.
    return (
      <g>
        <path d="M0 0 H404 Q392 40 386 120 L380 230 H0Z" fill="url(#sky-g)" />
        <Cloud x={130} y={124} s={1.1} /><Cloud x={360} y={110} s={.7} /><Cloud x={170} y={166} s={.6} /><Cloud x={382} y={170} s={.8} />
        <g transform="translate(78 140)"><circle r="17" fill="#FFB020" stroke="#fff" strokeWidth="2.4" /><text y="-1" textAnchor="middle" fontFamily={FONT_D} fontWeight="800" fontSize="7.4" fill="#2E6BD6">FRUTI</text><text y="7" textAnchor="middle" fontFamily={FONT_D} fontWeight="800" fontSize="7.4" fill="#2E6BD6">KO</text></g>
        <JuiceCan x={214} y={98} />
        <text x="268" y="134" fontFamily={FONT_D} fontWeight="800" fontSize="27" fill="#fff" letterSpacing="-1" stroke="#E86A10" strokeWidth="2.2" paintOrder="stroke">SOL EN</text>
        <text x="268" y="159" fontFamily={FONT_D} fontWeight="800" fontSize="27" fill="#fff" letterSpacing="-1" stroke="#E86A10" strokeWidth="2.2" paintOrder="stroke">LATA</text>
        <text x="269" y="170" fontFamily={FONT_B} fontWeight="800" fontSize="6.4" fill="#fff" letterSpacing="1.2">FRUTIKO · JUGO 100% FRUTA</text>
      </g>
    )
  }
  return null
}

export default function WrapCar({ coverage = 'full', design, color, spin = true, label, className = '' }: Props) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  const id = (s: string) => `${s}${raw}`
  const d = design ?? designFor(coverage, color)
  const base = BASE[d]
  return (
    <svg className={`wrapcar ${className}`} viewBox="0 0 620 230" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <clipPath id={id('c')}><path d={BODY} /></clipPath>
        <linearGradient id="est-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6E52FF" /><stop offset="1" stopColor="#3B1FC8" /></linearGradient>
        <linearGradient id="cafe-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5A2E17" /><stop offset="1" stopColor="#2E170C" /></linearGradient>
        <linearGradient id="sky-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1E78F0" /><stop offset="1" stopColor="#4FA6FF" /></linearGradient>
        <linearGradient id={id('sh')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".32" stopColor="#fff" stopOpacity=".05" />
          <stop offset=".62" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id={id('gl')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A4670" /><stop offset=".45" stopColor="#1C2340" /><stop offset="1" stopColor="#2A3358" />
        </linearGradient>
        <radialGradient id={id('rim')} cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#F2F2F6" /><stop offset=".7" stopColor="#B7B8C4" /><stop offset="1" stopColor="#8D8E9C" /></radialGradient>
      </defs>

      <ellipse cx="306" cy="214" rx="290" ry="10" fill="#15122B" opacity=".16" />

      {/* carrocería */}
      <path d={BODY} fill={base} />
      <g clipPath={`url(#${id('c')})`}>
        <Art d={d} />
        <rect width="620" height="230" fill={`url(#${id('sh')})`} />
        <path d="M44 128 C200 116 380 112 574 128" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" />
        <path d="M36 164 L580 162 L580 180 L36 180Z" fill="#15122B" opacity=".12" />
        <g fill="none" stroke="#15122B" strokeOpacity=".22" strokeWidth="1.3">
          <path d="M204 97 L206 168 Q207 176 214 178" />
          <path d="M321 50 L321 176" />
          <path d="M446 101 L438 142 Q436 156 444 172" />
          <path d="M464 100 L540 110" strokeOpacity=".14" />
        </g>
        <rect x="282" y="116" width="22" height="5" rx="2.5" fill="#15122B" opacity=".35" />
        <rect x="398" y="116" width="22" height="5" rx="2.5" fill="#15122B" opacity=".35" />
      </g>

      {/* vidrios */}
      <path d={GLASS_REAR} fill={`url(#${id('gl')})`} />
      <path d={GLASS_FRONT} fill={`url(#${id('gl')})`} />
      <path d="M262 55 L300 55 L250 97 L218 97Z" fill="#fff" opacity=".1" />
      <path d="M352 53 L380 54 L340 99 L322 99Z" fill="#fff" opacity=".1" />
      <rect x="316" y="51" width="10" height="49" fill="#15122B" />
      <path d="M186 88 L202 96 L244 60" fill="none" stroke="#15122B" strokeOpacity=".3" strokeWidth="1.2" />

      {d === 'estiky' && <g transform="translate(396 70) scale(.92)"><AppPhone x={0} y={0} rot={9} /></g>}

      {/* espejo, luces */}
      <path d="M440 94 Q444 84 456 86 L460 96 Q452 101 442 99Z" fill={d === 'estiky' ? '#4A2FE0' : '#E2E1EA'} stroke="#15122B" strokeOpacity=".25" />
      <path d="M546 115 Q566 117 574 129 L560 130 Q548 126 540 118Z" fill="#FFF6D0" stroke="#15122B" strokeOpacity=".3" />
      <path d="M32 130 Q36 124 52 122 L54 136 Q42 138 32 138Z" fill="#E0213A" />
      <path d="M570 156 L582 156" stroke="#15122B" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />

      {/* contorno */}
      <path d={BODY} fill="none" stroke="#15122B" strokeOpacity=".22" strokeWidth="1.4" />

      {/* ruedas */}
      {[140, 470].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="178" r="38" fill="#121218" />
          <circle cx={cx} cy="178" r="35" fill="#22222B" />
          <circle cx={cx} cy="178" r="33" fill="#2E2E38" />
          <circle cx={cx} cy="178" r="25" fill={`url(#${id('rim')})`} />
          <g className={spin ? 'wheel-spin' : undefined}>
            {Array.from({ length: 5 }, (_, i) => (
              <path key={i} d={`M${cx} 178 L${cx - 4} ${155} L${cx + 4} ${155} Z`} fill="#5D5E6C" transform={`rotate(${i * 72} ${cx} 178)`} />
            ))}
            <circle cx={cx} cy="178" r="7" fill="#D9DAE2" stroke="#5D5E6C" strokeWidth="1.5" />
          </g>
          <circle cx={cx} cy="178" r="25" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
        </g>
      ))}
    </svg>
  )
}
