/**
 * Eventos mínimos de conversión. Nunca se envían datos personales en los parámetros.
 * Si hay un proveedor (gtag / plausible) en window, se usa; si no, no pasa nada.
 */
export type EventName =
  | 'demo_request'
  | 'signup_advertiser'
  | 'signup_driver'
  | 'login_advertiser'
  | 'login_driver'
  | 'app_click'

type W = Window & {
  gtag?: (...a: unknown[]) => void
  plausible?: (name: string, opts?: { props?: Record<string, string> }) => void
}

export function track(name: EventName, props: Record<string, string> = {}) {
  const w = window as W
  try {
    w.gtag?.('event', name, props)
    w.plausible?.(name, { props })
  } catch {
    /* sin analítica no pasa nada */
  }
}
