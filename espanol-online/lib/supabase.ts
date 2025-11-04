import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTc2OTIwMCwiZXhwIjoxOTU3MzQ1MjAwfQ.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'user' | 'admin' | 'premium'
          subscription: 'free' | 'monthly' | 'quarterly' | 'annual'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'user' | 'admin' | 'premium'
          subscription?: 'free' | 'monthly' | 'quarterly' | 'annual'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'user' | 'admin' | 'premium'
          subscription?: 'free' | 'monthly' | 'quarterly' | 'annual'
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          level: string
          number: number
          title: string
          content: any
          created_at: string
        }
        Insert: {
          id?: string
          level: string
          number: number
          title: string
          content: any
          created_at?: string
        }
        Update: {
          id?: string
          level?: string
          number?: number
          title?: string
          content?: any
          created_at?: string
        }
      }
      progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          score: number
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          score: number
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          score?: number
          completed?: boolean
          created_at?: string
        }
      }
    }
  }
}
