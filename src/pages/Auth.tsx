import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import IsoCity from '../components/IsoCity'
import { Button, Container } from '../components/ui'
import { authConfigured } from '../lib/config'
import { getSupabase } from '../lib/supabase'
import { appUrlFor, buildHandoffUrl, type Role } from '../lib/handoff'
import { track } from '../lib/analytics'
import { useSeo } from '../lib/seo'

interface Props { role: Role; mode: 'login' | 'signup' }

export default function Auth({ role, mode }: Props) {
  const driver = role === 'driver'
  const base = driver ? '/conductores' : ''
  const signup = mode === 'signup'
  useSeo(
    `${signup ? 'Crear cuenta' : 'Ingresar'} de ${driver ? 'conductor' : 'anunciante'}`,
    `${signup ? 'Crea tu cuenta' : 'Ingresa a tu cuenta'} de ${driver ? 'conductor' : 'anunciante'} en Estiky.`,
    `${base}/${signup ? 'registro' : 'ingresar'}`,
    true,
  )
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)
  const [next, setNext] = useState<{ url: string | null } | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(''); setInfo('')
    const sb = getSupabase()
    if (!sb) { setError('El acceso aún no está conectado en este entorno. Intenta más tarde o escríbenos.'); return }
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')
    const name = String(fd.get('name') ?? '').trim()
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError('Escribe un correo válido.'); return }
    if (password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return }
    setBusy(true)
    try {
      if (signup) {
        const { data, error: err } = await sb.auth.signUp({ email, password, options: { data: { role, full_name: name, company: String(fd.get('company') ?? '') } } })
        if (err) throw err
        track(driver ? 'signup_driver' : 'signup_advertiser')
        if (data.session) setNext(await buildHandoffUrl(role))
        else setInfo('Te enviamos un correo para confirmar tu cuenta. Después de confirmar, vuelve aquí para ingresar.')
      } else {
        const { data, error: err } = await sb.auth.signInWithPassword({ email, password })
        if (err) throw err
        const r = data.user?.user_metadata?.role as Role | undefined
        if (r && r !== role) {
          await sb.auth.signOut()
          setError(r === 'driver' ? 'Esta cuenta es de conductor. Ingresa desde la sección de conductores.' : 'Esta cuenta es de anunciante. Ingresa desde la sección de anunciantes.')
          return
        }
        track(driver ? 'login_driver' : 'login_advertiser')
        setNext(await buildHandoffUrl(role))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos completar la acción.')
    } finally {
      setBusy(false)
    }
  }

  if (next) {
    return (
      <section className="authpage"><Container>
        <div className="done">
          <span className="done__icon"><Icon name="check" size={34} /></span>
          <h1 className="h1 h1--page">¡Listo!</h1>
          <p className="lead lead--xl">Tu sesión está iniciada. {next.url ? `Continúa a ${driver ? 'la app del conductor' : 'tu dashboard de anunciante'}.` : 'La app todavía no está configurada en este entorno.'}</p>
          {next.url && <Button href={next.url} size="lg" icon="arrow" onClick={() => track('app_click', { role })}>{driver ? 'Abrir la app' : 'Ir a mi dashboard'}</Button>}
        </div>
      </Container></section>
    )
  }

  return (
    <section className="authpage">
      <Container className="authpage__grid">
        <div className="authpage__form">
          <p className="eyebrow">{driver ? 'Conductores' : 'Anunciantes'}</p>
          <h1 className="h1 h1--page">{signup ? `Crea tu cuenta de ${driver ? 'conductor' : 'anunciante'}` : `Ingresa a tu cuenta`}</h1>
          <p className="lead">{signup ? (driver ? 'Empieza tu registro y verificación.' : 'Crea, monitorea y administra tus campañas en tu panel.') : 'Usa el correo con el que te registraste.'}</p>
          {!authConfigured && <div className="alert" role="status"><b>Acceso no conectado en este entorno.</b> Configura Supabase para activar el registro y el ingreso.</div>}
          <form className="form" onSubmit={onSubmit} noValidate>
            {signup && (
              <div className="field"><label htmlFor="a-name">Nombre completo</label><input id="a-name" name="name" autoComplete="name" required /></div>
            )}
            {signup && !driver && (
              <div className="field"><label htmlFor="a-company">Empresa</label><input id="a-company" name="company" autoComplete="organization" /></div>
            )}
            <div className="field"><label htmlFor="a-email">Correo</label><input id="a-email" name="email" type="email" autoComplete="email" required /></div>
            <div className="field"><label htmlFor="a-pass">Contraseña</label><input id="a-pass" name="password" type="password" autoComplete={signup ? 'new-password' : 'current-password'} required minLength={8} /></div>
            {error && <p className="alert alert--err" role="alert">{error}</p>}
            {info && <p className="alert" role="status">{info}</p>}
            <Button type="submit" size="lg" icon="arrow" disabled={busy}>{busy ? 'Un momento…' : signup ? 'Crear cuenta' : 'Ingresar'}</Button>
          </form>
          <p className="muted">
            {signup ? <>¿Ya tienes cuenta? <Link to={`${base}/ingresar`}>Ingresa</Link></> : <>¿Aún no tienes cuenta? <Link to={`${base}/registro`}>Crea una</Link></>}
            {' · '}
            {driver ? <Link to="/ingresar">Soy anunciante</Link> : <Link to="/conductores/ingresar">Soy conductor</Link>}
          </p>
          {!appUrlFor(role) && authConfigured && <p className="muted">Tras ingresar te llevaremos a la app cuando esté configurada.</p>}
        </div>
        <div className="authpage__art"><IsoCity mode={role} /></div>
      </Container>
    </section>
  )
}
