const env = import.meta.env

export const config = {
  siteUrl: (env.VITE_SITE_URL as string | undefined) ?? 'https://estiky.com',
  supabaseUrl: env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY as string | undefined,
  advertiserAppUrl: env.VITE_ADVERTISER_APP_URL as string | undefined,
  driverAppUrl: env.VITE_DRIVER_APP_URL as string | undefined,
  handoffEndpoint: env.VITE_HANDOFF_ENDPOINT as string | undefined,
  demoEndpoint: env.VITE_DEMO_ENDPOINT as string | undefined,
  // Canales por confirmar con el equipo (ver CONTENT.md)
  salesEmail: (env.VITE_SALES_EMAIL as string | undefined) ?? 'ventas@estiky.com',
  supportEmail: (env.VITE_SUPPORT_EMAIL as string | undefined) ?? 'soporte@estiky.com',
  legalEmail: (env.VITE_LEGAL_EMAIL as string | undefined) ?? 'legal@estiky.com',
}

export const authConfigured = Boolean(config.supabaseUrl && config.supabaseAnonKey)

// Plazo de respuesta a solicitudes de propuesta (por confirmar con el equipo)
export const RESPONSE_WINDOW = '2 días hábiles'
