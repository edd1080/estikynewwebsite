import { useEffect, useRef } from 'react'

export type CityMode = 'advertiser' | 'driver'

/* ───────────── Geometría isométrica ───────────── */
const N = 11 // celdas por lado
const HW = 48 // medio ancho de tile
const HH = 24 // media altura de tile
const UZ = 44 // px por unidad de altura
const PAD = 24
const TOP = 210
const SLAB = 0.5
const WORLD_W = 2 * N * HW + PAD * 2
const WORLD_H = TOP + N * 2 * HH + SLAB * UZ + PAD
const OX = PAD + N * HW
const OY = TOP
const ROADS = [2, 5, 8]
const BLOCK_START = [0, 3, 6, 9]

type Pt = [number, number]
const P = (x: number, y: number, z = 0): Pt => [OX + (x - y) * HW, OY + (x + y) * HH - z * UZ]

/* ───────────── Utilidades ───────────── */
function rngFactory(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function hex(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function shade(h: string, f: number) {
  const [r, g, b] = hex(h)
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v * f)))
  return `rgb(${c(r)},${c(g)},${c(b)})`
}
function mixW(h: string, t: number) {
  const [r, g, b] = hex(h)
  const c = (v: number) => Math.round(v + (255 - v) * t)
  return `rgb(${c(r)},${c(g)},${c(b)})`
}
function poly(ctx: CanvasRenderingContext2D, pts: Pt[], fill: string, stroke?: string) {
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  ctx.closePath()
  ctx.fillStyle = fill
  ctx.fill()
  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1
    ctx.stroke()
  }
}
function drawBox(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, z: number,
  dx: number, dy: number, dz: number,
  top: string, right: string, left: string,
) {
  poly(ctx, [P(x + dx, y, z), P(x + dx, y + dy, z), P(x + dx, y + dy, z + dz), P(x + dx, y, z + dz)], right)
  poly(ctx, [P(x, y + dy, z), P(x + dx, y + dy, z), P(x + dx, y + dy, z + dz), P(x, y + dy, z + dz)], left)
  poly(ctx, [P(x, y, z + dz), P(x + dx, y, z + dz), P(x + dx, y + dy, z + dz), P(x, y + dy, z + dz)], top)
}

/* ───────────── Escena ───────────── */
const PALETTE = ['#FFFFFF', '#F6EFE3', '#E6DFFF', '#FFE4D6', '#DDF2FF', '#ECF8CF', '#FFF1BF', '#FBE3F0']

interface Building {
  i: number
  j: number
  h: number
  base: string
  park: boolean
  lit: number[]
  tier: boolean
  ac: boolean
}

function makeScene(): Building[] {
  const rnd = rngFactory(20261)
  const out: Building[] = []
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (ROADS.includes(i) || ROADS.includes(j)) continue
      const d = Math.hypot(i + 0.5 - 5.5, j + 0.5 - 5.5) / 7.8
      const depth = (i + j) / (2 * N - 2)
      let h = (0.55 + rnd() * 1.1 + (1 - d) * 1.5) * (1 - 0.5 * depth)
      h = Math.max(0.45, Math.min(3.1, h))
      const park = rnd() < 0.13
      out.push({
        i, j, h, park,
        base: PALETTE[Math.floor(rnd() * PALETTE.length)],
        lit: Array.from({ length: 24 }, () => (rnd() < 0.22 ? 1 : 0)),
        tier: h > 1.9 && rnd() < 0.7,
        ac: rnd() < 0.5,
      })
    }
  }
  return out
}

/* ───────────── Wraps (marcas ficticias; el wrap de Estiky muestra la app) ───────────── */
type Design = 'estiky' | 'cafe' | 'fit' | 'fruta'
interface Wrap { design: Design; body: string; accent: string; roof: string; alt: string }
const WRAPS: Wrap[] = [
  { design: 'estiky', body: '#5B3DF5', accent: '#C8F31D', roof: '#7C63FF', alt: '#FFFFFF' },
  { design: 'cafe', body: '#F4F3F7', accent: '#4A2614', roof: '#FFFFFF', alt: '#FFC93C' },
  { design: 'fit', body: '#F4F3F7', accent: '#1E2A5A', roof: '#FFFFFF', alt: '#1E2A5A' },
  { design: 'fruta', body: '#F4F3F7', accent: '#2E86F5', roof: '#FFFFFF', alt: '#FF8A3D' },
  { design: 'estiky', body: '#5B3DF5', accent: '#C8F31D', roof: '#7C63FF', alt: '#FFFFFF' },
  { design: 'fruta', body: '#F4F3F7', accent: '#2E86F5', roof: '#FFFFFF', alt: '#FF8A3D' },
  { design: 'cafe', body: '#F4F3F7', accent: '#4A2614', roof: '#FFFFFF', alt: '#FFC93C' },
  { design: 'fit', body: '#F4F3F7', accent: '#1E2A5A', roof: '#FFFFFF', alt: '#1E2A5A' },
]

