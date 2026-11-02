import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { config, authConfigured } from './config'

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!authConfigured) return null
  if (!client) {
    client = createClient(config.supabaseUrl as string, config.supabaseAnonKey as string, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
  }
  return client
}
