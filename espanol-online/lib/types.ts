export type CEFRLevel = 'Базовый' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export type SubscriptionPlan = 'free' | 'monthly' | 'quarterly' | 'annual'

export type UserRole = 'guest' | 'user' | 'premium' | 'admin'

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  subscription: SubscriptionPlan
  avatar?: string
  createdAt?: Date
}

export interface UserProfile {
  userId: string
  firstName: string
  lastName: string
  currentLevel: CEFRLevel
  totalXP: number
  streak: number
  studiedWords: string[]
  favoriteLE: string[]
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

export interface SubscriptionTier {
  plan: SubscriptionPlan
  name: string
  price: number
  priceMonthly: number
  discount: number
  features: string[]
  accessPercentage: number
}

export interface PaymentHistory {
  id: string
  userId: string
  amount: number
  plan: SubscriptionPlan
  status: 'success' | 'failed'
  createdAt: Date
}

export interface UserStats {
  lessonsCompleted: number
  testsCompleted: number
  averageScore: number
  wordsLearned: number
  studyTime: number
  streak: number
}
