export type CEFRLevel = 'Базовый' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export type SubscriptionPlan = 'free' | 'monthly' | 'quarterly' | 'annual'

export type UserRole = 'user' | 'premium' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  subscription: SubscriptionPlan
}

export type TestType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'matching'
  | 'audio'
  | 'translation'
  | 'sentence-order'

export interface Test {
  id: string
  type: TestType
  question: string
  options?: string[]
  correctAnswer: string | string[]
  audioUrl?: string
}

export interface Lesson {
  id: string
  level: CEFRLevel
  number: number
  title: string
  vocabulary: Array<{
    spanish: string
    russian: string
    example: string
  }>
  grammar: {
    title: string
    explanation: string
    examples: string[]
  }
  reading: {
    title: string
    text: string
    translation: string
  }
  tests: Test[]
}

export interface Progress {
  id: string
  userId: string
  lessonId: string
  score: number
  completed: boolean
  completedAt?: Date
}
