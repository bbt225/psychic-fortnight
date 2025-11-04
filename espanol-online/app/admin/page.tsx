'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Link from 'next/link'

export default function AdminPage() {
  const router = useRouter()
  const { user, lessons, progress, checkUser } = useStore()

  useEffect(() => {
    checkUser()
  }, [])

  if (!user || user.role !== 'admin') {
    router.push('/')
    return null
  }

  const stats = {
    totalLessons: lessons.length,
    totalTests: lessons.length * 8,
    totalProgress: progress.length,
    completedLessons: progress.filter(p => p.completed).length,
    avgScore: progress.length > 0 ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length) : 0
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-semibold text-primary">EspañolOnline</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary">Dashboard</Link>
              <Link href="/admin" className="text-sm font-medium text-accent">Админ</Link>
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Админ-панель</h1>

        {/* Platform Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Всего уроков</div>
            <div className="text-3xl font-bold text-primary">{stats.totalLessons}</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Всего тестов</div>
            <div className="text-3xl font-bold text-primary">{stats.totalTests}</div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Средний балл</div>
            <div className="text-3xl font-bold text-primary">{stats.avgScore}%</div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-primary mb-4">Управление контентом</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
                📚 Редактировать уроки
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
                📝 Управление тестами
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
                📖 Словарь
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
                🎵 Аудиофайлы
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-primary mb-4">Управление пользователями</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
                👥 Список пользователей
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
                🔐 Роли и права
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
                🚫 Блокировка
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
                📊 Прогресс пользователей
              </button>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-primary mb-4">Аналитика</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600">Завершено уроков</div>
              <div className="text-2xl font-bold text-primary">{stats.completedLessons}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Всего попыток</div>
              <div className="text-2xl font-bold text-primary">{stats.totalProgress}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Completion Rate</div>
              <div className="text-2xl font-bold text-primary">
                {stats.totalProgress > 0 ? Math.round((stats.completedLessons / stats.totalProgress) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Примечание:</strong> Это демо-версия админ-панели. В полной версии будут доступны функции CRUD для всех сущностей, загрузка файлов, массовый импорт и детальная аналитика.
          </p>
        </div>
      </main>
    </div>
  )
}
