import { useEffect, useRef } from 'react'
import WrapCar from './WrapCar'

const CARS = [
  { color: '#5B3DF5', accent: '#C8F31D', mul: 1.0, off: 0.0 },
  { color: '#FF5C7A', accent: '#FFFFFF', mul: 1.35, off: 0.42 },
  { color: '#FFC93C', accent: '#15122B', mul: 0.8, off: 0.75 },
]

/** Calle fija al pie de la pantalla: los autos avanzan al ritmo del scroll. */
export default function RoadStrip() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let lastY = window.scrollY
    let dir = 1
    let timer: number | undefined
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - window.innerHeight)
      const p = window.scrollY / max
      const vw = window.innerWidth
      const span = vw + 240
      CARS.forEach((c, i) => {
        const el = refs.current[i]
        if (!el) return
        const x = (((p * c.mul * 1.6 + c.off) % 1) + 1) % 1
        el.style.transform = `translate3d(${(x * span - 120).toFixed(1)}px,0,0) scaleX(${dir})`
      })
    }
    const onScroll = () => {
      const y = window.scrollY
      if (y !== lastY) dir = y > lastY ? 1 : -1
      lastY = y
      wrap.current?.classList.add('is-moving')
      window.clearTimeout(timer)
      timer = window.setTimeout(() => wrap.current?.classList.remove('is-moving'), 180)
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="roadstrip" ref={wrap} aria-hidden="true">
      <div className="roadstrip__road" />
      {CARS.map((c, i) => (
        <div key={i} className="roadstrip__car" ref={(el) => { refs.current[i] = el }}>
          <WrapCar coverage="full" color={c.color} accent={c.accent} text="" />
        </div>
      ))}
    </div>
  )
}