type Q = (u: number, v: number) => Pt
function circ(q: Q, cu: number, cv: number, ru: number, rv: number): Pt[] {
  return Array.from({ length: 14 }, (_, i) => {
    const t = (i / 14) * Math.PI * 2
    return q(cu + Math.cos(t) * ru, cv + Math.sin(t) * rv)
  })
}
function drawWrapArt(ctx: CanvasRenderingContext2D, q: Q, w: Wrap) {
  if (w.design === 'estiky') {
    // full wrap violeta: franja lima abajo, titular blanco y teléfono
    poly(ctx, [q(0, 0), q(1, 0), q(1, 0.3), q(0, 0.42)], w.accent)
    poly(ctx, [q(0.3, 0.55), q(0.62, 0.55), q(0.62, 0.72), q(0.3, 0.72)], '#FFFFFF')
    poly(ctx, [q(0.3, 0.4), q(0.56, 0.4), q(0.56, 0.5), q(0.3, 0.5)], w.accent)
    poly(ctx, [q(0.68, 0.1), q(0.84, 0.1), q(0.84, 0.95), q(0.68, 0.95)], '#15122B')
    poly(ctx, [q(0.7, 0.18), q(0.82, 0.18), q(0.82, 0.88), q(0.7, 0.88)], '#FFFFFF')
    poly(ctx, [q(0.72, 0.45), q(0.8, 0.45), q(0.8, 0.7), q(0.72, 0.7)], '#5B3DF5')
  } else if (w.design === 'cafe') {
    // panel café en las puertas
    poly(ctx, [q(0.26, 0.12), q(0.82, 0.12), q(0.82, 0.92), q(0.26, 0.92)], w.accent)
    poly(ctx, [q(0.32, 0.55), q(0.58, 0.55), q(0.58, 0.72), q(0.32, 0.72)], '#FFFFFF')
    poly(ctx, [q(0.32, 0.3), q(0.52, 0.3), q(0.52, 0.44), q(0.32, 0.44)], w.alt)
    poly(ctx, [q(0.65, 0.25), q(0.76, 0.25), q(0.75, 0.75), q(0.66, 0.75)], '#FFFFFF')
  } else if (w.design === 'fit') {
    // calcomanía azul marino sobre auto blanco
    poly(ctx, [q(0.26, 0.5), q(0.62, 0.5), q(0.62, 0.78), q(0.26, 0.78)], w.accent)
    poly(ctx, [q(0.26, 0.3), q(0.5, 0.3), q(0.5, 0.4), q(0.26, 0.4)], w.accent)
    poly(ctx, [q(0.68, 0.2), q(0.72, 0.2), q(0.78, 0.85), q(0.74, 0.85)], w.accent)
    poly(ctx, [q(0.72, 0.5), q(0.88, 0.62), q(0.88, 0.7), q(0.72, 0.58)], w.accent)
  } else {
    // wrap parcial de cielo con nubes y lata naranja
    poly(ctx, [q(0, 0), q(0.7, 0), q(0.62, 1), q(0, 1)], w.accent)
    poly(ctx, circ(q, 0.18, 0.55, 0.09, 0.28), '#FFFFFF')
    poly(ctx, circ(q, 0.48, 0.3, 0.07, 0.2), '#FFFFFF')
    poly(ctx, [q(0.3, 0.15), q(0.4, 0.15), q(0.4, 0.92), q(0.3, 0.92)], '#FFFFFF')
    poly(ctx, circ(q, 0.35, 0.55, 0.04, 0.18), w.alt)
  }
}

/* Cuatro anillos viales; los que comparten calle circulan en sentido opuesto */
const LOOPS: Pt[][] = [
  [[2.5, 2.5], [5.5, 2.5], [5.5, 5.5], [2.5, 5.5]],
  [[5.5, 2.5], [8.5, 2.5], [8.5, 5.5], [5.5, 5.5]].reverse() as Pt[],
  [[2.5, 5.5], [5.5, 5.5], [5.5, 8.5], [2.5, 8.5]],
  [[8.5, 5.5], [8.5, 8.5], [5.5, 8.5], [5.5, 5.5]].reverse() as Pt[],
]

