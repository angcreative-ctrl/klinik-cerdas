import { createClient } from '@supabase/supabase-js'

// Kolom di bawah ini wajib diganti dengan data asli dari dashboard Supabase kamu
const supabaseUrl = 'https://tqgsuwtsyvdzuxdkazvk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZ3N1d3RzeXZkenV4ZGthenZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMzA5NDgsImV4cCI6MjA5NjYwNjk0OH0.BL_sGNddIsCbNEJo516mmjYPtzK3K20AHfJ_lmSWm3Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)