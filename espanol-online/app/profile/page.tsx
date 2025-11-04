'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, checkUser } = useStore()

  useEffect(() => {
    checkUser()
  }, [])

  if (!user) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-semibold text-primary">EspañolOnline</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary">Dashboard</Link>
              <Link href="/profile" className="text-sm font-medium text-accent">Профиль</Link>
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Профиль пользователя</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Личная информация</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled
              />
            </div>
            <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors">
              Сохранить изменения
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Подписка</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Текущий план:</span>
              <span className="font-medium text-primary capitalize">{user.subscription}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Роль:</span>
              <span className="font-medium text-primary capitalize">{user.role}</span>
            </div>
          </div>
          <Link href="/subscription" className="mt-4 block px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-center">
            Управление подпиской
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Настройки</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
              🔔 Уведомления
            </button>
            <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
              🌙 Тёмная тема
            </button>
            <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-left">
              🗣️ Язык интерфейса
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Действия</h2>
          <div className="space-y-3">
            <button
              onClick={() => signOut()}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Выйти из аккаунта
            </button>
            <button className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
              Удалить аккаунт
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