interface Loop { pts: Pt[]; segLen: number[]; total: number }
const LOOP_DATA: Loop[] = LOOPS.map((pts) => {
  const segLen: number[] = []
  let total = 0
  for (let k = 0; k < pts.length; k++) {
    const a = pts[k]
    const b = pts[(k + 1) % pts.length]
    const l = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
    segLen.push(l)
    total += l
  }
  return { pts, segLen, total }
})

function posOnLoop(loop: Loop, s: number) {
  let d = ((s % loop.total) + loop.total) % loop.total
  for (let k = 0; k < loop.pts.length; k++) {
    if (d <= loop.segLen[k]) {
      const a = loop.pts[k]
      const b = loop.pts[(k + 1) % loop.pts.length]
      const t = d / loop.segLen[k]
      const dx = Math.sign(b[0] - a[0])
      const dy = Math.sign(b[1] - a[1])
      const lane = 0.15
      return {
        x: a[0] + (b[0] - a[0]) * t - dy * lane,
        y: a[1] + (b[1] - a[1]) * t + dx * lane,
        axis: dx !== 0 ? ('x' as const) : ('y' as const),
        sign: dx !== 0 ? dx : dy,
      }
    }
    d -= loop.segLen[k]
  }
  return { x: loop.pts[0][0], y: loop.pts[0][1], axis: 'x' as const, sign: 1 }
}

interface Car {
  loop: number
  s: number
  speed: number
  wrap: Wrap
  featured: boolean
}
function makeCars(): Car[] {
  const cars: Car[] = []
  const speeds = [0.62, 0.7, 0.58, 0.66]
  let w = 0
  for (let l = 0; l < LOOP_DATA.length; l++) {
    for (let k = 0; k < 2; k++) {
      cars.push({
        loop: l,
        s: (LOOP_DATA[l].total / 2) * k + l * 1.3,
        speed: speeds[l],
        wrap: WRAPS[w++ % WRAPS.length],
        featured: l === 0 && k === 0,
      })
    }
  }
  return cars
}

/* ───────────── Dibujo de piezas ───────────── */
function drawBuilding(ctx: CanvasRenderingContext2D, b: Building) {
  const inset = 0.07
  const x = b.i + inset
  const y = b.j + inset
  const d = 1 - inset * 2
  if (b.park) {
    // parque con árboles
    const trees: Pt[] = [[b.i + 0.3, b.j + 0.32], [b.i + 0.68, b.j + 0.5], [b.i + 0.38, b.j + 0.76]]
    trees.sort((a, c) => a[0] + a[1] - (c[0] + c[1]))
    for (const [tx, ty] of trees) {
      drawBox(ctx, tx - 0.03, ty - 0.03, 0, 0.06, 0.06, 0.28, '#8A5A3B', '#7A4E32', '#684229')
      const [cx, cy] = P(tx, ty, 0.55)
      ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.fillStyle = '#58C16B'; ctx.fill()
      ctx.beginPath(); ctx.arc(cx - 4, cy - 5, 9, 0, Math.PI * 2); ctx.fillStyle = '#7FD98C'; ctx.fill()
    }
    return
  }
  const c = b.base
  const top = c === '#FFFFFF' ? '#FFFFFF' : mixW(c, 0.45)
  const right = shade(c, 0.93)
  const left = shade(c, 0.8)
  drawBox(ctx, x, y, 0, d, d, b.h, top, right, left)
  // ventanas
  const rows = Math.max(1, Math.floor(b.h / 0.36))
  let n = 0
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < 2; col++) {
      const u0 = 0.14 + col * 0.42
      const u1 = u0 + 0.3
      const v0 = (r + 0.28) / rows
      const v1 = (r + 0.72) / rows
      const litR = b.lit[n++ % 24] === 1
      const colR = litR ? '#FFE49A' : 'rgba(120,138,200,.35)'
      const colL = litR ? '#FFD779' : 'rgba(90,108,176,.38)'
      poly(ctx, [
        P(x + d, y + u0 * d, v0 * b.h), P(x + d, y + u1 * d, v0 * b.h),
        P(x + d, y + u1 * d, v1 * b.h), P(x + d, y + u0 * d, v1 * b.h),
      ], colR)
      const litL = b.lit[n++ % 24] === 1
      poly(ctx, [
        P(x + u0 * d, y + d, v0 * b.h), P(x + u1 * d, y + d, v0 * b.h),
        P(x + u1 * d, y + d, v1 * b.h), P(x + u0 * d, y + d, v1 * b.h),
      ], litL ? '#FFD779' : colL)
    }
  }
  if (b.tier) {
    const t = 0.2
    drawBox(ctx, x + t, y + t, b.h, d - t * 2, d - t * 2, 0.42, top, right, left)
  } else if (b.ac) {
    drawBox(ctx, x + 0.5, y + 0.2, b.h, 0.22, 0.22, 0.12, '#EDEAF6', '#D9D5EA', '#C4BFDC')
  }
}

