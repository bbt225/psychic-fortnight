'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { getUserStats } from '@/lib/subscriptions'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const { user, progress, lessons, checkUser } = useStore()

  useEffect(() => {
    checkUser()
  }, [])

  if (!user) {
    router.push('/')
    return null
  }

  const stats = getUserStats(progress)
  const totalLessons = lessons.length

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-semibold text-primary">EspañolOnline</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-accent">Dashboard</Link>
              <Link href="/subscription" className="text-sm font-medium text-gray-700 hover:text-primary">Подписка</Link>
              <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-primary">Профиль</Link>
              {user.role === 'admin' && (
                <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-primary">Админ</Link>
              )}
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Личный кабинет</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Пройдено уроков</div>
            <div className="text-3xl font-bold text-primary">{stats.lessonsCompleted}</div>
            <div className="text-xs text-gray-500 mt-1">из {totalLessons}</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Выполнено тестов</div>
            <div className="text-3xl font-bold text-primary">{stats.testsCompleted}</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Средний балл</div>
            <div className="text-3xl font-bold text-primary">{stats.averageScore}%</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Изучено слов</div>
            <div className="text-3xl font-bold text-primary">{stats.wordsLearned}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Общий прогресс</span>
            <span className="text-sm font-medium text-primary">
              {Math.round((stats.lessonsCompleted / totalLessons) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-accent h-3 rounded-full transition-all"
              style={{ width: `${(stats.lessonsCompleted / totalLessons) * 100}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-primary mb-4">Быстрые действия</h2>
            <div className="space-y-3">
              <Link href="/" className="block px-4 py-3 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors text-center">
                Продолжить обучение
              </Link>
              <Link href="/vocabulary" className="block px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-center">
                Словарь
              </Link>
              <Link href="/subscription" className="block px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-center">
                Подписка: {user.subscription}
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-primary mb-4">Статистика обучения</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Время обучения:</span>
                <span className="font-medium text-primary">{Math.round(stats.studyTime / 60)} часов</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Текущий уровень:</span>
                <span className="font-medium text-primary">
                  {stats.lessonsCompleted < 50 ? 'Базовый' : stats.lessonsCompleted < 130 ? 'A1' : stats.lessonsCompleted < 210 ? 'A2' : stats.lessonsCompleted < 290 ? 'B1' : stats.lessonsCompleted < 370 ? 'B2' : 'C1'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Роль:</span>
                <span className="font-medium text-primary capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
