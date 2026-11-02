import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../../components/Icon'
import { Button, Container } from '../../components/ui'
import { config, RESPONSE_WINDOW } from '../../lib/config'
import { track } from '../../lib/analytics'
import { useSeo } from '../../lib/seo'

const ZONAS = ['Zona 1', 'Zona 4', 'Zona 9', 'Zona 10', 'Zona 14', 'Zona 15', 'Varias zonas', 'Aún no lo sé']
const DURACIONES = ['2 semanas', '1 mes', '2 meses', '3 meses o más', 'Aún no lo sé']
const FORMATOS = ['Full wrap', 'Panel+', 'Panel', 'Quiero asesoría']
const PRESUPUESTOS = ['Menos de Q15,000', 'Q15,000 – Q50,000', 'Q50,000 – Q150,000', 'Más de Q150,000', 'Prefiero definirlo con el equipo']

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-connected'

export default function Demo() {
  useSeo('Solicitar propuesta', 'Cuéntanos tu objetivo, zonas y duración. El equipo de Estiky te responde con una propuesta de campaña.', '/demo')
  const [params] = useSearchParams()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mailto, setMailto] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries()) as Record<string, string>
    const err: Record<string, string> = {}
    if (!data.empresa?.trim()) err.empresa = 'Escribe el nombre de tu empresa.'
    if (!data.nombre?.trim()) err.nombre = 'Escribe tu nombre.'
    if (!/^\S+@\S+\.\S+$/.test(data.correo ?? '')) err.correo = 'Escribe un correo válido.'
    if (!data.telefono?.trim()) err.telefono = 'Escribe un teléfono de contacto.'
    if (!data.objetivo?.trim()) err.objetivo = 'Cuéntanos brevemente tu objetivo.'
    setErrors(err)
    if (Object.keys(err).length) {
      document.getElementById(`f-${Object.keys(err)[0]}`)?.focus()
      return
    }
    if (data.web) return // honeypot
    const body = Object.entries(data).filter(([k]) => k !== 'web').map(([k, v]) => `${k}: ${v}`).join('\n')

    if (!config.demoEndpoint) {
      setMailto(`mailto:${config.salesEmail}?subject=${encodeURIComponent('Solicitud de propuesta — ' + data.empresa)}&body=${encodeURIComponent(body)}`)
      setStatus('not-connected')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(config.demoEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, origen: 'website', fecha: new Date().toISOString() }) })
      if (!res.ok) throw new Error(String(res.status))
      track('demo_request')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section className="formpage"><Container>
        <div className="done">
          <span className="done__icon"><Icon name="check" size={34} /></span>
          <h1 className="h1 h1--page">¡Recibimos tu solicitud!</h1>
          <p className="lead lead--xl">Un integrante del equipo de Estiky te escribirá en un máximo de <b>{RESPONSE_WINDOW}</b> para confirmar los detalles y preparar tu propuesta.</p>
          <ol className="done__next">
            <li>Revisamos tu objetivo y zonas.</li>
            <li>Confirmamos disponibilidad de vehículos.</li>
            <li>Te enviamos la propuesta con formato, duración y qué incluye.</li>
          </ol>
          <div className="btn-row"><Button to="/" variant="ghost">Volver al inicio</Button><Button to="/formatos" variant="ink">Ver formatos</Button></div>
        </div>
      </Container></section>
    )
  }

  const field = (id: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="field">
      <label htmlFor={`f-${id}`}>{label}</label>
      <input id={`f-${id}`} name={id} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `e-${id}` : undefined} {...props} />
      {errors[id] && <p className="field__err" id={`e-${id}`}>{errors[id]}</p>}
    </div>
  )
  const select = (id: string, label: string, opts: string[], def?: string | null) => (
    <div className="field">
      <label htmlFor={`f-${id}`}>{label}</label>
      <select id={`f-${id}`} name={id} defaultValue={def && opts.includes(def) ? def : ''}>
        <option value="">Selecciona…</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  )

  return (
    <section className="formpage">
      <Container className="formpage__grid">
        <div className="formpage__intro">
          <p className="eyebrow">Solicitar propuesta</p>
          <h1 className="h1 h1--page">Cuéntanos qué quieres lograr.</h1>
          <p className="lead lead--xl">Con estos datos armamos una propuesta con formato, zonas, duración y qué incluye el presupuesto.</p>
          <ul className="formpage__next">
            <li><Icon name="clock" size={18} /> Respuesta en un máximo de <b>{RESPONSE_WINDOW}</b>.</li>
            <li><Icon name="shield" size={18} /> Sin compromiso.</li>
            <li><Icon name="lock" size={18} /> Usamos tus datos solo para responder esta solicitud. <Link to="/legal/privacidad">Privacidad</Link>.</li>
          </ul>
          <p className="formpage__alt">¿Prefieres escribir? <a href={`mailto:${config.salesEmail}`}>{config.salesEmail}</a></p>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="form__row">
            {field('empresa', 'Empresa', { required: true, autoComplete: 'organization' })}
            {field('nombre', 'Persona de contacto', { required: true, autoComplete: 'name' })}
          </div>
          <div className="form__row">
            {field('correo', 'Correo', { type: 'email', required: true, autoComplete: 'email' })}
            {field('telefono', 'Teléfono', { type: 'tel', required: true, autoComplete: 'tel' })}
          </div>
          <div className="field">
            <label htmlFor="f-objetivo">Objetivo de la campaña</label>
            <textarea id="f-objetivo" name="objetivo" rows={3} required aria-invalid={!!errors.objetivo} placeholder="Ej. Lanzar un producto nuevo, abrir una sucursal, promoción de temporada…" />
            {errors.objetivo && <p className="field__err">{errors.objetivo}</p>}
          </div>
          <div className="form__row">
            {select('zona', 'Zonas de interés', ZONAS, params.get('zona'))}
            {select('duracion', 'Duración estimada', DURACIONES, params.get('duracion'))}
          </div>
          <div className="form__row">
            {select('formato', 'Formato de interés', FORMATOS, params.get('formato'))}
            {select('presupuesto', 'Presupuesto aproximado', PRESUPUESTOS)}
          </div>
          <div className="field">
            <label htmlFor="f-notas">Notas (opcional)</label>
            <textarea id="f-notas" name="notas" rows={3} />
          </div>
          <input type="text" name="web" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

          {status === 'error' && <p className="alert alert--err" role="alert">No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos a <a href={`mailto:${config.salesEmail}`}>{config.salesEmail}</a>.</p>}
          {status === 'not-connected' && (
            <div className="alert" role="status">
              <b>El formulario aún no está conectado a nuestro CRM.</b>
              <p>Para no perder tu solicitud, envíala por correo con un clic: ya dejamos tus datos listos.</p>
              <a className="btn btn--primary btn--md" href={mailto} onClick={() => track('demo_request')}><span>Enviar por correo</span></a>
            </div>
          )}
          <Button type="submit" size="lg" icon="arrow" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}</Button>
        </form>
      </Container>
    </section>
  )
}