function drawCar(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, axis: 'x' | 'y', sign: number, w: Wrap,
) {
  const L = 0.92, W = 0.5, BH = 0.3, CH = 0.24, Z0 = 0.08
  const dx = axis === 'x' ? L : W
  const dy = axis === 'x' ? W : L
  const x0 = x - dx / 2
  const y0 = y - dy / 2
  poly(ctx, [P(x0 - 0.05, y0 - 0.05), P(x0 + dx + 0.08, y0 - 0.05), P(x0 + dx + 0.08, y0 + dy + 0.08), P(x0 - 0.05, y0 + dy + 0.08)], 'rgba(21,18,43,.17)')
  drawBox(ctx, x0 + 0.04, y0 + 0.04, 0, dx - 0.08, dy - 0.08, Z0 + 0.03, '#2A2650', '#1D1A3B', '#15122B')
  const long = axis === 'x' ? 0.8 : 0.9
  const short = axis === 'x' ? 0.9 : 0.8
  drawBox(ctx, x0, y0, Z0, dx, dy, BH, mixW(w.body, 0.12), shade(w.body, axis === 'x' ? short : long), shade(w.body, axis === 'x' ? long : short))
  // gráfico del wrap sobre la cara larga visible
  const q = (u: number, v: number): Pt =>
    axis === 'x' ? P(x0 + u * dx, y0 + dy, Z0 + v * BH) : P(x0 + dx, y0 + u * dy, Z0 + v * BH)
  drawWrapArt(ctx, q, w)
  // luces en la cara corta visible
  const front = sign > 0
  const e = (u: number, v: number): Pt =>
    axis === 'x' ? P(x0 + dx, y0 + u * dy, Z0 + v * BH) : P(x0 + u * dx, y0 + dy, Z0 + v * BH)
  const lc = front ? '#FFF6C2' : '#FF4D4D'
  poly(ctx, [e(0.1, 0.3), e(0.3, 0.3), e(0.3, 0.65), e(0.1, 0.65)], lc)
  poly(ctx, [e(0.7, 0.3), e(0.9, 0.3), e(0.9, 0.65), e(0.7, 0.65)], lc)
  // cabina
  const cl = L * 0.52
  const cw = W * 0.84
  const off = -sign * 0.05
  const cx0 = axis === 'x' ? x - cl / 2 + off : x - cw / 2
  const cy0 = axis === 'x' ? y - cw / 2 : y - cl / 2 + off
  drawBox(ctx, cx0, cy0, Z0 + BH, axis === 'x' ? cl : cw, axis === 'x' ? cw : cl, CH, w.roof, '#34417F', '#222C5E')
}

/* ───────────── Capa estática (suelo, calles) ───────────── */
function drawGround(ctx: CanvasRenderingContext2D, buildings: Building[]) {
  // losa
  drawBox(ctx, 0, 0, -SLAB, N, N, SLAB, '#F3F0FF', '#BDB4E0', '#CFC8EC')
  // calles
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const road = ROADS.includes(i) || ROADS.includes(j)
      const park = buildings.find((b) => b.i === i && b.j === j)?.park
      const fill = road ? '#DEDAEC' : park ? '#CDEFB6' : '#F7F5FF'
      poly(ctx, [P(i, j), P(i + 1, j), P(i + 1, j + 1), P(i, j + 1)], fill)
    }
  }
  // líneas centrales
  ctx.save()
  ctx.setLineDash([9, 9])
  ctx.strokeStyle = 'rgba(255,255,255,.95)'
  ctx.lineWidth = 2
  const runs: [number, number][] = [[0, 2], [3, 5], [6, 8], [9, 11]]
  for (const k of ROADS) {
    for (const [a, b] of runs) {
      let p1 = P(a, k + 0.5), p2 = P(b, k + 0.5)
      ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke()
      p1 = P(k + 0.5, a); p2 = P(k + 0.5, b)
      ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke()
    }
  }
  ctx.restore()
}

