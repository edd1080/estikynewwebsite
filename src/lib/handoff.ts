import { config } from './config'
import { getSupabase } from './supabase'

export type Role = 'advertiser' | 'driver'

export function appUrlFor(role: Role) {
  return role === 'advertiser' ? config.advertiserAppUrl : config.driverAppUrl
}

/**
 * Continuidad de sesión hacia la app.
 * Pide a un endpoint propio un código de un solo uso (que la app canjea).
 * NUNCA se pasan access/refresh tokens por query string.
 * Devuelve la URL a la que debe ir el usuario, o null si no hay app configurada.
 */
export async function buildHandoffUrl(role: Role): Promise<{ url: string | null; usedCode: boolean }> {
  const base = appUrlFor(role)
  if (!base) return { url: null, usedCode: false }
  const sb = getSupabase()
  const session = sb ? (await sb.auth.getSession()).data.session : null
  if (config.handoffEndpoint && session) {
    try {
      const res = await fetch(config.handoffEndpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })
      if (res.ok) {
        const { code } = (await res.json()) as { code?: string }
        if (code) {
          const u = new URL('/auth/handoff', base)
          u.searchParams.set('code', code)
          return { url: u.toString(), usedCode: true }
        }
      }
    } catch {
      /* cae al enlace simple */
    }
  }
  return { url: base, usedCode: false }
}
