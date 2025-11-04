'use client'

import { create } from 'zustand'
import { supabase } from './supabase'
import { LESSONS_DATA } from './lessonGenerator'
import type { User, Lesson, Progress, SubscriptionPlan } from './types'

interface Store {
  user: User | null
  lessons: Lesson[]
  progress: Progress[]
  loading: boolean

  // Auth
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  checkUser: () => Promise<void>

  // User
  setUser: (user: User | null) => void
  updateSubscription: (plan: SubscriptionPlan) => Promise<void>

  // Progress
  completeLesson: (lessonId: string, score: number) => Promise<void>
  loadProgress: () => Promise<void>
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  lessons: LESSONS_DATA,
  progress: [],
  loading: true,

  checkUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Load user profile from database
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          set({
            user: {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role,
              subscription: profile.subscription
            },
            loading: false
          })
          get().loadProgress()
        } else {
          set({ user: null, loading: false })
        }
      } else {
        set({ user: null, loading: false })
      }
    } catch (error) {
      console.error('Error checking user:', error)
      set({ user: null, loading: false })
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        await get().checkUser()
      }
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  },

  signUp: async (email, password, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        // Create user profile
        await supabase.from('users').insert({
          id: data.user.id,
          email,
          name,
          role: 'user',
          subscription: 'free'
        })

        await get().checkUser()
      }
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut()
      set({ user: null, progress: [] })
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  },

  setUser: (user) => {
    set({ user })
  },

  updateSubscription: async (plan) => {
    const { user } = get()
    if (!user) return

    try {
      await supabase
        .from('users')
        .update({ subscription: plan })
        .eq('id', user.id)

      set({ user: { ...user, subscription: plan } })
    } catch (error) {
      console.error('Error updating subscription:', error)
      throw error
    }
  },

  loadProgress: async () => {
    const { user } = get()
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error

      set({
        progress: data.map(p => ({
          id: p.id,
          userId: p.user_id,
          lessonId: p.lesson_id,
          score: p.score,
          completed: p.completed,
          completedAt: p.created_at ? new Date(p.created_at) : undefined
        }))
      })
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  },

  completeLesson: async (lessonId, score) => {
    const { user } = get()
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          score,
          completed: score >= 70
        })
        .select()
        .single()

      if (error) throw error

      await get().loadProgress()
    } catch (error) {
      console.error('Error completing lesson:', error)
      throw error
    }
  }
}))
