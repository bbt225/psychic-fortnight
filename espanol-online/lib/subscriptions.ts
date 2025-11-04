import type { SubscriptionTier } from './types'

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    plan: 'free',
    name: 'Free',
    price: 0,
    priceMonthly: 0,
    discount: 0,
    features: [
      '10% всех уроков',
      'Базовые тесты',
      'Реклама',
      'Сообщество'
    ],
    accessPercentage: 10
  },
  {
    plan: 'monthly',
    name: 'Месячный',
    price: 990,
    priceMonthly: 990,
    discount: 0,
    features: [
      'Все 450 уроков',
      'Все типы тестов',
      'Без рекламы',
      'Сертификат',
      'Поддержка'
    ],
    accessPercentage: 100
  },
  {
    plan: 'quarterly',
    name: 'Квартальный',
    price: 2490,
    priceMonthly: 830,
    discount: 15,
    features: [
      'Все 450 уроков',
      'Все типы тестов',
      'Без рекламы',
      'Сертификат',
      'Приоритетная поддержка',
      'Скидка 15%'
    ],
    accessPercentage: 100
  },
  {
    plan: 'annual',
    name: 'Годовой',
    price: 7990,
    priceMonthly: 665,
    discount: 33,
    features: [
      'Все 450 уроков',
      'Все типы тестов',
      'Без рекламы',
      'Сертификат',
      'Персональные консультации',
      'Скидка 33%',
      'Эксклюзивные материалы'
    ],
    accessPercentage: 100
  }
]

export function canAccessLesson(userPlan: string, lessonNumber: number, totalLessons: number): boolean {
  // Первые 3 урока бесплатно для всех
  if (lessonNumber <= 3) return true

  const tier = SUBSCRIPTION_TIERS.find(t => t.plan === userPlan)
  if (!tier) return false

  if (tier.plan === 'free') {
    // Free: доступ к 10% уроков
    const freeLimit = Math.ceil(totalLessons * 0.1)
    return lessonNumber <= freeLimit
  }

  // Premium plans: full access
  return true
}

export function getUserStats(progress: any[]): {
  lessonsCompleted: number
  testsCompleted: number
  averageScore: number
  wordsLearned: number
  studyTime: number
  streak: number
} {
  const completed = progress.filter(p => p.completed)
  const avgScore = completed.length > 0
    ? completed.reduce((sum, p) => sum + p.score, 0) / completed.length
    : 0

  return {
    lessonsCompleted: completed.length,
    testsCompleted: progress.length,
    averageScore: Math.round(avgScore),
    wordsLearned: completed.length * 12, // 12 слов на урок
    studyTime: completed.length * 30, // 30 мин на урок
    streak: 0 // TODO: calculate streak
  }
}
