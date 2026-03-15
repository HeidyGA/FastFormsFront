import { createClient } from '@supabase/supabase-js'

// configuracion de supabase

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
export const supabase = createClient(supabaseUrl, supabasePublishableKey)