/* ───────────── Contenido de bubbles ───────────── */
const DRIVER_MSGS = ['Viaje iniciado', 'GPS activo', 'Kilómetro verificado', 'Viaje finalizado']
const ZONES_ADV: { label: string; bx: number; by: number }[] = [
  { label: 'Zona 10', bx: 2, by: 1 },
  { label: 'Zona 4', bx: 1, by: 2 },
  { label: 'Zona 14', bx: 2, by: 3 },
]
const ZONES_DRV: { label: string; bx: number; by: number }[] = [
  { label: 'Tu ruta de siempre', bx: 1, by: 1 },
]

interface Props { mode?: CityMode; className?: string }

export default function IsoCity({ mode = 'advertiser', className = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current!
    const canvas = canvasRef.current!
    const layer = layerRef.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const buildings = makeScene()
    const cars = makeCars()

    let scale = 1, cssW = 1, dpr = 1
    let ground: HTMLCanvasElement | null = null
    let sprites: { img: HTMLCanvasElement; x: number; y: number; key: number }[] = []
    let visible = true
    let raf = 0
    let last = performance.now()
    let t = 0
    let nextBubble = 0.6
    let msgIdx = 0
    let impressions = 0
    const bubbles: { el: HTMLDivElement; car: Car; born: number; life: number }[] = []

    const build = () => {
      cssW = wrap.clientWidth
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      scale = (cssW * dpr) / WORLD_W
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(WORLD_H * scale)
      canvas.style.width = '100%'
      canvas.style.height = 'auto'
      // suelo
      ground = document.createElement('canvas')
      ground.width = canvas.width
      ground.height = canvas.height
      const g = ground.getContext('2d')!
      g.setTransform(scale, 0, 0, scale, 0, 0)
      drawGround(g, buildings)
      // sprites de edificios
      sprites = buildings.map((b) => {
        const inset = 0.07
        const corners: Pt[] = []
        const hh = b.park ? 1 : b.h + 0.5
        for (const xx of [b.i + inset - 0.1, b.i + 1 - inset + 0.1])
          for (const yy of [b.j + inset - 0.1, b.j + 1 - inset + 0.1])
            for (const zz of [0, hh]) corners.push(P(xx, yy, zz))
        const minX = Math.min(...corners.map((c) => c[0])) - 20
        const maxX = Math.max(...corners.map((c) => c[0])) + 20
        const minY = Math.min(...corners.map((c) => c[1])) - 20
        const maxY = Math.max(...corners.map((c) => c[1])) + 20
        const img = document.createElement('canvas')
        img.width = Math.ceil((maxX - minX) * scale)
        img.height = Math.ceil((maxY - minY) * scale)
        const c = img.getContext('2d')!
        c.setTransform(scale, 0, 0, scale, -minX * scale, -minY * scale)
        drawBuilding(c, b)
        return { img, x: minX, y: minY, key: b.i + b.j + 1 }
      })
    }

    const spawnBubble = () => {
      const car = cars[Math.floor(Math.random() * cars.length)]
      if (bubbles.some((b) => b.car === car)) return
      const pos = document.createElement('div')
      pos.className = 'bubble-pos'
      const inner = document.createElement('div')
      inner.className = `bubble bubble--${mode}`
      if (mode === 'advertiser') {
        const n = 18 + Math.floor(Math.random() * 90)
        impressions += n
        inner.innerHTML = `<i class="bubble__eye" aria-hidden="true"></i><b>+${n}</b><span>impresiones</span>`
        if (counterRef.current) counterRef.current.textContent = impressions.toLocaleString('es-GT')
      } else {
        inner.innerHTML = `<i class="bubble__dot" aria-hidden="true"></i><span>${DRIVER_MSGS[msgIdx++ % DRIVER_MSGS.length]}</span>`
      }
      pos.appendChild(inner)
      layer.appendChild(pos)
      bubbles.push({ el: pos, car, born: t, life: 2.6 })
    }

    const carWorld = (car: Car) => posOnLoop(LOOP_DATA[car.loop], car.s)

    const render = () => {
      if (!ground) return
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(ground, 0, 0)
      ctx.setTransform(scale, 0, 0, scale, 0, 0)
      const pulse = 0.5 + 0.5 * Math.sin(t * 2)

      if (mode === 'advertiser') {
        for (const z of ZONES_ADV) {
          const x0 = BLOCK_START[z.bx], y0 = BLOCK_START[z.by]
          poly(ctx, [P(x0, y0, 0.01), P(x0 + 2, y0, 0.01), P(x0 + 2, y0 + 2, 0.01), P(x0, y0 + 2, 0.01)],
            `rgba(91,61,245,${0.26 + pulse * 0.14})`)
        }
      } else {
        const lp = LOOP_DATA[0].pts
        ctx.save()
        ctx.setLineDash([10, 8])
        ctx.lineDashOffset = -t * 18
        ctx.strokeStyle = '#087F52'
        ctx.lineWidth = 3.5
        ctx.lineJoin = 'round'
        ctx.beginPath()
        lp.forEach((p, k) => {
          const s = P(p[0], p[1], 0.02)
          if (k === 0) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1])
        })
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      }

      type D = { key: number; draw: () => void }
      const items: D[] = []
      for (const s of sprites) {
        items.push({
          key: s.key,
          draw: () => {
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.drawImage(s.img, Math.round(s.x * scale), Math.round(s.y * scale))
            ctx.setTransform(scale, 0, 0, scale, 0, 0)
          },
        })
      }
      for (const car of cars) {
        const p = carWorld(car)
        items.push({
          key: p.x + p.y + 0.55,
          draw: () => {
            if (mode === 'driver' && car.featured) {
              const [gx, gy] = P(p.x, p.y, 0)
              ctx.beginPath()
              ctx.ellipse(gx, gy, 30 + pulse * 10, 15 + pulse * 5, 0, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(8,127,82,${0.28 - pulse * 0.16})`
              ctx.fill()
            }
            drawCar(ctx, p.x, p.y, p.axis, p.sign, car.wrap)
          },
        })
      }
      items.sort((a, b) => a.key - b.key)
      for (const it of items) it.draw()

      // bubbles
      const k = cssW / WORLD_W
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i]
        if (t - b.born > b.life) {
          b.el.remove()
          bubbles.splice(i, 1)
          continue
        }
        const p = carWorld(b.car)
        const [sx, sy] = P(p.x, p.y, 0.6)
        b.el.style.transform = `translate(${(sx * k).toFixed(1)}px, ${(sy * k).toFixed(1)}px)`
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible) { last = now; return }
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt
      for (const c of cars) c.s += c.speed * dt
      nextBubble -= dt
      if (nextBubble <= 0) {
        spawnBubble()
        nextBubble = 0.9 + Math.random() * 0.9
      }
      render()
    }

    build()
    const ro = new ResizeObserver(() => { build(); render() })
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(wrap)

    if (reduce) {
      // un solo cuadro estático con algunas burbujas fijas
      for (let i = 0; i < 3; i++) spawnBubble()
      bubbles.forEach((b) => (b.life = 1e9))
      render()
    } else {
      raf = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      bubbles.forEach((b) => b.el.remove())
    }
  }, [mode])

  const zones = mode === 'advertiser' ? ZONES_ADV : ZONES_DRV
  return (
    <div
      ref={wrapRef}
      className={`isocity isocity--${mode} ${className}`}
      role="img"
      aria-label={
        mode === 'advertiser'
          ? 'Ilustración isométrica de una mini ciudad con autos rotulados circulando y burbujas de impresiones estimadas.'
          : 'Ilustración isométrica de una mini ciudad con un auto siguiendo una ruta marcada con GPS.'
      }
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      {zones.map((z) => {
        const [sx, sy] = P(BLOCK_START[z.bx] + 1, BLOCK_START[z.by] + 1, 3.6)
        return (
          <div
            key={z.label}
            className="zone-pin"
            style={{ left: `${(sx / WORLD_W) * 100}%`, top: `${(sy / WORLD_H) * 100}%` }}
          >
            <span>{z.label}</span>
          </div>
        )
      })}
      <div ref={layerRef} className="isocity__layer" aria-hidden="true" />
      <div className="isocity__hud">
        <span className="live-dot" aria-hidden="true" />
        {mode === 'advertiser' ? (
          <>
            Simulación ilustrativa · impresiones: <b ref={counterRef}>0</b>
          </>
        ) : (
          <>Simulación ilustrativa de un viaje con GPS</>
        )}
      </div>
    </div>
  )
}
