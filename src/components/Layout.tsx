import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from './Icon'
import RoadStrip from './RoadStrip'
import { Container } from './ui'
import { config } from '../lib/config'

function Logo() {
  return (
    <span className="logo" aria-label="Estiky">
      <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
        <rect width="40" height="40" rx="11" style={{ fill: 'var(--brand)' }} />
        <path d="M8 24c0-4 2.5-6.4 6-7.6l3-5c.6-1 1.7-1.7 3-1.7h6.6c1.2 0 2.3.6 2.9 1.7l2.5 5c2 1 3 3.2 3 5.6v3.8H8z" fill="#fff" />
        <rect x="14" y="14" width="12" height="5" rx="1.5" style={{ fill: 'var(--brand)' }} />
        <rect x="8" y="23" width="26" height="2.6" fill="#C8F31D" />
        <circle cx="14.5" cy="29" r="3.2" fill="#15122B" />
        <circle cx="28" cy="29" r="3.2" fill="#15122B" />
      </svg>
      <span className="logo__word">estiky</span>
    </span>
  )
}

type L = { to: string; label: string; desc?: string }
const ADV_MAIN: L[] = [
  { to: '/plataforma', label: 'Plataforma' },
  { to: '/formatos', label: 'Formatos' },
  { to: '/como-funciona', label: 'Cómo funciona' },
]
const ADV_MORE: L[] = [
  { to: '/medicion', label: 'Medición', desc: 'Km verificados, zonas e impresiones' },
  { to: '/inversion', label: 'Inversión', desc: 'Qué incluye y cómo se cotiza' },
  { to: '/casos-de-uso', label: 'Casos de uso', desc: 'Lanzamientos, sucursales, temporadas' },
  { to: '/comparativa', label: 'Comparativa', desc: 'Estiky frente a la valla fija' },
  { to: '/nosotros', label: 'Nosotros', desc: 'Por qué existe Estiky' },
  { to: '/ayuda', label: 'Ayuda', desc: 'Preguntas frecuentes' },
  { to: '/contacto', label: 'Contacto', desc: 'Ventas, soporte y legal' },
]
const DRV_MAIN: L[] = [
  { to: '/conductores/requisitos', label: 'Requisitos' },
  { to: '/conductores/pagos', label: 'Pagos' },
]
const DRV_MORE: L[] = [
  { to: '/conductores/seguridad', label: 'Seguridad y privacidad', desc: 'Tú controlas el GPS' },
  { to: '/conductores/ayuda', label: 'Ayuda', desc: 'Preguntas frecuentes' },
  { to: '/contacto', label: 'Contacto', desc: 'Escríbenos' },
]

function MoreMenu({ items }: { items: L[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])
  const active = items.some((i) => i.to === pathname)
  return (
    <div className="more" ref={ref}>
      <button type="button" className={`more__btn ${active ? 'is-active' : ''}`} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        Más <Icon name="plus" size={14} />
      </button>
      {open && (
        <div className="more__panel">
          {items.map((i) => (
            <Link key={i.to} to={i.to} className={i.to === pathname ? 'is-active' : ''}>
              <b>{i.label}</b>{i.desc && <small>{i.desc}</small>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const driver = pathname.startsWith('/conductores')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.surface = driver ? 'driver' : 'advertiser'
  }, [driver])
  useEffect(() => {
    setOpen(false)
    if (!window.location.hash) window.scrollTo({ top: 0 })
    else {
      const el = document.getElementById(window.location.hash.slice(1))
      el?.scrollIntoView()
    }
  }, [pathname])

  const links = driver ? DRV_MAIN : ADV_MAIN
  const more = driver ? DRV_MORE : ADV_MORE
  const cta = driver
    ? { to: '/conductores/registro', label: 'Crear cuenta' }
    : { to: '/registro', label: 'Crear cuenta' }
  const login = driver ? '/conductores/ingresar' : '/ingresar'

  return (
    <>
      <a className="skip" href="#main">Saltar al contenido</a>
      <header className="nav">
        <Container className="nav__inner">
          <Link to={driver ? '/conductores' : '/'} className="nav__logo" aria-label="Estiky, inicio">
            <Logo />
          </Link>
          <nav className="nav__links" aria-label="Principal">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>{l.label}</NavLink>
            ))}
            <MoreMenu items={more} />
          </nav>
          <div className="nav__right">
            <div className="switch" role="group" aria-label="Elige tu perfil">
              <Link to="/" className={!driver ? 'is-on' : ''} aria-current={!driver ? 'page' : undefined}>Anunciantes</Link>
              <Link to="/conductores" className={driver ? 'is-on' : ''} aria-current={driver ? 'page' : undefined}>Conductores</Link>
            </div>
            <Link to={login} className="nav__login">Ingresar</Link>
            <Link to={cta.to} className="btn btn--primary btn--md nav__cta"><span>{cta.label}</span></Link>
            <button className="nav__burger" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>
              <Icon name={open ? 'x' : 'menu'} />
            </button>
          </div>
        </Container>
        {open && (
          <div className="nav__sheet">
            <div className="switch switch--full" role="group" aria-label="Elige tu perfil">
              <Link to="/" className={!driver ? 'is-on' : ''}>Anunciantes</Link>
              <Link to="/conductores" className={driver ? 'is-on' : ''}>Conductores</Link>
            </div>
            {[...links, ...more].map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
            <Link to={login}>Ingresar</Link>
            <Link to={cta.to} className="btn btn--primary btn--lg"><span>{cta.label}</span></Link>
          </div>
        )}
      </header>
      <main id="main"><Outlet /></main>
      <Footer driver={driver} />
      <RoadStrip />
    </>
  )
}

function Footer({ driver }: { driver: boolean }) {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>Publicidad exterior on-demand en autos reales, medida con GPS.</p>
            <p className="footer__pilot"><span className="live-dot" aria-hidden="true" /> Disponible en Ciudad de Guatemala</p>
          </div>
          <div>
            <h4>Anunciantes</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/plataforma">Plataforma</Link></li>
              <li><Link to="/formatos">Formatos</Link></li>
              <li><Link to="/como-funciona">Cómo funciona</Link></li>
              <li><Link to="/medicion">Medición y métricas</Link></li>
              <li><Link to="/comparativa">Comparativa con vallas</Link></li>
              <li><Link to="/inversion">Inversión</Link></li>
              <li><Link to="/casos-de-uso">Casos de uso</Link></li>
              <li><Link to="/registro">Crear cuenta</Link></li>
              <li><Link to="/demo">Hablar con ventas</Link></li>
            </ul>
          </div>
          <div>
            <h4>Conductores</h4>
            <ul>
              <li><Link to="/conductores">Inicio</Link></li>
              <li><Link to="/conductores/requisitos">Requisitos y verificación</Link></li>
              <li><Link to="/conductores/pagos">Pagos</Link></li>
              <li><Link to="/conductores/seguridad">Seguridad y privacidad</Link></li>
              <li><Link to="/conductores/ayuda">Ayuda</Link></li>
              <li><Link to="/conductores/registro">Crear cuenta</Link></li>
            </ul>
          </div>
          <div>
            <h4>Estiky</h4>
            <ul>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to={driver ? '/conductores/ayuda' : '/ayuda'}>Ayuda</Link></li>
              <li><Link to="/legal/terminos">Términos de uso</Link></li>
              <li><Link to="/legal/privacidad">Política de privacidad</Link></li>
              <li><a href={`mailto:${config.salesEmail}`}>{config.salesEmail}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Estiky. Todos los derechos reservados.</span>
          <span>Hecho en Guatemala.</span>
        </div>
      </Container>
    </footer>
  )
}
